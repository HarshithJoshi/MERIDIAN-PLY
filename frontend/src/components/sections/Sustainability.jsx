import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Leaf, TreePine, Recycle, ShieldCheck } from "lucide-react";
import { IMAGES } from "@/lib/meridian";

const PILLARS = [
  { Icon: TreePine, title: "Responsibly Sourced", body: "Plantation-grown Gurjan from certified suppliers with chain-of-custody documentation." },
  { Icon: Recycle, title: "Closed-Loop Press", body: "Waste veneers recycled into core fill — zero landfill from our adhesive line." },
  { Icon: Leaf, title: "Low Emission Resin", body: "E1 grade formaldehyde compliance, well below international thresholds." },
  { Icon: ShieldCheck, title: "FSC & ISI Certified", body: "Audited annually by independent third-party agencies." },
];

export default function Sustainability() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="sustainability"
      data-testid="sustainability-section"
      ref={ref}
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 overflow-hidden"
    >
      {/* Forest backdrop */}
      <motion.div aria-hidden style={{ y: yImg }} className="absolute inset-0 -top-[10%] -bottom-[10%] opacity-50">
        <img src={IMAGES.forest} alt="" className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(11,11,11,0.3)_0%,rgba(11,11,11,0.92)_70%)]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-end">
          <div className="md:col-span-8 max-w-2xl">
            <span className="eyebrow" style={{ color: "rgba(74,143,90,0.95)" }}>— Sustainability</span>
            <h2
              className="mt-4 font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02] text-[#F6F1E9]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Strength with
              <br />
              <span className="italic" style={{ color: "#4a8f5a", fontWeight: 500 }}>responsibility</span>.
            </h2>
            <p className="mt-6 text-[15px] md:text-[16px] leading-relaxed text-[#F6F1E9]/70 max-w-xl">
              Every Meridian sheet carries a quiet promise — that the forest it
              came from remains stronger than when we sourced it.
            </p>
          </div>

          {/* The brand mark — a sapling growing from cradled hands — speaks directly to
              our sustainability promise. Tinted in our forest accent. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 1.1, ease: [0.2, 0.7, 0.2, 1] }}
            className="md:col-span-4 flex md:justify-end"
            data-testid="sustainability-brand-mark"
          >
            <img
              src={IMAGES.logoMark}
              alt="Meridian — a sapling cradled in hands"
              className="h-32 sm:h-40 md:h-44 lg:h-48 w-auto select-none"
              style={{
                filter:
                  "invert(48%) sepia(38%) saturate(420%) hue-rotate(82deg) brightness(92%) contrast(92%) drop-shadow(0 6px 18px rgba(74,143,90,0.25))",
              }}
            />
          </motion.div>
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              data-testid={`sustainability-pillar-${i}`}
              className="glass rounded-2xl p-7 hover:border-[rgba(74,143,90,0.4)] transition-colors duration-500"
            >
              <Icon size={22} style={{ color: "#4a8f5a" }} />
              <h3 className="mt-5 font-display text-[18px] text-[#F6F1E9]" style={{ fontWeight: 600 }}>{title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-[#F6F1E9]/60">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
