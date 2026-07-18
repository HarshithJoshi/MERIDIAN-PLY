import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { BRAND } from "@/lib/meridian";

// Floating WhatsApp button — visible site-wide, at all times.
// Previously the button was scroll-gated (only visible past 400px) which
// meant it disappeared/reappeared each time the user scrolled back near
// the top. This felt buggy on long pages. It now mounts once on load and
// stays present through the entire scroll journey.
export default function FloatingWhatsApp() {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const teasedRef = useRef(false);

  // Tease the tooltip once, ~1.6s after mount so it doesn't fight the
  // hero entrance animation. Dismisses after ~6s. User can also close it.
  useEffect(() => {
    if (teasedRef.current) return;
    teasedRef.current = true;
    const tOpen = setTimeout(() => setTooltipOpen(true), 1600);
    const tClose = setTimeout(() => setTooltipOpen(false), 7600);
    return () => {
      clearTimeout(tOpen);
      clearTimeout(tClose);
    };
  }, []);

  const number = BRAND.whatsapp.replace(/\D/g, "");
  const msg = encodeURIComponent(
    `Hi Meridian — I'd like to discuss a project specification.`
  );
  const href = `https://wa.me/${number}?text=${msg}`;

  return (
    <div
      // Outer wrapper stays transform-stable on its own compositor layer.
      // Animating transforms directly on a position:fixed element (then
      // removing them) makes Safari intermittently drop the fixed layer
      // during heavy scroll compositing — the button "disappears" while
      // scrolling. Entrance animation lives on the inner div instead.
      className="fixed z-[55] right-4 sm:right-5 md:right-7"
      style={{
        bottom: "max(1rem, env(safe-area-inset-bottom))",
        transform: "translateZ(0)",
        willChange: "transform",
      }}
      data-testid="floating-whatsapp-container"
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative"
      >
      {/* Tooltip */}
      <AnimatePresence>
        {tooltipOpen && (
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute bottom-1/2 right-[calc(100%+12px)] translate-y-1/2 glass-strong rounded-full pl-4 pr-3 py-2 flex items-center gap-2 whitespace-nowrap shadow-xl"
            data-testid="floating-whatsapp-tooltip"
          >
            <span className="text-[12.5px] text-[#F5F5F7]">Chat with a specifier</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTooltipOpen(false);
              }}
              className="text-[#F5F5F7]/55 hover:text-[#F5F5F7] -mr-0.5"
              aria-label="Dismiss"
              data-testid="floating-whatsapp-tooltip-close"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="floating-whatsapp-button"
        aria-label="Message us on WhatsApp"
        className="group relative flex h-14 w-14 sm:h-[58px] sm:w-[58px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_-12px_rgba(37,211,102,0.55)] transition-transform duration-300 hover:scale-[1.06] hover:-translate-y-1 active:scale-95"
        onClick={() => setTooltipOpen(false)}
      >
        {/* Pulsing ring */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-60 animate-ping"
          style={{ animationDuration: "2.4s" }}
        />
        {/* WhatsApp glyph (SVG, brand-accurate) */}
        <svg
          viewBox="0 0 32 32"
          width="26"
          height="26"
          aria-hidden
          className="relative drop-shadow-sm"
          fill="currentColor"
        >
          <path d="M19.11 17.18c-.27-.13-1.58-.78-1.82-.87-.24-.09-.42-.13-.6.13-.18.27-.69.86-.85 1.04-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.33-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.55.12-.12.27-.31.4-.46.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.44-.82-1.97-.22-.52-.44-.45-.6-.46l-.51-.01c-.18 0-.47.07-.71.34-.24.27-.93.91-.93 2.21 0 1.3.95 2.56 1.08 2.74.13.18 1.86 2.84 4.5 3.99.63.27 1.12.43 1.5.55.63.2 1.21.17 1.66.1.5-.08 1.58-.65 1.8-1.27.22-.62.22-1.15.15-1.27-.07-.12-.24-.18-.51-.31zM16.02 4C9.4 4 4.04 9.36 4.04 16c0 2.05.54 4.06 1.56 5.83L4 28l6.34-1.66A11.95 11.95 0 0 0 16.02 28C22.66 28 28 22.64 28 16S22.66 4 16.02 4zm0 21.83c-1.81 0-3.58-.49-5.13-1.41l-.37-.22-3.76.99 1-3.67-.24-.38a9.92 9.92 0 0 1-1.52-5.14c0-5.49 4.48-9.97 9.97-9.97s9.97 4.48 9.97 9.97-4.46 9.83-9.92 9.83z" />
        </svg>
      </a>
      </motion.div>
    </div>
  );
}
