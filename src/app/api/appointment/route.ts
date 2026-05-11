import { NextRequest, NextResponse } from "next/server";

const labels: Record<string, { subject: (name: string, date: string, time: string) => string; heading: string; name: string; email: string; phone: string; date: string; time: string }> = {
  fr: {
    subject: (name, date, time) => `Demande de rendez-vous — ${name} — ${date} à ${time}`,
    heading: "Nouvelle demande de rendez-vous",
    name: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    date: "Date",
    time: "Heure",
  },
  nl: {
    subject: (name, date, time) => `Afspraakverzoek — ${name} — ${date} om ${time}`,
    heading: "Nieuw afspraakverzoek",
    name: "Naam",
    email: "E-mail",
    phone: "Telefoon",
    date: "Datum",
    time: "Tijdstip",
  },
  en: {
    subject: (name, date, time) => `Appointment request — ${name} — ${date} at ${time}`,
    heading: "New Appointment Request",
    name: "Name",
    email: "Email",
    phone: "Phone",
    date: "Date",
    time: "Time",
  },
};

export async function POST(req: NextRequest) {
  const { name, email, phone, date, time, locale } = await req.json();

  if (!name || !email || !date || !time) {
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
        subject: l.subject(name, date, time),
        html: `
          <h2>${l.heading}</h2>
          <p><strong>${l.name}:</strong> ${name}</p>
          <p><strong>${l.email}:</strong> ${email}</p>
          <p><strong>${l.phone}:</strong> ${phone || "—"}</p>
          <p><strong>${l.date}:</strong> ${date}</p>
          <p><strong>${l.time}:</strong> ${time}</p>
        `,
        replyTo: email,
      });
      if (error) {
        console.error("[APPOINTMENT] Resend error:", error);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }
    } catch (err) {
      console.error("[APPOINTMENT] Exception:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }
  } else {
    console.log("[APPOINTMENT]", { name, email, phone, date, time, locale });
  }

  return NextResponse.json({ ok: true });
}
