import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { GALLERY } from "@/lib/meridian";
import useIsTouchDevice from "@/lib/useIsTouchDevice";

export default function Interiors() {
  const sectionRef = useRef(null);
  const isTouch = useIsTouchDevice();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Active slide index — only this one (+ next, for crossfade) is mounted/animated.
  // Heavy reduction in concurrent layer work => smooth scroll on iPad / mid-range GPUs.
  const [active, setActive] = useState(0);
  const total = GALLERY.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(v * total + 0.0001)));
    setActive(i);
  });

  return (
    <section
      id="interiors"
      data-testid="interiors-section"
      ref={sectionRef}
      className="relative bg-[#0B0B0B]"
      style={{ height: `${total * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-[#0B0B0B]">
        {GALLERY.map((g, i) => (
          <Slide
            key={g.title}
            item={g}
            index={i}
            total={total}
            progress={scrollYProgress}
            isMounted={Math.abs(i - active) <= 1}
            isLCP={i === 0}
            isTouch={isTouch}
          />
        ))}

        {/* Persistent overlay: eyebrow + counter + progress rail */}
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col">
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24 pt-28 md:pt-32">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-shadow-cinema">— Interior Applications</span>
              <Counter active={active} total={total} />
            </div>
          </div>

          <div className="flex-1" />

          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24 pb-10 md:pb-14">
            <ProgressRail progress={scrollYProgress} total={total} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ item, index, total, progress, isMounted, isLCP, isTouch }) {
  // Linear opacity ramp across an overlap window — no spring, no nested transforms.
  const seg = 1 / total;
  const segStart = index * seg;
  const segEnd = (index + 1) * seg;
  const halo = seg * 0.18; // small overlap for crossfade

  const opacity = useTransform(
    progress,
    [
      Math.max(0, segStart - halo),
      segStart + halo * 0.6,
      segEnd - halo * 0.6,
      Math.min(1, segEnd + halo),
    ],
    [0, 1, 1, 0]
  );

  // Caption gets its own, tighter fade window so two slide titles are never
  // visible at the same time (fixes double-exposed text during crossfade on
  // slow iPad scrolling). All offsets stay within [0,1] (WAAPI requirement);
  // first slide is visible at progress 0, last slide stays visible at 1.
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const captionOpacity = useTransform(
    progress,
    [
      isFirst ? 0 : segStart + halo,
      isFirst ? halo : segStart + halo * 2.2,
      isLast ? 0.999 : segEnd - halo * 2.2,
      isLast ? 1 : segEnd - halo,
    ],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );

  // Single, gentle ken-burns: combined scale on a CSS variable — one transform, one layer.
  // On touch devices we freeze the scale — scroll-driven scale on a full-bleed
  // image inside a sticky container is the biggest paint cost on iPad Safari.
  const kb = useTransform(
    progress,
    [segStart - seg * 0.5, segEnd + seg * 0.5],
    isTouch ? [1, 1] : [1.12, 1.0]
  );

  // Mount nothing outside the active window — saves layout/paint cost on 4 hidden slides.
  if (!isMounted) return null;

  return (
    <motion.div
      data-testid={`interior-slide-${index}`}
      style={{
        opacity,
        // Promote to its own compositor layer & isolate paint:
        transform: "translate3d(0,0,0)",
        backfaceVisibility: "hidden",
        contain: "layout paint",
        willChange: "opacity",
      }}
      className="absolute inset-0"
    >
      {/* Image layer — ONE transform driving ken-burns. No nested motion divs. */}
      <motion.img
        src={item.src}
        alt={item.title}
        loading={isLCP ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={isLCP ? "high" : "auto"}
        style={{
          scale: kb,
          transformOrigin: "50% 55%",
          willChange: "transform",
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Static legibility gradient — pure CSS, no per-frame work */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(11,11,11,0.35)_0%,rgba(11,11,11,0)_25%,rgba(11,11,11,0)_55%,rgba(11,11,11,0.92)_100%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(90deg,rgba(11,11,11,0.6)_0%,rgba(11,11,11,0)_35%)]" />

      {/* Caption — animated via CSS opacity inheritance from parent for performance.
          (We tied it to the slide's own opacity rather than a separate motion value.) */}
      <motion.div style={{ opacity: captionOpacity }} className="absolute bottom-0 left-0 right-0 z-10">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24 pb-24 md:pb-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 text-[10px] tracking-[0.32em] uppercase text-[#B87333] font-mono">
              <span>{String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
              <span className="h-px w-10 bg-[#B87333]/55" />
              <span className="text-[#F6F1E9]/55">{item.location}</span>
            </div>
            <h3
              className="mt-5 font-display text-[40px] sm:text-[56px] md:text-[72px] leading-[1.02] text-[#F6F1E9] text-shadow-cinema"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              {item.title}
            </h3>
            <p className="mt-4 text-[12.5px] md:text-[13px] tracking-[0.18em] uppercase font-mono text-[#F6F1E9]/65">
              {item.finish}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Counter({ active, total }) {
  return (
    <div className="flex items-baseline gap-2 font-mono text-[11px] tracking-[0.28em] uppercase text-[#F6F1E9]/70 text-shadow-cinema">
      <span data-testid="interiors-counter-current">{String(active + 1).padStart(2, "0")}</span>
      <span className="text-[#F6F1E9]/35">/</span>
      <span className="text-[#F6F1E9]/35">{String(total).padStart(2, "0")}</span>
    </div>
  );
}

function ProgressRail({ progress, total }) {
  const fill = useTransform(progress, [0, 1], ["0%", "100%"]);
  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-[10px] tracking-[0.28em] uppercase text-[#F6F1E9]/45 font-mono">
          Scroll to traverse
        </span>
        <motion.span
          aria-hidden
          animate={{ x: [0, 8, 0], opacity: [0.4, 0.85, 0.4] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="h-px w-6 bg-[#B87333]"
        />
      </div>
      <div className="relative h-px w-full bg-white/15 overflow-hidden">
        <motion.div style={{ width: fill }} className="absolute left-0 top-0 h-full bg-[#B87333]" />
        <div className="absolute inset-0 flex justify-between pointer-events-none">
          {Array.from({ length: total + 1 }).map((_, i) => (
            <span key={i} className="h-[7px] -translate-y-[3px] w-px bg-white/30" />
          ))}
        </div>
      </div>
    </div>
  );
}
