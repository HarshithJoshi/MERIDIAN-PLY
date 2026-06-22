import { useEffect, useState } from "react";

// Cinematic page-load curtain — a brief black veil that retracts upward
// after first paint to reveal the hero. Disabled automatically by
// prefers-reduced-motion (handled in index.css).
export default function LoadCurtain() {
  const [retracted, setRetracted] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Two-stage: tiny delay so first frames paint behind the curtain,
    // then trigger the retract transition, then unmount.
    const t1 = setTimeout(() => setRetracted(true), 380);
    const t2 = setTimeout(() => setRemoved(true), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (removed) return null;

  return (
    <div
      data-testid="load-curtain"
      aria-hidden
      className={`load-curtain ${retracted ? "is-retracted" : ""}`}
    >
      <div className="load-curtain__mark" style={{ opacity: retracted ? 0 : 1 }}>
        <span className="pulse" />
      </div>
    </div>
  );
}
