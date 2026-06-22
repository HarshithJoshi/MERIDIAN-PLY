import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FALLBACK = [
  {
    slug: "bwp-gurjan",
    name: "BWP Gurjan Plywood",
    category: "Plywood",
    description: "100% Gurjan hardwood core with boiling waterproof bonding.",
    thickness: ["6mm", "9mm", "12mm", "16mm", "19mm", "25mm"],
    grade: "IS 710",
    water_resistance: "Boiling Waterproof",
    warranty: "Lifetime",
    applications: ["Modular kitchens", "Wardrobes", "Wet areas", "Heavy furniture"],
  },
  {
    slug: "marine-grade",
    name: "Marine Plywood",
    category: "Plywood",
    description: "Engineered for prolonged submersion. Yacht-grade adhesion.",
    thickness: ["9mm", "12mm", "19mm", "25mm"],
    grade: "IS 710 Marine",
    water_resistance: "Marine",
    warranty: "30 Years",
    applications: ["Marine craft", "Outdoor cabinetry", "Bathrooms"],
  },
  {
    slug: "block-board",
    name: "Gurjan Block Board",
    category: "Boards",
    description: "Solid hardwood batten core sandwiched between Gurjan veneers.",
    thickness: ["19mm", "25mm"],
    grade: "IS 1659",
    water_resistance: "BWR",
    warranty: "25 Years",
    applications: ["Doors", "Shelves", "Long spans"],
  },
  {
    slug: "decorative-veneer",
    name: "Decorative Veneers",
    category: "Surfaces",
    description: "Hand-selected natural veneers in walnut, oak and teak.",
    thickness: ["4mm"],
    grade: "Architectural",
    water_resistance: "MR",
    warranty: "10 Years",
    applications: ["Feature walls", "Furniture facades"],
  },
  {
    slug: "laminates",
    name: "Premium Laminates",
    category: "Surfaces",
    description: "High-pressure laminates with matte, textured and metallic finishes.",
    thickness: ["0.8mm", "1.0mm", "1.25mm"],
    grade: "EN 438",
    water_resistance: "Water-resistant",
    warranty: "15 Years",
    applications: ["Cabinetry", "Doors", "Wall panels"],
  },
  {
    slug: "mdf-hdf",
    name: "MDF & HDF Panels",
    category: "Panels",
    description: "Engineered density panels for precision routing and finishing.",
    thickness: ["6mm", "9mm", "12mm", "18mm"],
    grade: "E1",
    water_resistance: "MR / BWR",
    warranty: "10 Years",
    applications: ["Routed panels", "Lacquered fronts", "Acoustic"],
  },
];

const CATEGORIES = ["All", "Plywood", "Boards", "Surfaces", "Panels"];

export default function Products() {
  const [products, setProducts] = useState(FALLBACK);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/products`);
        if (res?.data?.products?.length) setProducts(res.data.products);
      } catch (err) {
        // Backend product list is optional — keep the static fallback that's
        // already in state and surface the failure in dev so we don't lose it.
        if (process.env.NODE_ENV !== "production") {
          console.warn("[Products] /api/products fetch failed, using fallback:", err?.message || err);
        }
      }
    })();
  }, []);

  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <section
      id="products"
      data-testid="products-section"
      className="relative bg-[#0B0B0B] py-24 md:py-32 lg:py-44 bg-grain"
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="eyebrow">— The Collection</span>
            <h2
              className="mt-4 font-display text-[40px] sm:text-[56px] md:text-[68px] leading-[1.02] text-[#F6F1E9]"
              style={{ fontWeight: 600, letterSpacing: "-0.025em" }}
            >
              Six surfaces. <span className="italic text-[#B87333]" style={{ fontWeight: 500 }}>One standard.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                data-testid={`products-filter-${c}`}
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-full text-[12px] tracking-[0.16em] uppercase transition-all duration-300 border ${
                  filter === c
                    ? "bg-[#F6F1E9] text-[#0B0B0B] border-[#F6F1E9]"
                    : "border-white/15 text-[#F6F1E9]/70 hover:text-[#F6F1E9] hover:border-[#B87333]/60"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.button
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.55, delay: i * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                whileHover={{ y: -4 }}
                onClick={() => setActive(p)}
                data-testid={`product-card-${p.slug}`}
                className="card-glow relative text-left rounded-2xl border border-white/10 bg-gradient-to-b from-[#141414] to-[#0E0E0E] p-8 overflow-hidden group"
              >
                <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-[#6A442B]/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[#B87333]">{p.category}</span>
                  <ArrowUpRight size={16} className="text-[#F6F1E9]/40 group-hover:text-[#B87333] group-hover:rotate-12 transition-all" />
                </div>
                <h3 className="mt-7 font-display text-[24px] md:text-[28px] leading-tight text-[#F6F1E9]" style={{ fontWeight: 600, letterSpacing: "-0.015em" }}>
                  {p.name}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-[#F6F1E9]/55 line-clamp-2">{p.description}</p>

                <div className="mt-7 grid grid-cols-2 gap-y-3 text-[12px] border-t border-white/10 pt-5">
                  <Field label="Grade" value={p.grade} />
                  <Field label="Resistance" value={p.water_resistance} />
                  <Field label="Warranty" value={p.warranty} />
                  <Field label="Thickness" value={`${p.thickness.length} options`} />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <ProductModal product={active} onClose={() => setActive(null)} />
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-[#A3A3A3]">{label}</div>
      <div className="mt-0.5 text-[#F6F1E9]/90 font-mono text-[12.5px]">{value}</div>
    </div>
  );
}

function ProductModal({ product, onClose }) {
  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          data-testid="product-modal"
        >
          <div className="absolute inset-0 bg-[#0B0B0B]/85 backdrop-blur-md" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative max-w-2xl w-full rounded-3xl border border-white/10 bg-[#0E0E0E] p-8 md:p-10 ring-copper"
          >
            <button
              onClick={onClose}
              data-testid="product-modal-close"
              className="absolute top-5 right-5 text-[#F6F1E9]/60 hover:text-[#F6F1E9]"
              aria-label="Close"
            >
              ✕
            </button>
            <span className="eyebrow">{product.category}</span>
            <h3 className="mt-3 font-display text-[32px] md:text-[40px] text-[#F6F1E9] leading-tight" style={{ fontWeight: 600, letterSpacing: "-0.02em" }}>
              {product.name}
            </h3>
            <p className="mt-3 text-[14.5px] leading-relaxed text-[#F6F1E9]/65">{product.description}</p>

            <div className="mt-7 grid grid-cols-2 gap-4">
              <Field label="Grade" value={product.grade} />
              <Field label="Water Resistance" value={product.water_resistance} />
              <Field label="Warranty" value={product.warranty} />
              <Field label="Thickness Options" value={product.thickness.join(" · ")} />
            </div>

            <div className="mt-7">
              <div className="text-[10px] uppercase tracking-[0.22em] text-[#A3A3A3] mb-3">Applications</div>
              <div className="flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <span key={a} className="px-3 py-1.5 rounded-full text-[12px] bg-white/5 border border-white/10 text-[#F6F1E9]/85">
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" onClick={onClose} className="btn-pill btn-pill-copper" data-testid="product-request-sample">
                Request Sample
              </a>
              <a href="#contact" onClick={onClose} className="btn-pill btn-pill-ghost" data-testid="product-contact-specifier">
                Speak to a Specifier
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
