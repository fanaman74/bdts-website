import { NextRequest, NextResponse } from "next/server";

const labels: Record<string, { subject: (name: string) => string; heading: string }> = {
  fr: {
    subject: (name) => `Déclaration de sinistre de ${name}`,
    heading: "Nouvelle déclaration de sinistre",
  },
  nl: {
    subject: (name) => `Schademelding van ${name}`,
    heading: "Nieuwe schademelding",
  },
  en: {
    subject: (name) => `Claim declaration from ${name}`,
    heading: "New Claim Declaration",
  },
};

export async function POST(req: NextRequest) {
  const { lastname, firstname, email, phone, claimType, claimDate, description, locale } = await req.json();

  if (!lastname || !firstname || !email || !claimType || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const name = `${firstname} ${lastname}`;
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
          <p><strong>Type de sinistre:</strong> ${claimType}</p>
          <p><strong>Date du sinistre:</strong> ${claimDate || "—"}</p>
          <p><strong>Description:</strong></p>
          <p>${description}</p>
        `,
        replyTo: email,
      });
      if (error) {
        console.error("[DECLARATION] Resend error:", error);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }
    } catch (err) {
      console.error("[DECLARATION] Exception:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }
  } else {
    console.log("[DECLARATION FORM]", { name, email, phone, claimType, claimDate, description, locale });
  }

  return NextResponse.json({ ok: true });
}
