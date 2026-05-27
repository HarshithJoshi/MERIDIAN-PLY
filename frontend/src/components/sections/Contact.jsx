import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle, Send, Loader2 } from "lucide-react";
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
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 overflow-hidden"
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

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
            onSubmit={submit}
            data-testid="contact-form"
            className="lg:col-span-7 rounded-3xl border border-white/10 bg-gradient-to-b from-[#111111] to-[#0B0B0B] p-7 md:p-10"
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
          <div className="lg:col-span-5 space-y-5">
            <InfoCard icon={<Phone size={18} />} label="Phone" value={BRAND.phone} href={`tel:${BRAND.phone.replace(/\s/g, "")}`} testid="contact-info-phone" />
            <InfoCard icon={<Mail size={18} />} label="Email" value={BRAND.email} href={`mailto:${BRAND.email}`} testid="contact-info-email" />
            <InfoCard icon={<MapPin size={18} />} label="Manufacturing" value={BRAND.address} testid="contact-info-address" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-white/10 overflow-hidden h-56 relative"
              data-testid="contact-map"
            >
              <iframe
                title="Meridian Plywood Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=77.27%2C30.10%2C77.32%2C30.16&layer=mapnik"
                className="w-full h-full grayscale-[0.4] invert-[0.85] hue-rotate-180 contrast-110"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 ring-1 ring-white/10 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 14px 16px;
          color: #F6F1E9;
          font-size: 14.5px;
          font-family: "General Sans", sans-serif;
          transition: border-color 280ms ease, background-color 280ms ease;
        }
        .input::placeholder { color: rgba(246,241,233,0.32); }
        .input:focus { outline: none; border-color: rgba(184,115,51,0.55); background: rgba(255,255,255,0.05); }
        select.input { appearance: none; background-image: linear-gradient(45deg, transparent 50%, #B87333 50%), linear-gradient(135deg, #B87333 50%, transparent 50%); background-position: calc(100% - 18px) 50%, calc(100% - 13px) 50%; background-size: 5px 5px, 5px 5px; background-repeat: no-repeat; padding-right: 36px; }
      `}</style>
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
