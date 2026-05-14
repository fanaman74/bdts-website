"use client";

import { useEffect, useRef, useState } from "react";
import { X, Send, Bot, User, Loader2, FileText } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DocumentChatProps {
  docTitle: string;
  docUrl: string;
  company: string;
  onClose: () => void;
}

export function DocumentChat({ docTitle, docUrl, company, onClose }: DocumentChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [streaming, setStreaming] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    // Prevent background scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streaming]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    // Add empty assistant message for streaming
    setMessages([...nextMessages, { role: "assistant", content: "" }]);
    setStreaming(true);

    try {
      const res = await fetch("/api/document-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pdfUrl: docUrl,
          docTitle,
          messages: nextMessages,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Request failed");
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

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
            if (parsed.content) {
              accumulated += parsed.content;
              setMessages([...nextMessages, { role: "assistant", content: accumulated }]);
            }
          } catch {
            // skip
          }
        }
      }
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      // Remove empty assistant message on error
      setMessages(nextMessages);
    } finally {
      setLoading(false);
      setStreaming(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e as any);
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-navy/50 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-white z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-navy px-5 py-4 flex items-start gap-3">
          <div className="w-9 h-9 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
            <FileText size={18} className="text-gold" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white/60 text-xs font-medium uppercase tracking-wide">{company}</p>
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 mt-0.5">
              {docTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors p-1 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-off-white">
          {messages.length === 0 && (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Bot size={22} className="text-gold" />
              </div>
              <p className="text-navy font-semibold text-sm mb-1">Assistant IA — BDTS</p>
              <p className="text-mid-gray text-xs max-w-xs mx-auto">
                Posez vos questions sur ce document d'assurance. Je lis le document et réponds en français, anglais ou néerlandais.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 justify-center">
                {[
                  "Que couvre ce contrat ?",
                  "Quelles sont les exclusions ?",
                  "Quel est le délai de carence ?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => setInput(q)}
                    className="text-xs bg-white border border-border text-navy px-3 py-1.5 rounded-full hover:border-gold/40 hover:text-gold transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 bg-gold/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot size={14} className="text-gold" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-navy text-white rounded-tr-sm"
                    : "bg-white text-dark-gray border border-border rounded-tl-sm"
                }`}
              >
                {msg.content || (
                  <span className="flex items-center gap-1.5 text-mid-gray">
                    <Loader2 size={13} className="animate-spin" />
                    Lecture du document…
                  </span>
                )}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 bg-navy/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User size={14} className="text-navy" />
                </div>
              )}
            </div>
          ))}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border bg-white px-4 py-3">
          <form onSubmit={sendMessage} className="flex gap-2 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez une question sur ce document…"
              rows={1}
              disabled={loading}
              className="flex-1 resize-none bg-off-white border border-border rounded-lg px-3 py-2 text-sm text-dark-gray placeholder:text-mid-gray focus:outline-none focus:border-gold/60 disabled:opacity-50 max-h-28"
              style={{ overflowY: "auto" }}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="w-9 h-9 bg-gold text-navy-dark rounded-lg flex items-center justify-center hover:bg-gold/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>
          <p className="text-mid-gray/60 text-xs mt-1.5 text-center">
            Entrée pour envoyer · Shift+Entrée pour nouvelle ligne
          </p>
        </div>
      </div>
    </>
  );
}
