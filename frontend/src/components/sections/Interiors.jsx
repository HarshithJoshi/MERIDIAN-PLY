import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { GALLERY } from "@/lib/meridian";

export default function Interiors() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth out the scroll-driven values for buttery cross-dissolves
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section
      id="interiors"
      data-testid="interiors-section"
      ref={sectionRef}
      className="relative bg-[#0B0B0B]"
      // 1 viewport per slide for the pinned sequence
      style={{ height: `${GALLERY.length * 100}vh` }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Slides stack — each fades + zooms into view at its scroll segment */}
        {GALLERY.map((g, i) => (
          <Slide key={g.title} item={g} index={i} total={GALLERY.length} progress={smooth} />
        ))}

        {/* Persistent overlay: eyebrow + counter + progress rail */}
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col">
          {/* Top eyebrow */}
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24 pt-28 md:pt-32">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-shadow-cinema">— Interior Applications</span>
              <Counter progress={smooth} total={GALLERY.length} />
            </div>
          </div>

          <div className="flex-1" />

          {/* Bottom progress rail */}
          <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24 pb-10 md:pb-14">
            <ProgressRail progress={smooth} total={GALLERY.length} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Slide({ item, index, total, progress }) {
  // Each slide owns the segment [i/total, (i+1)/total]
  const seg = 1 / total;
  const segStart = index * seg;
  const segEnd = (index + 1) * seg;

  // Crossfade windows — gentle 35% overlap so slides cross-dissolve
  const fadeIn = segStart - seg * 0.35;
  const fadeOut = segEnd - seg * 0.05;

  const opacity = useTransform(
    progress,
    [Math.max(0, fadeIn), segStart + seg * 0.05, fadeOut, Math.min(1, fadeOut + seg * 0.35)],
    [0, 1, 1, 0]
  );

  // Ken Burns: continuous slow zoom + slight pan throughout the slide window
  const scale = useTransform(progress, [segStart - seg * 0.5, segEnd + seg * 0.5], [1.18, 1.0]);
  const yImg = useTransform(progress, [segStart - seg * 0.5, segEnd + seg * 0.5], ["-3%", "3%"]);

  // Caption motion
  const captionY = useTransform(progress, [segStart - seg * 0.2, segStart + seg * 0.1, segEnd - seg * 0.05, segEnd + seg * 0.2], [40, 0, 0, -30]);
  const captionOpacity = useTransform(progress, [segStart - seg * 0.2, segStart + seg * 0.1, segEnd - seg * 0.05, segEnd + seg * 0.2], [0, 1, 1, 0]);

  return (
    <motion.div
      data-testid={`interior-slide-${index}`}
      style={{ opacity }}
      className="absolute inset-0"
    >
      {/* Background image with ken-burns */}
      <motion.div style={{ scale, y: yImg, willChange: "transform" }} className="absolute inset-0 -top-[4%] -bottom-[4%]">
        <img
          src={item.src}
          alt={item.title}
          loading={index === 0 ? "eager" : "lazy"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>

      {/* Cinematic gradient legibility */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_120%,rgba(11,11,11,0.0)_0%,rgba(11,11,11,0.45)_55%,rgba(11,11,11,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,11,0.78)_0%,rgba(11,11,11,0.35)_28%,rgba(11,11,11,0.0)_55%,rgba(11,11,11,0.0)_100%)]" />

      {/* Caption — bottom-left, Apple style */}
      <motion.div
        style={{ y: captionY, opacity: captionOpacity }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12 lg:px-24 pb-28 md:pb-32">
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

function Counter({ progress, total }) {
  // Format like "01 — 05" with the current index reactive
  const indexMV = useTransform(progress, (p) => {
    const i = Math.min(total - 1, Math.max(0, Math.floor(p * total + 0.0001)));
    return String(i + 1).padStart(2, "0");
  });
  return (
    <div className="flex items-baseline gap-2 font-mono text-[11px] tracking-[0.28em] uppercase text-[#F6F1E9]/70 text-shadow-cinema">
      <motion.span data-testid="interiors-counter-current">{indexMV}</motion.span>
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
      </div>
      <div className="relative h-px w-full bg-white/15 overflow-hidden">
        <motion.div style={{ width: fill }} className="absolute left-0 top-0 h-full bg-[#B87333]" />
        {/* Segment ticks */}
        <div className="absolute inset-0 flex justify-between pointer-events-none">
          {Array.from({ length: total + 1 }).map((_, i) => (
            <span key={i} className="h-[7px] -translate-y-[3px] w-px bg-white/30" />
          ))}
        </div>
      </div>
    </div>
  );
}
