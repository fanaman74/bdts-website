import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const DEFAULT_MODEL = "google/gemma-4-26b-a4b-it:free";
const MAX_DOCUMENT_CHARACTERS = 80000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

function providerErrorMessage(status: number, responseText: string, model: string): string {
  let detail = responseText;

  try {
    const parsed = JSON.parse(responseText) as { error?: { message?: string } };
    detail = parsed.error?.message ?? responseText;
  } catch {
    // Preserve non-JSON provider errors so configuration failures remain actionable.
  }

  if (status === 401 || status === 403) {
    return "The OpenRouter API key is invalid or no longer active. Update OPENROUTER_API_KEY in Railway or .env.local.";
  }

  if (status === 402) {
    return "The OpenRouter account has insufficient credits. Add credits or configure another permitted OPENROUTER_MODEL.";
  }

  if (status === 404) {
    return `The AI model "${model}" is unavailable or blocked by the OpenRouter privacy settings. Configure a permitted OPENROUTER_MODEL. ${detail}`;
  }

  if (status === 429) {
    return "The AI service is temporarily rate-limited. Please try again shortly.";
  }

  return `AI service error (${status}): ${detail.slice(0, 300)}`;
}

const SYSTEM_PROMPT = `# Agent Instructions: Belgian Insurance Analyst (Chat Optimized)

## 1. Core Mandate
You are an expert Belgian Insurance Broker. Your goal is to provide terse, high-impact analysis of insurance documents provided by the user.

## 2. Strict Source Constraint
* Document-Only: You must derive your answers exclusively from the document(s) provided.
* Unknowns: If a piece of information is not in the document, state: "The provided document does not specify [X]." Do not speculate or use general insurance knowledge to fill gaps.

## 3. Communication Style: Terse McKinsey
Use a distilled Pyramid Principle format. Prioritize brevity for a chat interface.

### Response Template:
**1. Synthesis (The 'So What'):** One direct sentence answering the core query.
**2. Supporting Evidence (MECE):** 2-3 concise bullet points. No filler words.
**3. Local Nuance:** One brief mention of Belgian regulation/terms (e.g., ABEX, FSMA, Law of 2014) only if it appears or is directly relevant to the document's content.
**4. Next Step:** One clear action for the user.

## 4. Compliance & Tone
* Tone: Professional, objective, and "Broker-to-Client."
* Language: ALWAYS respond in the exact same language the user asked their question in. If they write in French, respond in French. If Dutch, respond in Dutch. If English, respond in English. Never switch languages. Maintain professional Belgian insurance terminology regardless of language.
* Disclaimer: Always end with: "Based solely on the document provided. Refer to your Special Conditions for final validation."
* Formatting: Use markdown for structure (**bold** key terms, bullet points). Keep responses scannable.`;

