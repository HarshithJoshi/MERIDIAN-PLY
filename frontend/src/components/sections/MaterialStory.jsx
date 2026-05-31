import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMAGES } from "@/lib/meridian";

const STORY = [
  {
    eyebrow: "01 · The Core",
    title: "From dense Gurjan hardwood.",
    body:
      "Each panel begins as densely-grained Gurjan timber — the strongest, most stable hardwood in its class. Selected, kiln-conditioned, and quarter-cut for an unbroken grain that the eye remembers.",
    image: IMAGES.exploded,
  },
  {
    eyebrow: "02 · The Bond",
    title: "Boiling-waterproof, by design.",
    body:
      "Phenol-formaldehyde resin under 30+ tonnes of hot press pressure. The bond outlasts the surface — engineered to survive 72 hours of continuous boiling water without delamination.",
    image: IMAGES.water,
  },
  {
    eyebrow: "03 · The Finish",
    title: "A surface worth showing.",
    body:
      "Calibrated to architectural tolerance — a flawless, screw-grade substrate that finishes like cabinetry from the moment it leaves the press.",
    image: IMAGES.kitchen,
  },
];

export default function MaterialStory() {
  return (
    <section
      id="material"
      data-testid="material-story-section"
      className="relative bg-[#0B0B0B] bg-grain py-24 md:py-32 lg:py-48"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <span className="eyebrow" data-testid="material-eyebrow">— The Material</span>
          <h2
            className="mt-4 font-display tracking-tight text-[#F6F1E9] text-[40px] sm:text-[56px] md:text-[72px] leading-[1.03]"
            style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            Crafted from the
            <br />
            strength of{" "}
            <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>
              Gurjan
            </span>
            .
          </h2>
          <p className="mt-6 max-w-2xl text-[15px] md:text-[17px] leading-relaxed text-[#F6F1E9]/65">
            A material biography — three quiet truths about why our plywood
            stands apart from the industry.
          </p>
        </div>

        <div className="mt-20 md:mt-28 space-y-32 md:space-y-48">
          {STORY.map((item, idx) => (
            <StoryPanel key={item.title} item={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryPanel({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.04, 1.0, 1.04]);
  const flip = index % 2 === 1;

  return (
    <div
      ref={ref}
      data-testid={`material-panel-${index}`}
      className={`grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center ${
        flip ? "md:[direction:rtl]" : ""
      }`}
    >
      <div className="md:col-span-7 [direction:ltr]">
        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-white/10 aspect-[4/3] md:aspect-[5/4]">
          <motion.img
            src={item.image}
            alt={item.title}
            style={{ y, scale, willChange: "transform" }}
            className="absolute inset-0 h-[110%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/55 via-transparent to-transparent" />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
        className="md:col-span-5 [direction:ltr]"
      >
        <span className="eyebrow">{item.eyebrow}</span>
        <h3
          className="mt-4 font-display text-[28px] sm:text-[36px] md:text-[44px] leading-[1.08] text-[#F6F1E9]"
          style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          {item.title}
        </h3>
        <p className="mt-5 text-[15px] md:text-[16px] leading-relaxed text-[#F6F1E9]/65 max-w-md">
          {item.body}
        </p>
      </motion.div>
    </div>
  );
}
