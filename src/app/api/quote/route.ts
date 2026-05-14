import { NextRequest, NextResponse } from "next/server";

const labels: Record<string, { subject: (name: string) => string; heading: string }> = {
  fr: {
    subject: (name) => `Demande de devis de ${name}`,
    heading: "Nouvelle demande de devis",
  },
  nl: {
    subject: (name) => `Offerte aanvraag van ${name}`,
    heading: "Nieuwe offerteaanvraag",
  },
  en: {
    subject: (name) => `Quote request from ${name}`,
    heading: "New Quote Request",
  },
};

export async function POST(req: NextRequest) {
  const { name, email, phone, insuranceType, message, locale } = await req.json();

  if (!name || !email || !insuranceType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const l = labels[locale as string] ?? labels.fr;

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { error } = await resend.emails.send({
        from: "BDTS Website <onboarding@resend.dev>",
        to: process.env.OWNER_EMAIL ?? "fredanaman@gmail.com",
        subject: l.subject(name),
        html: `
          <h2>${l.heading}</h2>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone || "—"}</p>
          <p><strong>Type d'assurance:</strong> ${insuranceType}</p>
          <p><strong>Message:</strong></p>
          <p>${message || "—"}</p>
        `,
        replyTo: email,
      });
      if (error) {
        console.error("[QUOTE] Resend error:", error);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }
    } catch (err) {
      console.error("[QUOTE] Exception:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }
  } else {
    console.log("[QUOTE FORM]", { name, email, phone, insuranceType, message, locale });
  }

  return NextResponse.json({ ok: true });
}
