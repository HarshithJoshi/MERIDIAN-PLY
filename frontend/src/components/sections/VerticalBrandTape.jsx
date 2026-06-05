/**
 * VerticalBrandTape — a column of small Meridian boxed logos stacked
 * vertically, rotated 90°, like the repeated brand stamp along the edges
 * of a Meridian plywood door (per the official brand collateral).
 *
 * Use it as a thin column flanking hero/section imagery.
 */
import { IMAGES, BRAND } from "@/lib/meridian";

export default function VerticalBrandTape({
  count = 6,
  side = "left",
  opacity = 0.22,
  className = "",
  testId = "brand-tape",
}) {
  const sideClass = side === "right" ? "right-0" : "left-0";
  return (
    <div
      aria-hidden
      data-testid={testId}
      className={`pointer-events-none absolute top-0 bottom-0 ${sideClass} z-[3] flex flex-col items-center justify-evenly w-[42px] sm:w-[56px] md:w-[68px] select-none ${className}`}
      style={{
        // Subtle copper-ivory tint with film grain, sitting above the bg but below content
        opacity,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <img
          key={i}
          src={IMAGES.logoBox}
          alt=""
          draggable={false}
          className="block w-auto"
          style={{
            // Rotate each stamp 90° (reads top-to-bottom like the door-edge band)
            transform: "rotate(90deg)",
            transformOrigin: "center",
            // Width post-rotation = visual height of column slot
            width: "min(20vh, 240px)",
            maxWidth: "240px",
            // Inverted to ivory; brand stamp on dark
          }}
          aria-label={BRAND.short}
        />
      ))}
    </div>
  );
}
