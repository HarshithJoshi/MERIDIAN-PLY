import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2, Store, BadgeCheck } from "lucide-react";
import { BRAND } from "@/lib/meridian";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    role: "Architect",
    project_type: "Residential",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please complete name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      toast.success("Inquiry received", { description: "Our specifications team will respond within one business day." });
      setForm({ name: "", email: "", phone: "", company: "", role: "Architect", project_type: "Residential", message: "" });
    } catch (err) {
      toast.error("Submission failed", { description: err?.response?.data?.detail || "Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const waNumber = BRAND.whatsapp.replace(/\D/g, "");
  const waMsg = encodeURIComponent("Hi Meridian — I'd like to discuss a project specification.");

  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative bg-[#0B0B0B] pt-24 md:pt-32 lg:pt-40 pb-12 md:pb-16 overflow-hidden"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[820px] rounded-full blur-[160px] opacity-40 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at center, rgba(184,115,51,0.35), transparent 65%)" }} />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <span className="eyebrow">— Final Word</span>
          <h2
            className="mt-4 font-display text-[44px] sm:text-[64px] md:text-[88px] leading-[1.02] text-[#F6F1E9]"
            style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
          >
            Build spaces that
            <br />
            <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>last generations</span>.
          </h2>
          <p className="mt-7 text-[15px] md:text-[17px] text-[#F6F1E9]/65 max-w-xl leading-relaxed">
            Specifications, samples, or a quiet conversation with our team — start here.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            onSubmit={submit}
            data-testid="contact-form"
            className="md:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-b from-[#111111] to-[#0B0B0B] p-6 md:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Field label="Full name" required>
                <input
                  value={form.name}
                  onChange={update("name")}
                  data-testid="contact-input-name"
                  placeholder="Your name"
                  className="input"
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  data-testid="contact-input-email"
                  placeholder="you@studio.com"
                  className="input"
                />
              </Field>
              <Field label="Phone">
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  data-testid="contact-input-phone"
                  placeholder="+91"
                  className="input"
                />
              </Field>
              <Field label="Company / Studio">
                <input
                  value={form.company}
                  onChange={update("company")}
                  data-testid="contact-input-company"
                  placeholder="Studio Volume"
                  className="input"
                />
              </Field>
              <Field label="Role">
                <select value={form.role} onChange={update("role")} data-testid="contact-input-role" className="input">
                  {["Architect", "Interior Designer", "Builder", "Contractor", "Dealer", "Homeowner", "Other"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </Field>
              <Field label="Project type">
                <select value={form.project_type} onChange={update("project_type")} data-testid="contact-input-project" className="input">
                  {["Residential", "Hospitality", "Commercial", "Retail", "Marine", "Other"].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Project brief" required className="mt-5">
              <textarea
                value={form.message}
                onChange={update("message")}
                data-testid="contact-input-message"
                rows={5}
                placeholder="Scale, timelines, surfaces of interest…"
                className="input resize-none"
              />
            </Field>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-button"
                className="btn-pill btn-pill-primary disabled:opacity-60"
              >
                {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {submitting ? "Sending…" : "Send Inquiry"}
              </button>
              <a
                href={`https://wa.me/${waNumber}?text=${waMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="contact-whatsapp-link"
                className="btn-pill btn-pill-ghost"
              >
                <MessageCircle size={15} /> WhatsApp
              </a>
            </div>
          </motion.form>

          {/* Contact details */}
          <div className="md:col-span-5 space-y-5">
            <PhoneCard />
            <InfoCard icon={<Mail size={18} />} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} testid="contact-info-email" />

            {/* Manufacturing (Yamunanagar) */}
            <InfoCard
              icon={<MapPin size={18} />}
              label="Manufacturing"
              value={BRAND.manufacturing}
              testid="contact-info-manufacturing"
            />

            {/* Authorised distributor / Flagship store (Hyderabad — Aghapura) */}
            <ShowroomCard />

            <motion.a
              href={BRAND.mapShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="block rounded-2xl border border-white/10 overflow-hidden h-56 relative group"
              data-testid="contact-map"
              aria-label="Open Meridian Plywood location in Google Maps"
            >
              <iframe
                title="Meridian Plywood Location — Aghapura, Hyderabad"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${BRAND.mapLng - 0.006}%2C${BRAND.mapLat - 0.004}%2C${BRAND.mapLng + 0.006}%2C${BRAND.mapLat + 0.004}&layer=mapnik&marker=${BRAND.mapLat}%2C${BRAND.mapLng}`}
                className="w-full h-full grayscale-[0.4] invert-[0.85] hue-rotate-180 contrast-110 pointer-events-none"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
              <div className="absolute bottom-3 right-3 glass-strong rounded-full px-3 py-1.5 text-[11px] tracking-[0.18em] uppercase font-mono text-[#F6F1E9]/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Open in Maps ↗
              </div>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <div className="mb-2 text-[10.5px] tracking-[0.24em] uppercase text-[#A3A3A3]">
        {label} {required && <span className="text-[#B87333]">*</span>}
      </div>
      {children}
    </label>
  );
}

function InfoCard({ icon, label, value, href, testid }) {
  const Tag = href ? "a" : "div";
  return (
    <Tag
      href={href}
      data-testid={testid}
      className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#B87333]/55 transition-colors duration-500 group"
    >
      <div className="flex items-center gap-3 text-[#B87333]">
        {icon}
        <span className="eyebrow" style={{ color: "#B87333" }}>{label}</span>
      </div>
      <div className="mt-3 font-display text-[16px] md:text-[17px] text-[#F6F1E9] group-hover:text-[#F6F1E9]" style={{ fontWeight: 500 }}>
        {value}
      </div>
    </Tag>
  );
}

function PhoneCard() {
  const waNumber = BRAND.whatsapp.replace(/\D/g, "");
  const waMsg = encodeURIComponent(
    `Hi Meridian — I'd like to discuss a project specification.`
  );
  return (
    <div
      data-testid="contact-info-phone"
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#B87333]/55 transition-colors duration-500 group"
    >
      <div className="flex items-center gap-3 text-[#B87333]">
        <Phone size={18} />
        <span className="eyebrow" style={{ color: "#B87333" }}>Phone</span>
      </div>
      <a
        href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
        data-testid="contact-phone-link"
        className="mt-3 block font-display text-[18px] md:text-[20px] text-[#F6F1E9] hover:text-[#F6F1E9] tracking-tight"
        style={{ fontWeight: 500 }}
      >
        {BRAND.phone}
      </a>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <a
          href={`https://wa.me/${waNumber}?text=${waMsg}`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="contact-phone-whatsapp-btn"
          className="inline-flex items-center gap-2 rounded-full bg-[#25D366] text-white px-4 py-2 text-[12.5px] font-medium hover:bg-[#1ebd5b] transition-colors duration-300 shadow-[0_10px_24px_-12px_rgba(37,211,102,0.55)]"
        >
          <svg viewBox="0 0 32 32" width="13" height="13" fill="currentColor" aria-hidden>
            <path d="M19.11 17.18c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.21 0 1.3.95 2.56 1.08 2.74.13.18 1.86 2.84 4.5 3.99.63.27 1.12.43 1.5.55.63.2 1.21.17 1.66.1.5-.08 1.58-.65 1.8-1.27.22-.62.22-1.15.15-1.27-.07-.12-.24-.18-.51-.31zM16.02 4C9.4 4 4.04 9.36 4.04 16c0 2.05.54 4.06 1.56 5.83L4 28l6.34-1.66A11.95 11.95 0 0 0 16.02 28C22.66 28 28 22.64 28 16S22.66 4 16.02 4zm0 21.83c-1.81 0-3.58-.49-5.13-1.41l-.37-.22-3.76.99 1-3.67-.24-.38a9.92 9.92 0 0 1-1.52-5.14c0-5.49 4.48-9.97 9.97-9.97s9.97 4.48 9.97 9.97-4.46 9.83-9.92 9.83z" />
          </svg>
          Message on WhatsApp
        </a>
        <a
          href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
          data-testid="contact-phone-call-btn"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[12.5px] text-[#F6F1E9]/85 hover:text-[#F6F1E9] hover:border-[#B87333]/60 transition-colors"
        >
          <Phone size={13} /> Call
        </a>
      </div>
    </div>
  );
}

function ShowroomCard() {
  return (
    <a
      href={BRAND.mapShareUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="contact-info-showroom"
      className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-[#B87333]/55 transition-colors duration-500 group relative overflow-hidden"
    >
      {/* Subtle copper glow accent */}
      <div className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-[#B87333]/12 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex items-center gap-3 text-[#B87333]">
          <Store size={18} />
          <span className="eyebrow" style={{ color: "#B87333" }}>
            {BRAND.showroomLabel}
          </span>
        </div>
        {/* Flagship badge */}
        <span
          data-testid="contact-flagship-badge"
          className="inline-flex items-center gap-1.5 rounded-full bg-[#B87333]/15 border border-[#B87333]/35 px-2.5 py-1 text-[10px] tracking-[0.16em] uppercase font-mono text-[#B87333] whitespace-nowrap"
        >
          <BadgeCheck size={11} strokeWidth={2.5} />
          {BRAND.showroomBadge}
        </span>
      </div>

      <div
        className="mt-4 font-display text-[15.5px] md:text-[16px] leading-relaxed text-[#F6F1E9] relative"
        style={{ fontWeight: 500 }}
      >
        {BRAND.showroomAddress}
      </div>

      <div className="mt-3 text-[11px] tracking-[0.22em] uppercase font-mono text-[#F6F1E9]/45 group-hover:text-[#B87333] transition-colors duration-300 relative">
        Open in Maps ↗
      </div>
    </a>
  );
}

