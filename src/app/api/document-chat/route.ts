import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "deepseek/deepseek-v4-flash";

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
    const { pdfUrl, messages, docTitle } = await req.json();

    if (!pdfUrl || !messages?.length) {
      return NextResponse.json({ error: "Missing pdfUrl or messages" }, { status: 400 });
    }

    if (!OPENROUTER_API_KEY) {
      return NextResponse.json({ error: "OpenRouter API key not configured" }, { status: 500 });
    }

    // Fetch and extract PDF text server-side
    let pdfText = "";
    try {
      const pdfRes = await fetch(pdfUrl, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; BDTS-Bot/1.0)" },
        signal: AbortSignal.timeout(15000),
      });

      if (!pdfRes.ok) {
        throw new Error(`PDF fetch failed: ${pdfRes.status}`);
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
        throw new Error("No text extracted from PDF");
      }

      // Truncate to ~80k chars to stay within context limits
      if (pdfText.length > 80000) {
        pdfText = pdfText.slice(0, 80000) + "\n\n[Document truncated — showing first 80,000 characters]";
      }
    } catch (err: any) {
      console.error("[DOCUMENT-CHAT] PDF extraction error:", err?.message ?? err);
      return NextResponse.json({
        error: `Could not read this document: ${err?.message ?? "unknown error"}`,
      }, { status: 422 });
    }

    // Build message array for OpenRouter
    const contextMessage = {
      role: "user" as const,
      content: `Here is the content of the insurance document "${docTitle}":\n\n---\n${pdfText}\n---\n\nPlease use this document to answer my questions.`,
    };

    const assistantAck = {
      role: "assistant" as const,
      content: `I've read the document "${docTitle}". I'm ready to answer your questions about it.`,
    };

    const allMessages = [contextMessage, assistantAck, ...messages];

    // Call OpenRouter
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://bdts.be",
        "X-Title": "BDTS Document Assistant",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
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
      return NextResponse.json({ error: `AI service error (${response.status}): ${err.slice(0, 300)}` }, { status: 502 });
    }

    // Stream response back to client
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    (async () => {
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n").filter((l) => l.startsWith("data: "));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                await writer.write(encoder.encode(`data: ${JSON.stringify({ content })}\n\n`));
              }
            } catch {
              // skip malformed chunks
            }
          }
        }
      } finally {
        await writer.write(encoder.encode("data: [DONE]\n\n"));
        await writer.close();
      }
    })();

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
