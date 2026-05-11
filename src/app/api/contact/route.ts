import { NextRequest, NextResponse } from "next/server";

const labels: Record<string, { subject: (name: string) => string; heading: string; name: string; email: string; phone: string; message: string }> = {
  fr: {
    subject: (name) => `Nouveau message de ${name}`,
    heading: "Nouveau message de contact",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    message: "Message",
  },
  nl: {
    subject: (name) => `Nieuw bericht van ${name}`,
    heading: "Nieuw contactbericht",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    message: "Bericht",
  },
  en: {
    subject: (name) => `New contact from ${name}`,
    heading: "New Contact Message",
    name: "Name",
    email: "Email",
    phone: "Phone",
    message: "Message",
  },
};

export async function POST(req: NextRequest) {
  const { name, email, phone, message, locale } = await req.json();

  if (!name || !email || !message) {
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
          <p><strong>${l.name}:</strong> ${name}</p>
          <p><strong>${l.email}:</strong> ${email}</p>
          <p><strong>${l.phone}:</strong> ${phone || "—"}</p>
          <p><strong>${l.message}:</strong></p>
          <p>${message}</p>
        `,
        replyTo: email,
      });
      if (error) {
        console.error("[CONTACT] Resend error:", error);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }
    } catch (err) {
      console.error("[CONTACT] Exception:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }
  } else {
    console.log("[CONTACT FORM]", { name, email, phone, message, locale });
  }

  return NextResponse.json({ ok: true });
}
