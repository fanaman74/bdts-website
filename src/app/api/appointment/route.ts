import { NextRequest, NextResponse } from "next/server";

const labels: Record<string, {
  subject: (name: string, date: string, time: string) => string;
  heading: string;
  name: string; email: string; phone: string; date: string; time: string;
  visitorSubject: string;
  visitorBody: (date: string, time: string) => string;
}> = {
  fr: {
    subject: (name, date, time) => `Demande de rendez-vous — ${name} — ${date} à ${time}`,
    heading: "Nouvelle demande de rendez-vous",
    name: "Nom", email: "E-mail", phone: "Téléphone", date: "Date", time: "Heure",
    visitorSubject: "Votre rendez-vous BDTS — confirmation",
    visitorBody: (date, time) =>
      `<p>Merci pour votre demande de rendez-vous.</p><p>Nous vous confirmerons votre créneau <strong>${date} à ${time}</strong> dans les 24 heures.</p><p>BDTS — BDT Sironval<br>02 463 19 25 | info@bdts.be</p>`,
  },
  nl: {
    subject: (name, date, time) => `Afspraakverzoek — ${name} — ${date} om ${time}`,
    heading: "Nieuw afspraakverzoek",
    name: "Naam", email: "E-mail", phone: "Telefoon", date: "Datum", time: "Tijdstip",
    visitorSubject: "Uw afspraak bij BDTS — bevestiging",
    visitorBody: (date, time) =>
      `<p>Bedankt voor uw afspraakverzoek.</p><p>Wij bevestigen uw tijdslot <strong>${date} om ${time}</strong> binnen 24 uur.</p><p>BDTS — BDT Sironval<br>02 463 19 25 | info@bdts.be</p>`,
  },
  en: {
    subject: (name, date, time) => `Appointment request — ${name} — ${date} at ${time}`,
    heading: "New Appointment Request",
    name: "Name", email: "Email", phone: "Phone", date: "Date", time: "Time",
    visitorSubject: "Your BDTS appointment — confirmation",
    visitorBody: (date, time) =>
      `<p>Thank you for your appointment request.</p><p>We will confirm your slot <strong>${date} at ${time}</strong> within 24 hours.</p><p>BDTS — BDT Sironval<br>02 463 19 25 | info@bdts.be</p>`,
  },
};

function buildICS(dateISO: string, time: string, visitorName: string, visitorEmail: string): string {
  const [h, m] = time.split(":").map(Number);
  const pad = (n: number) => String(n).padStart(2, "0");
  const [y, mo, d] = dateISO.split("-").map(Number);
  const start = `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
  const end = `${y}${pad(mo)}${pad(d)}T${pad(h + 1)}${pad(m)}00`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BDTS//BDTS Website//EN",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@bdts.be`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "SUMMARY:Consultation BDTS",
    "DESCRIPTION:Rendez-vous / Appointment — BDTS BDT Sironval",
    "LOCATION:Laeken\\, Brussels\\, Belgium",
    "ORGANIZER;CN=BDTS:mailto:info@bdts.be",
    `ATTENDEE;CN=${visitorName}:mailto:${visitorEmail}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export async function POST(req: NextRequest) {
  const { name, email, phone, date, dateISO, time, locale } = await req.json();

  if (!name || !email || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const l = labels[locale as string] ?? labels.fr;
  const icsContent = dateISO ? buildICS(dateISO, time, name, email) : null;
  const icsAttachment = icsContent
    ? [{ filename: "bdts-appointment.ics", content: Buffer.from(icsContent).toString("base64") }]
    : [];

  if (process.env.RESEND_API_KEY) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Notify broker
      const { error: brokerError } = await resend.emails.send({
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
        attachments: icsAttachment,
      });
      if (brokerError) {
        console.error("[APPOINTMENT] Broker email error:", brokerError);
        return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
      }

      // Confirm to visitor
      await resend.emails.send({
        from: "BDTS <onboarding@resend.dev>",
        to: email,
        subject: l.visitorSubject,
        html: l.visitorBody(date, time),
        attachments: icsAttachment,
      });
    } catch (err) {
      console.error("[APPOINTMENT] Exception:", err);
      return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
    }
  } else {
    console.log("[APPOINTMENT]", { name, email, phone, date, dateISO, time, locale });
  }

  return NextResponse.json({ ok: true });
}
