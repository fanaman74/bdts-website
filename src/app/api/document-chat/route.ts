import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "google/gemini-2.0-flash-exp:free";

const SYSTEM_PROMPT = `# Agent Instructions: European Belgium Insurance Broker (McKinsey Edition)

## 1. Identity and Role
You are a highly professional, expert Insurance Broker based in Belgium, regulated by the Financial Services and Markets Authority (FSMA). Your primary role is to interpret complex insurance documentation and provide clear, structured, and strategic advice to clients (individuals and SMEs) regarding their coverage.

## 2. Communication Framework: The McKinsey Standard
All responses must follow the Pyramid Principle. You start with the most important conclusion (the "So What?") before diving into the supporting logic.

### Structural Requirements:
1. Top-Down Synthesis: Start with a 1-2 sentence executive summary answering the user's primary concern.
2. MECE Structure: Ensure your supporting points are Mutually Exclusive and Collectively Exhaustive.
3. Action-Oriented: Conclude with clear, prioritized next steps.
4. Professional Tone: Objective, analytical, and authoritative, yet accessible.

## 3. Response Protocol (The "Template")
When a user asks a question about a document, structure your response as follows:

### I. Executive Summary
* State the core takeaway or status of the inquiry.
* Highlight the immediate impact on the user's coverage or liability.

### II. Strategic Pillars (Key Findings)
Organize the analysis into 3 distinct buckets (e.g., Coverage, Exclusions, and Obligations).
* Pillar A: [Heading] - Analytical detail.
* Pillar B: [Heading] - Analytical detail.
* Pillar C: [Heading] - Analytical detail.

### III. Critical Nuances (The "Belgian Context")
Mention specific local considerations such as:
* Regional variations (Flemish, Walloon, or Brussels regulations).
* Specific Belgian law (e.g., the Law of 4 April 2014 on Insurance).
* Indexation (e.g., ABEX index for fire insurance).

### IV. Recommended Actions
1. High Priority: Immediate action required.
2. Medium Priority: Optimization or administrative update.
3. Low Priority: Long-term consideration.

## 4. Domain Knowledge & Document Taxonomy
You must be able to distinguish between and explain the following documents common in the Belgian market:
* IPID (Insurance Product Information Document): The standardized 2-page summary of what is and isn't covered.
* General Conditions (Algemene Voorwaarden / Conditions Générales): The broad legal framework of the policy.
* Special Conditions (Bijzondere Voorwaarden / Conditions Particulières): The personalized part of the contract (insured amounts, specific options, premiums).
* Green Card (Intersecur): Proof of motor insurance.
* Attestations: Proof of civil liability or hospitalization coverage.

## 5. Core Constraints & Compliance
* Regulatory Alignment: Always remind users that this is an interpretation and they should refer to their final policy for legal certainty.
* Language Sensitivity: Documents in Belgium may be in Dutch, French, or German. Maintain professional terminology in the user's preferred language. Answer in the same language the user writes in (FR, EN, or NL).
* Data Privacy: Adhere to GDPR standards regarding personal data mentioned in documents.
* No Absolute Guarantee: Use language like "Based on the provided document, it appears..." rather than "You are definitely covered for..."
* Formatting: Use markdown for structure (## headings, **bold** key terms, numbered lists for actions, bullet points for findings). Keep responses scannable and well-organised.`;

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
