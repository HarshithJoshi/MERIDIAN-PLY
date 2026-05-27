import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { IMAGES, BRAND } from "@/lib/meridian";

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      data-testid="hero-section"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-grain"
    >
      {/* Background image */}
      <motion.div
        aria-hidden
        style={{ y: yImg }}
        className="absolute inset-0 -top-[8%] -bottom-[8%]"
      >
        <img
          src={IMAGES.hero}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* cinematic gradient overlays for legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_120%,rgba(11,11,11,0)_0%,rgba(11,11,11,0.55)_55%,rgba(11,11,11,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.55)_0%,rgba(11,11,11,0.0)_30%,rgba(11,11,11,0.0)_55%,rgba(11,11,11,0.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,11,0.55)_0%,rgba(11,11,11,0)_28%,rgba(11,11,11,0)_70%,rgba(11,11,11,0.55)_100%)]" />
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-12 lg:px-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="eyebrow"
        >
          BWP · GURJAN · ISI 710
        </motion.div>

        <motion.h1
          data-testid="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
          className="font-display mt-6 text-[44px] leading-[1.02] tracking-tight text-[#F6F1E9] sm:text-[64px] md:text-[88px] lg:text-[112px] text-shadow-cinema"
          style={{ fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          Built to Endure.
          <br />
          <span className="text-[#B87333]/95 italic font-display" style={{ fontWeight: 500 }}>
            Designed
          </span>{" "}
          to Inspire.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-7 max-w-[640px] text-[15px] md:text-[17px] leading-relaxed text-[#F6F1E9]/75"
        >
          Premium BWP Gurjan plywood engineered for timeless durability and
          architectural elegance. A single sheet, decades of integrity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-3"
        >
          <a
            href="#products"
            data-testid="hero-cta-explore"
            className="btn-pill btn-pill-primary"
          >
            Explore the Collection
            <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            data-testid="hero-cta-catalogue"
            className="btn-pill btn-pill-ghost"
          >
            Download Technical Catalogue
          </a>
        </motion.div>

        {/* Stat row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-16 hidden md:grid grid-cols-3 max-w-3xl gap-10 border-t border-white/10 pt-8"
        >
          {[
            { k: "72 hrs", v: "Boiling Water Test" },
            { k: "100%", v: "Gurjan Hardwood Core" },
            { k: "Lifetime", v: "Performance Warranty" },
          ].map((s) => (
            <div key={s.v} data-testid={`hero-stat-${s.v}`}>
              <div className="font-display text-[32px] text-[#F6F1E9] tracking-tight" style={{ fontWeight: 600 }}>
                {s.k}
              </div>
              <div className="mt-1 text-[12px] tracking-[0.18em] uppercase text-[#A3A3A3]">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#material"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F6F1E9]/55"
        data-testid="hero-scroll-cue"
      >
        Scroll
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
