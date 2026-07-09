import { Plus } from "lucide-react";
import { BRAND } from "@/lib/meridian";

export const FAQS = [
  {
    q: "What is BWP Gurjan plywood?",
    a: "BWP (Boiling Water Proof) Gurjan plywood is a premium waterproof plywood made from 100% Gurjan hardwood veneers bonded with phenol-formaldehyde resin to the IS 710 standard. Meridian's BWP Gurjan plywood uses a 13-layer cross-banded core that survives 72 hours of continuous boiling water without delamination — ideal for kitchens, bathrooms and furniture built to last generations.",
  },
  {
    q: "What is the difference between marine plywood and BWP plywood?",
    a: "Both are manufactured to IS 710 and are boiling waterproof. Gurjan Marine plywood is engineered for prolonged water exposure with yacht-grade adhesion — boats, jetties and permanently wet areas — while BWP Gurjan plywood is the flagship choice for premium interiors: wardrobes, kitchens and architectural furniture. Meridian offers both in 18mm, 16mm, 12mm, 9mm and 6mm.",
  },
  {
    q: "Is Meridian Gurjan plywood IS 710 certified?",
    a: "Yes. Meridian BWP Gurjan and Gurjan Marine plywood are manufactured to IS 710 (BWP marine grade) under ISO 9001 certified processes — 100% Gurjan hardwood core, pressure-treated against termites and borers, and backed by a lifetime performance warranty.",
  },
  {
    q: "Which plywood is best for kitchen cabinets and bathrooms?",
    a: "For kitchens and bath vanities we recommend Gurjan Marine BWP plywood — 16mm or 18mm for carcasses and shutters, 6–12mm for backs and partitions. Its boiling-waterproof bond, 780 kg/m³ density and 280 kgf screw-holding strength keep cabinetry rigid through decades of humidity, steam and spills.",
  },
  {
    q: "What sizes and thicknesses are available?",
    a: "Standard 8 × 4 ft sheets in 18mm, 16mm, 12mm, 9mm and 6mm across both BWP Gurjan and Gurjan Marine plywood, alongside Gurjan block boards and flush doors. Custom requirements can be arranged through our dealer network.",
  },
  {
    q: "Where can I buy Gurjan Marine BWP plywood in Hyderabad?",
    a: `Visit the Meridian flagship company store at Aghapura, Hyderabad — 14-1-327/328, Behind Prakash Talkies Lane, Near Jain Mandir — our authorised distributor for Telangana. Or call / WhatsApp ${BRAND.phone} for pan-India dealer routing and architect sample kits.`,
  },
];

export default function Faq() {
  return (
    <section
      id="faq"
      data-testid="faq-section"
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-40 bg-grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="eyebrow">— Plywood Knowledge</span>
            <h2
              className="mt-4 font-display text-[36px] sm:text-[48px] md:text-[56px] leading-[1.08] text-[#F5F5F7]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Gurjan Marine BWP plywood,{" "}
              <span className="font-accent text-[#B87333]" style={{ fontWeight: 500 }}>
                explained
              </span>
              .
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] text-[#F5F5F7]/65 max-w-md leading-relaxed">
              Straight answers on IS 710 grades, Gurjan hardwood cores, and choosing
              the right waterproof plywood for your project.
            </p>
          </div>

          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {FAQS.map((f, i) => (
                <details
                  key={f.q}
                  data-testid={`faq-item-${i}`}
                  className="faq-item group border-b border-white/10"
                >
                  <summary
                    data-testid={`faq-question-${i}`}
                    className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 md:py-7 [&::-webkit-details-marker]:hidden"
                  >
                    <span
                      className="font-display text-[16.5px] md:text-[18px] text-[#F5F5F7] transition-colors duration-300 group-hover:text-[#B87333]"
                      style={{ fontWeight: 500, letterSpacing: "-0.01em" }}
                    >
                      {f.q}
                    </span>
                    <span className="faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#B87333] transition-all duration-300">
                      <Plus size={14} strokeWidth={2.2} />
                    </span>
                  </summary>
                  <p
                    data-testid={`faq-answer-${i}`}
                    className="faq-answer pb-7 pr-2 md:pr-14 text-[16px] md:text-[17px] leading-relaxed text-[#F5F5F7]/65"
                  >
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .faq-item[open] .faq-icon { transform: rotate(45deg); border-color: rgba(184,115,51,0.55); background: rgba(184,115,51,0.12); }
        .faq-item[open] summary span:first-child { color: #B87333; }
        .faq-answer { animation: faqReveal 480ms cubic-bezier(0.2, 0.7, 0.2, 1); }
        @keyframes faqReveal {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
