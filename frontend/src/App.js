import { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import Landing from "@/pages/Landing";
import { Toaster } from "@/components/ui/sonner";
import { isIOSLike } from "@/lib/useIsTouchDevice";

function App() {
  useEffect(() => {
    // iOS / iPadOS Safari already has world-class native momentum scrolling.
    // Lenis on top of it (even with smoothTouch:false) keeps a permanent RAF loop
    // and intercepts wheel/trackpad events, which causes visible jank on iPad Safari.
    // We skip it entirely on iOS-like devices and rely on native scroll there.
    const ua = (typeof navigator !== "undefined" && navigator.userAgent) || "";
    const isTouchOnly =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isIOSLike() || isTouchOnly || prefersReducedMotion || /Android/i.test(ua)) {
      return; // native scroll
    }

    const lenis = new Lenis({
      duration: 0.9,
      smoothWheel: true,
      smoothTouch: false,
      syncTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    });
    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
    </div>
  );
}

export default App;
