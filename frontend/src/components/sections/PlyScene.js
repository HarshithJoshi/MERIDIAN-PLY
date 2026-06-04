// Three.js scene built with React.createElement to avoid the visual-edits
// babel plugin adding `x-line-number` style props to R3F intrinsic elements
// (mesh, group, boxGeometry, etc.), which would break the R3F prop applier.
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const e = React.createElement;

const LAYERS = 13;
// 13 distinct walnut tones (cross-banded look) — index alternates for clear stripes
const COLORS = [
  "#6A442B", "#7d5132", "#5a3a25", "#8b5a39", "#4a2f1e",
  "#7d5132", "#6A442B", "#8b5a39", "#5a3a25", "#7d5132",
  "#4a2f1e", "#8b5a39", "#6A442B",
];

// Per-layer geometry — tuned so 13 layers stay nicely framed in the camera view.
// Closed stack thickness: 13 * 0.095 ≈ 1.24 units (similar visual height to old 9-layer stack).
const LAYER_THICKNESS = 0.10;
const SPACING_CLOSED = 0.105; // distance between layer centres when stack is "closed"
const SPACING_EXPLODE = 0.30; // additional separation at full explode (progress=1)

export function PlyExploded({ progress }) {
  const groupRef = useRef();

  useFrame(() => {
    const grp = groupRef.current;
    if (!grp) return;
    const p = progress.get();
    grp.children.forEach((child, i) => {
      const center = (grp.children.length - 1) / 2;
      const offset = i - center;
      const yTarget = offset * (SPACING_CLOSED + p * SPACING_EXPLODE);
      child.position.y = THREE.MathUtils.lerp(child.position.y, yTarget, 0.08);
    });
    grp.rotation.y += 0.0028;
    grp.rotation.x = -0.4 + p * 0.12;
  });

  const layers = Array.from({ length: LAYERS }).map((_, i) => {
    const center = (LAYERS - 1) / 2;
    const offset = i - center;
    return e(
      "mesh",
      {
        key: i,
        position: [0, offset * SPACING_CLOSED, 0],
        castShadow: true,
        receiveShadow: true,
      },
      e("boxGeometry", { args: [3.4, LAYER_THICKNESS, 2.2] }),
      e("meshStandardMaterial", { color: COLORS[i % COLORS.length], roughness: 0.78, metalness: 0.05 })
    );
  });

  return e(
    "group",
    { ref: groupRef, rotation: [-0.4, 0.3, 0] },
    ...layers
  );
}

export function PlyLights() {
  return e(
    React.Fragment,
    null,
    e("color", { attach: "background", args: ["#0B0B0B"] }),
    e("fog", { attach: "fog", args: ["#0B0B0B", 7, 12] }),
    e("ambientLight", { intensity: 0.4 }),
    e("directionalLight", { position: [3, 5, 2], intensity: 1.6, color: "#F6F1E9", castShadow: true }),
    e("directionalLight", { position: [-3, -2, -3], intensity: 0.45, color: "#B87333" })
  );
}
