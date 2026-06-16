import { useEffect, useState } from "react";

// Detect coarse-pointer / touch-primary devices (iPad, iPhone, Android tablets).
// Returns a stable boolean after first paint — defaults to false during SSR/initial render
// so animated content still renders identically on desktop.
export default function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(hover: none) and (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  return isTouch;
}

// Returns true on any iOS / iPadOS device (including modern iPads that report as Mac).
export function isIOSLike() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  const isIPhoneIPod = /iPhone|iPod/.test(ua);
  const isIPad =
    /iPad/.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator.maxTouchPoints || 0) > 1);
  return isIPhoneIPod || isIPad;
}
