import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemma-3-27b-it:free";

const SYSTEM_PROMPT = `You are an expert insurance advisor assistant for BDTS, a Belgian insurance broker.
You help clients understand insurance policy documents (conditions générales, IPID, KID, etc.).

When answering questions about a document:
- Be clear and concise
- Use simple language, avoid jargon where possible
- If something is unclear in the document, say so honestly
- Focus on what's relevant to the user's question
- Answer in the same language the user asks in (FR, EN, or NL)`;

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

      // Dynamically import pdf-parse (avoids edge runtime issues)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pdfParseModule = (await import("pdf-parse")) as any;
      const pdfParse = pdfParseModule.default ?? pdfParseModule;
      const data = await pdfParse(buffer, { max: 50 }); // limit to 50 pages
      pdfText = data.text.trim();

      if (!pdfText) {
        throw new Error("No text extracted from PDF");
      }

      // Truncate to ~80k chars to stay within context limits
      if (pdfText.length > 80000) {
        pdfText = pdfText.slice(0, 80000) + "\n\n[Document truncated — showing first 80,000 characters]";
      }
    } catch (err) {
      console.error("[DOCUMENT-CHAT] PDF extraction error:", err);
      return NextResponse.json({
        error: "Could not read this document. It may be protected or unavailable.",
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
      return NextResponse.json({ error: "AI service error" }, { status: 502 });
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
