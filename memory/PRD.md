# Meridian Plywood — PRD

## Problem Statement
World-class luxury website for a premium BWP Gurjan plywood brand "Meridian Plywood", inspired by Apple's cinematic design philosophy, minimalism, typography, and motion system — but fully original. Tagline: "Built to Endure. Designed to Inspire."

## User Choices (locked-in)
- Full-stack + integrations (Resend email + Gemini Nano Banana ready)
- Hybrid 3D — Three.js layered cross-section in BWP Technology section, image-based hero
- Curated Unsplash/Pexels imagery + generated assets from design agent
- MongoDB lead capture (inquiries, dealers, samples) + Resend email
- Brand: Meridian Plywood

## Architecture
- Frontend: React 19 + Tailwind + Framer Motion + Lenis smooth scroll + @react-three/fiber + drei + three
- Backend: FastAPI + Motor (MongoDB) + Resend (optional, env-gated)
- Routes: /api/inquiries, /api/dealers, /api/samples (POST + GET admin), /api/products, /api/health

## Implemented (Dec 2025)
- Navbar with scroll-state glass, mobile menu
- Hero — parallax cinematic background, Apple-style massive typography, stat row, CTAs
- Material Story — sticky storytelling, 3 panels (Core, Bond, Finish) with parallax imagery
- BWP Technology — Three.js exploded plywood scene (9 cross-banded layers, scroll-driven separation, cinematic lighting), 6-feature spec grid (R3F primitives wrapped via React.createElement to bypass visual-edits babel plugin)
- Products — 6 categories, hover-glow cards, modal with full specs, category filter
- Performance — animated benchmark bars, 6 metrics, Meridian vs ordinary
- Interiors — horizontal scroll cinematic gallery (5 spaces)
- Sustainability — forest parallax backdrop with green-accent pillars
- Portal — glassmorphism tabs (Brochures, BIM/CAD, Dealers, Samples)
- Testimonials — auto-rotating monochrome portrait carousel with fade transitions
- Contact — full inquiry form, role/project type selects, WhatsApp deep link, OpenStreetMap embed, MongoDB-backed submission, toast feedback
- Footer — massive wordmark, brand grid

## iPad / iOS Safari Smoothness Pass (Feb 2026)
- Lenis smooth-scroll skipped entirely on iOS / iPadOS / Android (native momentum is better; Lenis RAF was fighting it and causing jank)
- Three.js canvas: lowered dpr to `[1,1]` on touch, dropped shadows on touch, paused frameloop ("demand") when section off-screen via IntersectionObserver
- Disabled scroll-coupled parallax / scale transforms on touch devices in Hero (bg-img + watermark + content), MaterialStory (per-panel y + scale), Sustainability (forest backdrop), Interiors (per-slide ken-burns)
- Dropped the heavy multi-channel `filter()` on the Hero watermark logo on touch (was being re-rasterised every scroll frame)
- CSS `@media (hover: none) and (pointer: coarse)` guard: removes `bg-grain::after` `mix-blend-mode` overlay site-wide, swaps `backdrop-filter: blur(28px)` Navbar to solid translucent, disables WhatsApp button `animate-ping`
- Navbar + FloatingWhatsApp scroll listeners throttled via `requestAnimationFrame`
- New util: `/app/frontend/src/lib/useIsTouchDevice.js` (`useIsTouchDevice()` hook + `isIOSLike()` UA helper)

## P0 Remaining
- User to supply RESEND_API_KEY and ADMIN_EMAIL in /app/backend/.env to enable real email notifications (currently graceful no-op)

## P1 Backlog
- Admin dashboard route to view inquiries/dealers/samples
- AI material recommender using Gemini Nano Banana for visualization
- PDF brochure generation
- Sample request kit ordering with address validation
- Multi-language (Hindi)

## Test Credentials
None (public marketing site, no auth flow yet)
