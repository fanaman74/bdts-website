"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { ChevronLeft, ChevronRight, CheckCircle, CalendarPlus } from "lucide-react";

function buildICS(dateISO: string, time: string, name: string, email: string): string {
  const [h, m] = time.split(":").map(Number);
  const pad = (n: number) => String(n).padStart(2, "0");
  const [y, mo, d] = dateISO.split("-").map(Number);
  const start = `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
  const endH = h + 1;
  const end = `${y}${pad(mo)}${pad(d)}T${pad(endH)}${pad(m)}00`;
  const uid = `${Date.now()}@bdts.be`;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BDTS//BDTS Website//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    "SUMMARY:Consultation BDTS",
    "DESCRIPTION:Rendez-vous / Appointment — BDTS BDT Sironval",
    "LOCATION:Laeken\\, Brussels\\, Belgium",
    `ORGANIZER;CN=BDTS:mailto:info@bdts.be`,
    `ATTENDEE;CN=${name}:mailto:${email}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function downloadICS(dateISO: string, time: string, name: string, email: string) {
  const ics = buildICS(dateISO, time, name, email);
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "bdts-appointment.ics";
  a.click();
  URL.revokeObjectURL(url);
}

const TIME_SLOTS = ["9:00", "10:00", "11:00", "13:30", "14:30", "15:30", "16:00"];

function buildCalendar(year: number, month: number) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const firstDay = new Date(year, month, 1);
  // Monday-based grid: 0=Mon … 6=Sun
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<{ date: Date | null; isPast: boolean; isWeekend: boolean }> = [];
  for (let i = 0; i < startOffset; i++) cells.push({ date: null, isPast: false, isWeekend: false });
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const dow = date.getDay(); // 0=Sun, 6=Sat
    cells.push({ date, isPast: date < today, isWeekend: dow === 0 || dow === 6 });
  }
  return cells;
}

export function AppointmentCalendar() {
  const t = useTranslations("appointment");
  const locale = useLocale();
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const cells = buildCalendar(viewYear, viewMonth);
  const monthLabel = new Date(viewYear, viewMonth).toLocaleDateString("en", { month: "long", year: "numeric" });
  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }
  function selectDate(date: Date) {
    setSelectedDate(date);
    setSelectedTime(null);
  }

  const isSelected = (date: Date) =>
    selectedDate?.toDateString() === date.toDateString();

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "";

  const dateISO = selectedDate
    ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/appointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, date: formattedDate, dateISO, time: selectedTime, locale }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CheckCircle size={56} className="text-gold mb-4" />
        <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl text-navy mb-2">
          {t("success_title")}
        </h2>
        <p className="text-mid-gray">{t("success_body")}</p>
        <p className="mt-2 text-navy font-semibold">{formattedDate} — {selectedTime}</p>
        <button
          onClick={() => downloadICS(dateISO, selectedTime!, name, email)}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light transition-colors"
        >
          <CalendarPlus size={18} />
          {t("add_to_calendar")}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Calendar */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gold/10 text-navy transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="font-[family-name:var(--font-heading)] font-bold text-lg text-navy">{monthLabel}</span>
            <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gold/10 text-navy transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-mid-gray py-1">{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              if (!cell.date) return <div key={i} />;
              const disabled = cell.isPast || cell.isWeekend;
              const selected = isSelected(cell.date);
              return (
                <button
                  key={i}
                  disabled={disabled}
                  onClick={() => selectDate(cell.date!)}
                  className={[
                    "aspect-square rounded-lg text-sm font-medium transition-all",
                    disabled ? "text-mid-gray/30 cursor-not-allowed" : "hover:bg-gold/10 cursor-pointer",
                    selected ? "bg-gold text-navy-dark font-bold shadow-sm" : disabled ? "" : "text-navy",
                    cell.isWeekend && !disabled ? "text-mid-gray/50" : "",
                  ].join(" ")}
                >
                  {cell.date.getDate()}
                </button>
              );
            })}
          </div>

          <p className="text-xs text-mid-gray mt-4">{t("hours_note")}</p>
        </div>

        {/* Right panel: time slots + form */}
        <div>
          <AnimatePresence mode="wait">
            {!selectedDate ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center h-full min-h-64 text-mid-gray text-sm border-2 border-dashed border-border rounded-xl"
              >
                {t("select_date_prompt")}
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <p className="font-semibold text-navy mb-4">{formattedDate}</p>

                {/* Time slots */}
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {TIME_SLOTS.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={[
                        "py-2 rounded-lg text-sm font-medium border transition-all",
                        selectedTime === slot
                          ? "bg-gold text-navy-dark border-gold font-bold"
                          : "border-border text-navy hover:border-gold hover:text-gold",
                      ].join(" ")}
                    >
                      {slot}
                    </button>
                  ))}
                </div>

                <AnimatePresence>
                  {selectedTime && (
                    <motion.form
                      key="booking-form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">{t("field_name")}</label>
                        <input
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                          placeholder={t("field_name_placeholder")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">{t("field_email")}</label>
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                          placeholder={t("field_email_placeholder")}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-navy mb-1">{t("field_phone")}</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          className="w-full border border-border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                          placeholder={t("field_phone_placeholder")}
                        />
                      </div>

                      {status === "error" && (
                        <p className="text-red-500 text-sm">{t("error")}</p>
                      )}

                      <button
                        type="submit"
                        disabled={status === "loading"}
                        className="w-full py-3 bg-gold text-navy-dark font-bold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-60"
                      >
                        {status === "loading" ? t("submitting") : t("submit")}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
