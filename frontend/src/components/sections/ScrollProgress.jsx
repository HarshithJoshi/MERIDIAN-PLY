import { useEffect, useRef } from "react";

// Apple-style top-of-page scroll progress hairline.
// Pure rAF + width — no framer-motion, no re-renders, no jank.
export default function ScrollProgress() {
  const fillRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const el = fillRef.current;
      if (!el) return;
      const doc = document.documentElement;
      const max = (doc.scrollHeight || 0) - (window.innerHeight || 0);
      const pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      el.style.width = pct + "%";
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="scroll-progress-rail"
      aria-hidden
      data-testid="scroll-progress"
    >
      <div ref={fillRef} className="scroll-progress-fill" />
    </div>
  );
}
