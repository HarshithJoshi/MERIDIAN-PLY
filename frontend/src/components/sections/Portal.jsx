import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handshake, Package, Send, Loader2, Check, MapPin, Megaphone, ShieldCheck, MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/meridian";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// Build a wa.me deep-link with a context-specific prefilled message.
const WA_NUMBER = BRAND.whatsapp.replace(/\D/g, "");
const waLink = (text) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

const DEALER_BENEFITS = [
  {
    Icon: ShieldCheck,
    title: "Protected Territory",
    body: "Exclusive serviceable area with no overlap from other authorised dealers in your zone.",
  },
  {
    Icon: Megaphone,
    title: "Marketing Support",
    body: "Co-funded brochures, in-store displays, architect events, and digital lead routing.",
  },
  {
    Icon: MapPin,
    title: "Direct Logistics",
    body: "Direct dispatch from our factory with weekly replenishment on top SKUs.",
  },
  {
    Icon: Handshake,
    title: "Trade Margins",
    body: "Industry-leading dealer pricing tiered to volume, with quarterly performance bonuses.",
  },
];

export default function Portal() {
  return (
    <section
      id="portal"
      data-testid="portal-section"
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 bg-grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl">
          <span className="eyebrow">— Architect & Dealer Portal</span>
          <h2
            className="mt-4 font-display text-[38px] sm:text-[48px] md:text-[58px] leading-[1.08] text-[#F5F5F7]"
            style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            Specifications,
            <br />
            <span className="font-accent text-[#B87333]" style={{ fontWeight: 500 }}>
              at your desk
            </span>
            .
          </h2>
          <p className="mt-6 text-[16px] md:text-[17px] text-[#F5F5F7]/65 max-w-xl">
            A working set of resources for architects, contractors, and our growing dealer network.
          </p>
        </div>

        <div className="mt-14 rounded-2xl md:rounded-3xl border border-white/10 glass overflow-hidden">
          <Tabs defaultValue="become-dealer">
            <div className="border-b border-white/10 px-5 md:px-7 py-4">
              <TabsList
                data-testid="portal-tabs"
                className="bg-white/[0.04] border border-white/10"
              >
                <TabsTrigger
                  value="become-dealer"
                  data-testid="portal-tab-become-dealer"
                  className="data-[state=active]:bg-[#F5F5F7] data-[state=active]:text-[#0B0B0B] text-[#F5F5F7]/70"
                >
                  <Handshake size={14} className="mr-2" /> Become a Dealer
                </TabsTrigger>
                <TabsTrigger
                  value="samples"
                  data-testid="portal-tab-samples"
                  className="data-[state=active]:bg-[#F5F5F7] data-[state=active]:text-[#0B0B0B] text-[#F5F5F7]/70"
                >
                  <Package size={14} className="mr-2" /> Samples
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="become-dealer" className="p-5 md:p-8 lg:p-10">
              <BecomeDealerPanel />
            </TabsContent>

            <TabsContent value="samples" className="p-6 md:p-8">
              <p className="text-[14.5px] text-[#F5F5F7]/70 max-w-xl">
                Request physical sample swatches delivered to your studio. Complimentary
                for verified architects and design firms.
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <a
                  href="#contact"
                  data-testid="portal-sample-cta"
                  className="inline-flex btn-pill btn-pill-copper"
                >
                  Request Sample Kit
                </a>
                <a
                  href={waLink("Hi Meridian — I'd like to request a sample kit for my project.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="portal-sample-whatsapp"
                  className="inline-flex btn-pill btn-pill-ghost"
                >
                  <MessageCircle size={15} />
                  Connect on WhatsApp
                </a>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

function BecomeDealerPanel() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
      {/* Left — benefits */}
      <div className="md:col-span-6">
        <h3
          className="font-display text-[28px] md:text-[34px] leading-[1.05] text-[#F5F5F7]"
          style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Build your business with{" "}
          <span className="font-accent text-[#B87333]" style={{ fontWeight: 500 }}>
            Meridian
          </span>
          .
        </h3>
        <p className="mt-4 text-[16px] md:text-[17px] leading-relaxed text-[#F5F5F7]/65 max-w-md">
          We partner with serious building-material retailers and project distributors who share
          our standards. Apply to become an authorised Meridian dealer in your city.
        </p>

        <ul className="mt-8 space-y-5">
          {DEALER_BENEFITS.map(({ Icon, title, body }, i) => (
            <li
              key={title}
              className="flex gap-4"
              data-testid={`dealer-benefit-${i}`}
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#B87333]/15 border border-[#B87333]/35">
                <Icon size={15} className="text-[#B87333]" />
              </span>
              <div>
                <div
                  className="font-display text-[16px] md:text-[17px] text-[#F5F5F7]"
                  style={{ fontWeight: 600 }}
                >
                  {title}
                </div>
                <div className="mt-1 text-[13px] leading-relaxed text-[#F5F5F7]/55 max-w-md">
                  {body}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — application form */}
      <div className="md:col-span-6">
        <DealerApplicationForm />
      </div>
    </div>
  );
}

function DealerApplicationForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    city: "",
    state: "",
    years_in_business: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.company || !form.city) {
      toast.error("Please complete name, email, phone, company and city.");
      return;
    }
    setSubmitting(true);
    try {
      const payload = {
        ...form,
        years_in_business: form.years_in_business ? parseInt(form.years_in_business, 10) : null,
      };
      await axios.post(`${API}/dealers`, payload);
      toast.success("Application received", {
        description: "Our dealer development team will reach out within 2 business days.",
      });
      setDone(true);
    } catch (err) {
      toast.error("Submission failed", {
        description: err?.response?.data?.detail || "Please try again or call us directly.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div
        data-testid="dealer-application-success"
        className="rounded-3xl border border-[#B87333]/40 bg-gradient-to-b from-[#1a1208] to-[#0E0E0E] p-8 md:p-10 ring-copper"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#B87333]/20 border border-[#B87333]/40">
          <Check size={22} className="text-[#B87333]" strokeWidth={2.5} />
        </div>
        <h4
          className="mt-5 font-display text-[22px] md:text-[26px] text-[#F5F5F7]"
          style={{ fontWeight: 600, letterSpacing: "-0.015em" }}
        >
          Application received.
        </h4>
        <p className="mt-3 text-[14px] leading-relaxed text-[#F5F5F7]/70 max-w-sm">
          Our dealer development team will review your details and reach out within 2 business
          days. In the meantime, feel free to call us directly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      data-testid="dealer-application-form"
      className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#111111] to-[#0B0B0B] p-6 md:p-8"
    >
      <div className="eyebrow mb-1">— Dealer Application</div>
      <h4
        className="font-display text-[20px] md:text-[24px] text-[#F5F5F7]"
        style={{ fontWeight: 600, letterSpacing: "-0.015em" }}
      >
        Apply in 60 seconds.
      </h4>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Full name" required>
          <input
            value={form.name}
            onChange={update("name")}
            data-testid="dealer-input-name"
            placeholder="Your name"
            className="dealer-input"
          />
        </Field>
        <Field label="Email" required>
          <input
            type="email"
            value={form.email}
            onChange={update("email")}
            data-testid="dealer-input-email"
            placeholder="you@store.com"
            className="dealer-input"
          />
        </Field>
        <Field label="Phone" required>
          <input
            value={form.phone}
            onChange={update("phone")}
            data-testid="dealer-input-phone"
            placeholder="+91"
            className="dealer-input"
          />
        </Field>
        <Field label="Company / Firm" required>
          <input
            value={form.company}
            onChange={update("company")}
            data-testid="dealer-input-company"
            placeholder="Your firm name"
            className="dealer-input"
          />
        </Field>
        <Field label="City" required>
          <input
            value={form.city}
            onChange={update("city")}
            data-testid="dealer-input-city"
            placeholder="City"
            className="dealer-input"
          />
        </Field>
        <Field label="State">
          <input
            value={form.state}
            onChange={update("state")}
            data-testid="dealer-input-state"
            placeholder="State"
            className="dealer-input"
          />
        </Field>
        <Field label="Years in trade" className="sm:col-span-2">
          <input
            type="number"
            min="0"
            max="100"
            value={form.years_in_business}
            onChange={update("years_in_business")}
            data-testid="dealer-input-years"
            placeholder="e.g. 8"
            className="dealer-input"
          />
        </Field>
        <Field label="Why Meridian?" className="sm:col-span-2">
          <textarea
            value={form.message}
            onChange={update("message")}
            data-testid="dealer-input-message"
            rows={3}
            placeholder="Brands you currently carry, monthly volume, primary architect customers…"
            className="dealer-input resize-none"
          />
        </Field>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          disabled={submitting}
          data-testid="dealer-submit-button"
          className="btn-pill btn-pill-copper disabled:opacity-60"
        >
          {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
          {submitting ? "Submitting…" : "Submit Application"}
        </button>
        <a
          href={waLink(
            `Hi Meridian — I'd like to apply to become an authorised dealer${
              form.city ? ` in ${form.city}` : ""
            }${form.company ? ` (${form.company})` : ""}.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="dealer-whatsapp-button"
          className="btn-pill btn-pill-ghost"
        >
          <MessageCircle size={15} />
          Connect on WhatsApp
        </a>
      </div>

      <style>{`
        .dealer-input {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 14px;
          color: #F5F5F7;
          font-size: 16px;
          font-family: var(--font-sans);
          transition: border-color 280ms ease, background-color 280ms ease, box-shadow 280ms ease;
        }
        .dealer-input::placeholder { color: rgba(246,241,233,0.32); }
        .dealer-input:focus {
          outline: none;
          border-color: rgba(184,115,51,0.55);
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 0 3px rgba(184,115,51,0.15);
        }
      `}</style>
    </form>
  );
}

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <div className="mb-1.5 text-[10px] tracking-[0.24em] uppercase text-[#A3A3A3]">
        {label} {required && <span className="text-[#B87333]">*</span>}
      </div>
      {children}
    </label>
  );
}
