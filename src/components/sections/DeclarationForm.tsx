"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export function DeclarationForm() {
  const t = useTranslations("declaration");
  const locale = useLocale();

  const [form, setForm] = useState({
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
    claimType: "",
    claimDate: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/declaration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <p className="text-green-800 font-semibold text-lg">{t("success")}</p>
      </div>
    );
  }

  const inputClass = "w-full border border-border rounded-md px-4 py-3 text-dark-gray placeholder:text-mid-gray focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">{t("field_lastname")} *</label>
          <input
            name="lastname"
            required
            value={form.lastname}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-navy mb-1">{t("field_firstname")} *</label>
          <input
            name="firstname"
            required
            value={form.firstname}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">{t("field_email")} *</label>
        <input
          name="email"
          type="email"
          required
          value={form.email}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">{t("field_phone")}</label>
        <input
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">{t("field_type")} *</label>
        <select
          name="claimType"
          required
          value={form.claimType}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">—</option>
          <option value="Auto">{t("type_auto")}</option>
          <option value="Habitation">{t("type_habitation")}</option>
          <option value="Famille">{t("type_famille")}</option>
          <option value="Autre">{t("type_autre")}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">{t("field_date")}</label>
        <input
          name="claimDate"
          type="date"
          value={form.claimDate}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-navy mb-1">{t("field_description")} *</label>
        <textarea
          name="description"
          required
          rows={5}
          value={form.description}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="text-red-600 text-sm">{t("error")}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-navy text-white font-bold py-3 px-6 rounded-md hover:bg-navy-light transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
