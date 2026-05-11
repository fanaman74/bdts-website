"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircle size={48} className="text-gold mb-4" />
        <p className="text-navy font-semibold text-lg">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">{t("name")}</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-3 rounded-md border border-border bg-white text-navy-dark focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-navy mb-1.5">{t("phone")}</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-md border border-border bg-white text-navy-dark focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">{t("email")}</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-3 rounded-md border border-border bg-white text-navy-dark focus:outline-none focus:ring-2 focus:ring-gold transition-shadow"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-navy mb-1.5">{t("message")}</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-3 rounded-md border border-border bg-white text-navy-dark focus:outline-none focus:ring-2 focus:ring-gold transition-shadow resize-none"
        />
      </div>
      {status === "error" && (
        <div className="flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle size={16} />
          {t("error")}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full py-4 bg-gold text-navy-dark font-bold rounded-md hover:bg-gold-light transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        <Send size={18} />
        {status === "loading" ? "..." : t("submit")}
      </button>
    </form>
  );
}
