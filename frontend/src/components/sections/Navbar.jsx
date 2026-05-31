import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV } from "@/lib/meridian";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      data-testid="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 h-16 md:h-[68px] flex items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-logo"
          className="flex items-center gap-2 group"
          aria-label="Meridian Plywood Home"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="text-[#B87333] group-hover:rotate-90 transition-transform duration-700">
            <rect x="1" y="1" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.4" />
            <path d="M1 7h20M1 13h20" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
            <path d="M7 1v20M15 1v20" stroke="currentColor" strokeWidth="0.8" opacity="0.45" />
          </svg>
          <span className="font-display font-medium tracking-[0.22em] text-[12px] uppercase text-[#F6F1E9]">
            {BRAND.short}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-9">
          {NAV.map((n) => (
            <a
              key={n.id}
              data-testid={`nav-link-${n.id}`}
              href={`#${n.id}`}
              className="link-underline text-[12px] lg:text-[13px] text-[#F6F1E9]/80 hover:text-[#F6F1E9] transition-colors"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 lg:gap-3">
          <a
            data-testid="navbar-cta-catalogue"
            href="#contact"
            className="btn-pill btn-pill-ghost text-[11px] lg:text-[12px] hidden lg:inline-flex"
          >
            Catalogue
          </a>
          <a
            data-testid="navbar-cta-contact"
            href="#contact"
            className="btn-pill btn-pill-primary text-[11px] lg:text-[12px] whitespace-nowrap"
          >
            Speak to specifier
          </a>
        </div>

        <button
          data-testid="navbar-mobile-toggle"
          className="md:hidden text-[#F6F1E9]"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="navbar-mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/5"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className="text-[15px] text-[#F6F1E9]/85"
                  data-testid={`nav-mobile-link-${n.id}`}
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-pill btn-pill-primary mt-2 self-start"
                data-testid="nav-mobile-cta"
              >
                Speak to specifier
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
