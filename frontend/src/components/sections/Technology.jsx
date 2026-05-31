import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Droplets, Flame, Hammer, Layers, ShieldCheck, Wind } from "lucide-react";
import { PlyExploded, PlyLights } from "@/components/sections/PlyScene";

const FEATURES = [
  { Icon: Droplets, title: "Boiling Waterproof", body: "72-hour boil test pass. Marine-grade adhesive bond." },
  { Icon: Layers, title: "11-Layer Construction", body: "Cross-banded Gurjan veneers, calibrated to tolerance." },
  { Icon: Hammer, title: "Screw Holding 280kgf", body: "Industry-leading face & edge withdrawal strength." },
  { Icon: Flame, title: "Fire Retardant Treated", body: "Self-extinguishing core with ISI 5509 compliance." },
  { Icon: ShieldCheck, title: "Termite & Borer Proof", body: "Pressure-impregnated preservation, lifetime guard." },
  { Icon: Wind, title: "Warp Resistant", body: "Balanced grain stacking eliminates dimensional drift." },
];

export default function Technology() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const progress = useTransform(scrollYProgress, [0.15, 0.6], [0, 1]);

  return (
    <section
      id="technology"
      ref={sectionRef}
      data-testid="technology-section"
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 bg-grain overflow-hidden"
    >
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full blur-[140px] opacity-50 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at center, rgba(184,115,51,0.35), transparent 65%)" }} />

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <span className="eyebrow">— BWP Technology</span>
            <h2
              className="mt-4 font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02] text-[#F6F1E9]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Engineered at
              <br />
              every{" "}
              <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>layer</span>.
            </h2>
            <p className="mt-6 max-w-md text-[15px] md:text-[16px] leading-relaxed text-[#F6F1E9]/65">
              Scroll to deconstruct a Meridian panel. Nine cross-banded Gurjan
              veneers, bonded under high pressure with phenolic resin — performance
              built layer by layer.
            </p>
          </div>

          <div className="md:col-span-7">
            <div className="relative h-[420px] sm:h-[520px] md:h-[560px] lg:h-[600px] rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-gradient-to-b from-[#141414] to-[#0B0B0B]">
              <div className="absolute inset-0 wood-stripes opacity-30 pointer-events-none" />
              <Canvas
                shadows
                camera={{ position: [0, 1.8, 5.6], fov: 35 }}
                dpr={[1, 1.4]}
                gl={{ antialias: true, powerPreference: "high-performance" }}
                data-testid="technology-3d-canvas"
              >
                <PlyLights />
                <PlyExploded progress={progress} />
              </Canvas>
              <div className="absolute bottom-4 left-5 right-5 flex justify-between text-[10px] font-mono uppercase tracking-[0.22em] text-[#F6F1E9]/55 pointer-events-none">
                <span>9 layers · gurjan</span>
                <span>cross-banded · phenolic</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/10">
          {FEATURES.map(({ Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
              data-testid={`technology-feature-${i}`}
              className="bg-[#0E0E0E] p-7 md:p-10 hover:bg-[#141414] transition-colors duration-500 group"
            >
              <Icon size={22} className="text-[#B87333] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="mt-5 font-display text-[18px] md:text-[20px] text-[#F6F1E9]" style={{ fontWeight: 600 }}>
                {title}
              </h4>
              <p className="mt-2 text-[13.5px] leading-relaxed text-[#F6F1E9]/55">
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
