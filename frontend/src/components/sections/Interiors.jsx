import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GALLERY } from "@/lib/meridian";

export default function Interiors() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [travelPx, setTravelPx] = useState(0); // how many px the track needs to scroll horizontally

  // Measure track width vs viewport width to compute exact horizontal travel
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const viewportW = window.innerWidth;
      const trackW = track.scrollWidth;
      const t = Math.max(0, trackW - viewportW);
      setTravelPx(t);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travelPx]);

  // Section height: 1 viewport for the fixed pin + travelPx of vertical scroll for the traversal
  const sectionHeight = `calc(100vh + ${travelPx}px)`;

  return (
    <section
      id="interiors"
      data-testid="interiors-section"
      ref={sectionRef}
      className="relative bg-[#0B0B0B]"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-center bg-grain">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24 w-full">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div className="max-w-xl">
              <span className="eyebrow">— Interior Applications</span>
              <h2
                className="mt-4 font-display text-[32px] sm:text-[44px] md:text-[60px] leading-[1.02] text-[#F6F1E9]"
                style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
              >
                Spaces specified
                <br />
                <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>in Meridian</span>.
              </h2>
            </div>
            <div className="hidden md:block text-[11px] text-[#F6F1E9]/45 tracking-[0.22em] uppercase font-mono">
              Scroll to traverse →
            </div>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="flex gap-6 md:gap-8 px-6 md:px-12 lg:px-24"
        >
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.title}
              data-testid={`interior-card-${i}`}
              className="relative shrink-0 w-[78vw] sm:w-[58vw] md:w-[44vw] lg:w-[36vw] aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <img
                src={g.src}
                alt={g.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1500ms] group-hover:scale-[1.06]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/95 via-[#0B0B0B]/30 to-transparent" />
              <figcaption className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#B87333] font-mono">
                  {String(i + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}
                </div>
                <h3 className="mt-3 font-display text-[22px] md:text-[28px] text-[#F6F1E9]" style={{ fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {g.title}
                </h3>
                <p className="mt-1 text-[12.5px] text-[#F6F1E9]/65">{g.location}</p>
                <p className="mt-3 text-[11.5px] text-[#F6F1E9]/45 tracking-[0.12em] uppercase font-mono">{g.finish}</p>
              </figcaption>
            </motion.figure>
          ))}
          {/* Trailing breathing room so the last card lands cleanly off the right edge */}
          <div className="shrink-0 w-[6vw]" aria-hidden />
        </motion.div>
      </div>
    </section>
  );
}
