import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, ArrowRight, ShieldCheck, BadgeCheck } from "lucide-react";
import { IMAGES, BRAND } from "@/lib/meridian";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

export default function Hero() {
  const ref = useRef(null);
  const isTouch = useIsTouchDevice();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // On iPad/iOS, scroll-coupled transforms on a full-bleed image are the single
  // biggest source of jank — every scroll event invalidates a huge layer.
  // Keep transforms static (constant motion values) on touch devices.
  const yImg = useTransform(scrollYProgress, [0, 1], isTouch ? ["0%", "0%"] : ["0%", "14%"]);
  const yText = useTransform(scrollYProgress, [0, 1], isTouch ? ["0%", "0%"] : ["0%", "-8%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], isTouch ? [1, 1] : [1, 0]);

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
        style={{ y: yImg, willChange: "transform" }}
        className="absolute inset-0 -top-[5%] -bottom-[5%]"
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

      {/* Massive brand mark watermark, sitting behind the headline.
          Subtle copper-tinted, vertically tracked with reduced parallax.
          The heavy multi-channel filter is dropped on touch devices to avoid
          a full-screen GPU recolour every scroll frame on iPad Safari. */}
      <motion.img
        src={IMAGES.logoMark}
        alt=""
        aria-hidden
        style={{
          y: yText,
          willChange: isTouch ? "auto" : "transform",
          filter: isTouch
            ? "none"
            : "invert(56%) sepia(34%) saturate(620%) hue-rotate(348deg) brightness(82%) contrast(95%)",
          opacity: isTouch ? 0.04 : undefined,
        }}
        className="hidden md:block pointer-events-none absolute right-[2%] lg:right-[6%] top-1/2 -translate-y-1/2 z-[5] h-[60vh] max-h-[640px] w-auto opacity-[0.07] select-none"
      />

      {/* Foreground content */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-[1400px] flex-col justify-center px-6 md:px-12 lg:px-24 pt-24 md:pt-28 pb-12 md:pb-14"
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="flex items-center gap-3"
        >
          <span className="eyebrow">BWP · GURJAN · ISI 710</span>
          <span className="hidden sm:inline text-[#F6F1E9]/35">·</span>
          <span className="hidden sm:inline italic text-[12px] tracking-[0.06em] text-[#B87333]/85">
            {BRAND.legacyTagline}
          </span>
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
          className="mt-6 max-w-[640px] text-[15px] md:text-[17px] leading-relaxed text-[#F6F1E9]/75"
        >
          Premium BWP Gurjan plywood engineered for timeless durability and
          architectural elegance. A single sheet, decades of integrity.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.0, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
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
            data-testid="hero-cta-contact"
            className="btn-pill btn-pill-ghost"
          >
            Speak to a Specifier
          </a>
        </motion.div>

        {/* Trust pills — ISO 9001 + 25-year warranty. The product-line
            tagline now lives on its own line beneath the pills (was
            crowding the trust row before). */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.15, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <span
            data-testid="hero-trust-iso"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase font-mono text-[#F6F1E9]/85"
          >
            <ShieldCheck size={13} className="text-[#B87333]" strokeWidth={2.2} />
            ISO 9001:2008 Certified
          </span>
          <span
            data-testid="hero-trust-warranty"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] border border-white/10 px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase font-mono text-[#F6F1E9]/85"
          >
            <BadgeCheck size={13} className="text-[#B87333]" strokeWidth={2.2} />
            25-Year Warranty
          </span>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-4 italic text-[12.5px] tracking-[0.01em] text-[#F6F1E9]/55"
        >
          — {BRAND.buildTagline}
        </motion.p>

        {/* Stat row — copper hairline separators between stats add quiet rhythm */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-10 md:mt-12 grid grid-cols-3 max-w-3xl gap-6 md:gap-10 border-t border-white/10 pt-5 md:pt-7 divide-x divide-white/[0.07]"
        >
          {[
            { k: "72 hrs", v: "Boiling Water Test" },
            { k: "100%", v: "Gurjan Hardwood Core" },
            { k: "Lifetime", v: "Performance Warranty" },
          ].map((s, idx) => (
            <div key={s.v} data-testid={`hero-stat-${s.v}`} className={idx > 0 ? "pl-6 md:pl-10" : ""}>
              <div className="font-display text-[22px] sm:text-[26px] md:text-[32px] text-[#F6F1E9] tracking-tight" style={{ fontWeight: 600 }}>
                {s.k}
              </div>
              <div className="mt-1 text-[10px] md:text-[12px] tracking-[0.18em] uppercase text-[#A3A3A3]">{s.v}</div>
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
        className="absolute bottom-9 right-24 md:right-28 z-10 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#F6F1E9]/55 hidden [@media(min-height:700px)]:flex"
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