export async function POST(req: NextRequest) {
  try {
    const { pdfUrl, messages, docTitle } = await req.json() as {
      pdfUrl?: unknown;
      messages?: unknown;
      docTitle?: unknown;
    };

    if (
      typeof pdfUrl !== "string" ||
      !pdfUrl ||
      !Array.isArray(messages) ||
      messages.length === 0 ||
      messages.some((message): boolean =>
        typeof message !== "object" ||
        message === null ||
        !("role" in message) ||
        !("content" in message) ||
        (message.role !== "user" && message.role !== "assistant") ||
        typeof message.content !== "string"
      )
    ) {
      return NextResponse.json({ error: "Missing pdfUrl or messages" }, { status: 400 });
    }

    let parsedPdfUrl: URL;

    try {
      parsedPdfUrl = new URL(pdfUrl);
    } catch {
      return NextResponse.json({ error: "The document URL is invalid." }, { status: 400 });
    }

    if (parsedPdfUrl.protocol !== "https:" && parsedPdfUrl.protocol !== "http:") {
      return NextResponse.json({ error: "Document URLs must use HTTP or HTTPS." }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    const model = process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL;
    const documentTitle = typeof docTitle === "string" && docTitle.trim()
      ? docTitle.trim()
      : "Insurance document";

    if (!apiKey) {
      return NextResponse.json({
        error: "The AI assistant is not configured. Set OPENROUTER_API_KEY in Railway or .env.local.",
      }, { status: 503 });
    }

    // Fetch and extract PDF text server-side
    let pdfText = "";
    try {
      const pdfRes = await fetch(pdfUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
          "Accept": "application/pdf,*/*;q=0.9",
          "Accept-Language": "fr-BE,fr;q=0.9,nl;q=0.8,en;q=0.7",
          "Referer": "https://app.sectorcatalog.be/",
        },
        signal: AbortSignal.timeout(30000),
      });

      if (!pdfRes.ok) {
        throw new Error(`The insurer returned HTTP ${pdfRes.status}. Open the document directly or contact BDTS for assistance.`);
      }

      const pdfBuffer = await pdfRes.arrayBuffer();
      const buffer = Buffer.from(pdfBuffer);

      // Import pdf-parse lib directly — index.js runs a test file on import
      // which fails in production (no ./test/data/05-versions-space.pdf)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParse = (await import("pdf-parse/lib/pdf-parse.js" as any)).default as any;
      const parsed = await pdfParse(buffer, { max: 50 }); // first 50 pages
      pdfText = (parsed.text ?? "").trim();

      if (!pdfText) {
        throw new Error("No readable text was found in this PDF; it may be a scanned document.");
      }

      // Truncate to ~80k chars to stay within context limits
      if (pdfText.length > MAX_DOCUMENT_CHARACTERS) {
        pdfText = pdfText.slice(0, MAX_DOCUMENT_CHARACTERS) + "\n\n[Document truncated — showing first 80,000 characters]";
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.error("[DOCUMENT-CHAT] PDF extraction error:", message);
      return NextResponse.json({
        error: `Could not read this document: ${message}`,
      }, { status: 422 });
    }

    // Build message array for OpenRouter
    const contextMessage = {
      role: "user" as const,
      content: `Here is the content of the insurance document "${documentTitle}":\n\n---\n${pdfText}\n---\n\nPlease use this document to answer my questions.`,
    };

    const assistantAck = {
      role: "assistant" as const,
      content: `I've read the document "${documentTitle}". I'm ready to answer your questions about it.`,
    };

    const allMessages = [contextMessage, assistantAck, ...messages as ChatMessage[]];

    // Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://bdts.be",
        "X-Title": "BDTS Document Assistant",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...allMessages,
        ],
        max_tokens: 1024,
        temperature: 0.3,
        stream: true,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("[DOCUMENT-CHAT] OpenRouter error:", err);
      return NextResponse.json({
        error: providerErrorMessage(response.status, err, model),
      }, { status: 502 });
    }

    if (!response.body) {
      return NextResponse.json({ error: "The AI service returned an empty response." }, { status: 502 });
    }

    // Buffer incomplete SSE lines: network chunks do not necessarily align with events.
    const upstreamBody = response.body;
    const readable = new ReadableStream<Uint8Array>({
      async start(controller) {
        const reader = upstreamBody.getReader();
        const decoder = new TextDecoder();
        const encoder = new TextEncoder();
        let pending = "";

        function processLine(line: string) {
          if (!line.startsWith("data: ")) return;

          const data = line.slice(6).trim();
          if (!data || data === "[DONE]") return;

          try {
            const parsed = JSON.parse(data) as {
              choices?: { delta?: { content?: string } }[];
              error?: { message?: string };
            };

            if (parsed.error?.message) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: parsed.error.message })}\n\n`));
              return;
            }

            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
            }
          } catch {
            // Ignore malformed provider events without dropping subsequent complete events.
          }
        }

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            pending += decoder.decode(value, { stream: true });
            const lines = pending.split("\n");
            pending = lines.pop() ?? "";

            for (const line of lines) processLine(line);
          }

          pending += decoder.decode();
          if (pending) processLine(pending);
        } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "The AI response was interrupted.";
          console.error("[DOCUMENT-CHAT] Streaming error:", message);
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
          reader.releaseLock();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (err) {
    console.error("[DOCUMENT-CHAT] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
