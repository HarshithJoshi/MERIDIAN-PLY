import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IMAGES } from "@/lib/meridian";
import { Quote } from "lucide-react";

const ITEMS = [
  {
    quote:
      "We specified Meridian across a 14-villa development. Three monsoons later, not a single panel has moved — the cabinetry still reads as it did on day one.",
    name: "Aanya Mehta",
    role: "Principal Architect · Studio Volume",
    portrait: IMAGES.portrait1,
  },
  {
    quote:
      "The cross-band consistency is what separates Meridian. Our routers stay sharp longer, our finishes lay flatter — the math just works.",
    name: "Rohan Iyer",
    role: "Head of Production · Atelier Carve",
    portrait: IMAGES.portrait2,
  },
  {
    quote:
      "I've worked with every BWP brand in India. Meridian is the only one I would call architectural-grade without qualification.",
    name: "Priya Saxena",
    role: "Interior Designer · Saxena & Co.",
    portrait: IMAGES.portrait3,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ITEMS.length), 7000);
    return () => clearInterval(id);
  }, []);

  const item = ITEMS[index];

  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-40 bg-grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <span className="eyebrow">— Voices</span>
        <h2
          className="mt-4 font-display text-[36px] sm:text-[48px] md:text-[60px] leading-[1.04] text-[#F6F1E9] max-w-3xl"
          style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
        >
          Trusted by India's
          <br />
          <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>quiet specifiers</span>.
        </h2>

        <div className="mt-14 md:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 relative min-h-[260px]">
            <Quote size={42} className="text-[#B87333]/35" />
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={item.name}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                className="mt-6 font-display text-[22px] sm:text-[26px] md:text-[32px] leading-[1.35] text-[#F6F1E9]"
                style={{ fontWeight: 400, letterSpacing: "-0.01em" }}
              >
                "{item.quote}"
              </motion.blockquote>
            </AnimatePresence>
            <div className="mt-8 flex gap-2">
              {ITEMS.map((_, i) => (
                <button
                  key={i}
                  data-testid={`testimonial-dot-${i}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-[6px] rounded-full transition-all duration-500 ${
                    i === index ? "w-9 bg-[#B87333]" : "w-3 bg-white/15 hover:bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden border border-white/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={item.portrait}
                  src={item.portrait}
                  alt={item.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
                  className="absolute inset-0 h-full w-full object-cover grayscale contrast-[1.05]"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-7 right-7">
                <div className="font-display text-[18px] text-[#F6F1E9]" style={{ fontWeight: 600 }}>{item.name}</div>
                <div className="mt-1 text-[12px] tracking-[0.16em] uppercase text-[#F6F1E9]/55 font-mono">{item.role}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
