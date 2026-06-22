import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, IMAGES, NAV } from "@/lib/meridian";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
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
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "glass-strong" : "bg-transparent"
      }`}
      style={{ transition: "background-color 320ms ease, backdrop-filter 320ms ease" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 h-16 md:h-[72px] flex items-center justify-between">
        <a
          href="#top"
          data-testid="navbar-logo"
          className="flex items-center group shrink-0 relative"
          aria-label="Meridian Plywood Home"
        >
          {/* Subtle ivory backdrop appears only when navbar is over the
              transparent hero — gives the boxed logo the contrast it needs
              without adding visible chrome once the nav becomes solid. */}
          <span
            aria-hidden
            className={`absolute -inset-x-2 -inset-y-1 rounded-md transition-opacity duration-500 ${
              scrolled ? "opacity-0" : "opacity-100"
            }`}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(246,241,233,0.06) 0%, rgba(246,241,233,0) 70%)",
            }}
          />
          {/* Primary brand mark — boxed rectangular Meridian logo from the official brand sheet */}
          <img
            src={IMAGES.logoBox}
            alt={`${BRAND.name} — ${BRAND.legacyTagline}`}
            data-testid="navbar-logo-img"
            className="relative h-10 sm:h-11 md:h-12 w-auto select-none transition-transform duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.045]"
            draggable={false}
          />
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
