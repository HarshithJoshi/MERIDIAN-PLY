import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ROWS = [
  { label: "Boiling Water Endurance", m: 96, o: 32, mLabel: "72 hrs", oLabel: "8 hrs" },
  { label: "Screw Holding Strength", m: 92, o: 48, mLabel: "280 kgf", oLabel: "140 kgf" },
  { label: "Density (kg/m³)", m: 88, o: 60, mLabel: "780", oLabel: "540" },
  { label: "Service Lifespan", m: 100, o: 38, mLabel: "Lifetime", oLabel: "8 yrs" },
  { label: "Termite Resistance", m: 100, o: 22, mLabel: "Pressure-treated", oLabel: "Standard" },
  { label: "Surface Finish Quality", m: 96, o: 55, mLabel: "Cabinet-grade", oLabel: "Industry std." },
];

export default function Performance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="performance"
      data-testid="performance-section"
      ref={ref}
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 bg-grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <span className="eyebrow">— Performance</span>
          <h2
            className="mt-4 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] text-[#F6F1E9]"
            style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
          >
            Performance beyond
            <br />
            <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>industry standards</span>.
          </h2>
          <p className="mt-6 text-[15px] md:text-[16px] text-[#F6F1E9]/65 max-w-xl">
            Independently benchmarked against generic BWP plywood from leading Indian mills.
            Higher is better.
          </p>
        </div>

        <div className="mt-16 md:mt-20 rounded-2xl md:rounded-3xl border border-white/10 bg-gradient-to-b from-[#111111] to-[#0B0B0B] p-6 md:p-10">
          <div className="hidden md:grid grid-cols-12 gap-4 text-[10px] uppercase tracking-[0.22em] text-[#A3A3A3] pb-5 border-b border-white/10">
            <div className="col-span-4">Specification</div>
            <div className="col-span-7">Performance</div>
            <div className="col-span-1 text-right">Result</div>
          </div>

          <div className="divide-y divide-white/5">
            {ROWS.map((row, i) => (
              <Row key={row.label} row={row} index={i} inView={inView} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-[11px] tracking-[0.18em] uppercase">
            <span className="flex items-center gap-2 text-[#F6F1E9]/80">
              <span className="h-2.5 w-2.5 rounded-full bg-[#B87333]" /> Meridian
            </span>
            <span className="flex items-center gap-2 text-[#F6F1E9]/55">
              <span className="h-2.5 w-2.5 rounded-full bg-white/25" /> Ordinary BWP
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ row, index, inView }) {
  return (
    <div
      data-testid={`performance-row-${index}`}
      className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 py-7 md:py-9 items-center"
    >
      <div className="md:col-span-4 font-display text-[16px] md:text-[18px] text-[#F6F1E9]" style={{ fontWeight: 500 }}>
        {row.label}
      </div>
      <div className="md:col-span-7 flex flex-col gap-2.5">
        <Bar value={row.m} label={`Meridian · ${row.mLabel}`} color="#B87333" delay={index * 0.08} inView={inView} />
        <Bar value={row.o} label={`Ordinary · ${row.oLabel}`} color="rgba(246,241,233,0.22)" delay={index * 0.08 + 0.08} inView={inView} />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
        transition={{ duration: 0.6, delay: index * 0.08 + 1.2, ease: [0.2, 0.7, 0.2, 1] }}
        className="md:col-span-1 md:text-right font-mono text-[12px] text-[#B87333]"
      >
        +{Math.round(((row.m - row.o) / Math.max(1, row.o)) * 100)}%
      </motion.div>
    </div>
  );
}

function Bar({ value, label, color, delay, inView }) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[12px] text-[#F6F1E9]/70">{label}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay, ease: [0.2, 0.7, 0.2, 1] }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}
