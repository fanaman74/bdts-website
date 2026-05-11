import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, phone, date, time } = await req.json();

  if (!name || !email || !date || !time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "BDTS Website <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "info@bdts.be",
      subject: `Appointment request — ${name} — ${date} at ${time}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
      `,
      replyTo: email,
    });
  } else {
    console.log("[APPOINTMENT]", { name, email, phone, date, time });
  }

  return NextResponse.json({ ok: true });
}
