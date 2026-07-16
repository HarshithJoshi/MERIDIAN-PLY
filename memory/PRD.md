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

## Production Domain Lock-in (Feb 2026)
- All SEO references now point to **`https://www.meridianply.com`** (canonical, og:url, og:image, twitter:image, sitemap.xml, robots.txt sitemap pointer, 3× JSON-LD `"url"` fields in Organization/LocalBusiness/WebSite).
- WhatsApp floating-button tooltip tweak: now teases once **600ms after the button enters the viewport** (first scroll past 400px), lingers 6s, auto-dismisses. Was previously 4.5s from mount regardless of scroll.

## SEO + Admin Email Routing (Feb 2026)
- Admin email routing: `ADMIN_EMAIL=admin@meridianply.com` set in `/app/backend/.env`. All 3 inquiry kinds (inquiry / dealer / sample) now route to this address. Verified via backend logs (`[EMAIL DISABLED] would send to admin@meridianply.com: ...`). Requires `RESEND_API_KEY` to actually deliver.
- `/app/frontend/public/index.html`: full SEO meta (title + description + keywords + robots + canonical), Open Graph (type, title, description, url, image w/ alt + dimensions, locale), Twitter Card (`summary_large_image`), 4 JSON-LD schemas: **Organization**, **LocalBusiness** (Aghapura flagship with geo + opening hours), **ItemList** (3 hero products), **WebSite**
- `/app/frontend/public/sitemap.xml`: 9 URLs with changefreq + priority
- `/app/frontend/public/robots.txt`: allow all, disallow `/api/`, points to sitemap

## Polish Pass (Feb 2026)
**Global CSS (`index.css`)**
- Eyebrow refinement — small copper afterglow dot trails every section eyebrow
- `.card-glow` utility — copper border + ambient shadow + `translateY(-2px)` lift on hover (applied to Products & Sustainability cards)
- `.section-divider` — copper hairline w/ gradient fade between sections (continuous cinematic rhythm)
- `.scroll-progress-rail` — 2px copper-to-gold scroll progress hairline at top of every page
- `.load-curtain` — black curtain that retracts upward after first paint (~400ms delay, ~1100ms slide)
- Refined `.input` — copper focus border + 3px soft copper glow ring + hover state
- Accessibility — keyboard `:focus-visible` rings (2px copper, 3px offset) on all `a/button/input/select/textarea`
- `prefers-reduced-motion` — strips animations/parallax/pulses globally; Lenis also skips initialisation when reduced motion is preferred
- `btn-pill:active` — subtle press-scale (0.985)

**Components**
- `ScrollProgress.jsx` — new, rAF-driven, no re-renders
- `LoadCurtain.jsx` — new, two-stage retract/unmount, ~1.8s total
- Navbar logo — larger (h-10→h-12), subtle ivory backdrop only over transparent hero
- Hero — tagline moved to own line, stat-row dividers via `divide-x`
- Technology — new "13 LAYERS · 19 MM · 8 × 4 FT · IS 710" spec stamp under heading
- Footer — wordmark grouped with copper hairline + ambient glow underneath
- Contact — removed component-local `<style>` block (now consumes global `.input`)

## iPad / iOS Safari Smoothness Pass (Feb 2026)
- Lenis smooth-scroll skipped entirely on iOS / iPadOS / Android (native momentum is better; Lenis RAF was fighting it and causing jank)
- Three.js canvas: lowered dpr to `[1,1]` on touch, dropped shadows on touch, paused frameloop ("demand") when section off-screen via IntersectionObserver
- Disabled scroll-coupled parallax / scale transforms on touch devices in Hero (bg-img + watermark + content), MaterialStory (per-panel y + scale), Sustainability (forest backdrop), Interiors (per-slide ken-burns)
- Dropped the heavy multi-channel `filter()` on the Hero watermark logo on touch (was being re-rasterised every scroll frame)
- CSS `@media (hover: none) and (pointer: coarse)` guard: removes `bg-grain::after` `mix-blend-mode` overlay site-wide, swaps `backdrop-filter: blur(28px)` Navbar to solid translucent, disables WhatsApp button `animate-ping`
- Navbar + FloatingWhatsApp scroll listeners throttled via `requestAnimationFrame`
- New util: `/app/frontend/src/lib/useIsTouchDevice.js` (`useIsTouchDevice()` hook + `isIOSLike()` UA helper)

## Expert Design Review & Polish Pass (June 2026)
Design agent review saved at `/app/design_guidelines.json`. All P0/P1/P2 items applied and regression-tested (`/app/test_reports/iteration_3.json`, 100% pass):
- Hero (P0): content now clears fixed navbar (pt-24/28); vertical rhythm tightened so stat row never collides with scroll cue; scroll cue moved to bottom-right (right-24/28, clear of WhatsApp float) and hidden under 700px-tall viewports
- Navbar (P1): CTA retitled "Speak to a Specifier" (desktop + mobile)
- Footer (P1): empty right void balanced with large display tagline "Built to Endure. Designed to Inspire." + `footer-cta-contact` pill
- Performance (P2): row spacing py-7/9; "+%" result chips fade in after bars complete
- Interiors (P2): animated copper dash next to "Scroll to traverse"
- Portal (P2): dealer inputs gained copper focus ring (box-shadow)
- FloatingWhatsApp (P2): hover lift (-translate-y-1)

## iPad Landscape Overlap Fix (June 2026)
User reported overlapping in iPad landscape Safari. Two root causes found & fixed (verified 100% by testing agent, `iteration_6.json`):
- Hero: content overflowed short landscape viewports (~760px), tucking the eyebrow under the fixed navbar. Section changed from fixed `h-[100svh]` to `min-h-[100svh]` so it grows instead of overflowing.
- Interiors: slide caption titles double-exposed during crossfade. Captions now have their own tight, non-overlapping fade windows (`captionOpacity`); wrapper + caption opacity both use isFirst/isLast branches so slide 1 is visible at progress 0 and slide 5 at progress 1. NOTE: framer-motion useTransform offsets MUST stay within [0,1] — out-of-range sentinels (e.g. 1.5) crash WAAPI with 'Offsets must be null or in the range [0,1]'.

## SEO Pass — "Gurjan Marine BWP Plywood" (June 2026)
User requested keyword targeting for GURJAN MARINE BWP PLYWOOD + Hyderabad local SEO. All verified 100% (`iteration_7.json`):
- index.html: keyword-front-loaded title, description, keywords, OG/Twitter; geo meta (IN-TG, ICBM Hyderabad); ItemList products renamed keyword-rich with thickness props; LocalBusiness enriched (areaServed Hyderabad/Telangana/India); NEW FAQPage JSON-LD (6 Q&As)
- NEW visible FAQ section (`Faq.jsx`, id=#faq) between Testimonials and Contact — luxury native <details> accordion, 6 keyword-rich Q&As incl. "Where to buy in Hyderabad"
- Keyword-rich image alts (hero + interiors slides); sitemap.xml refreshed with #faq + lastmod
- GOTCHA: editing public/index.html requires `sudo supervisorctl restart frontend` (CRA HtmlWebpackPlugin caches the template). FAQPage JSON-LD text must stay in lockstep with FAQS[] in Faq.jsx.

## Apple Typography System Migration (June 2026)
User requested apple.com-style typography. User choices: SF Pro stack everywhere; serif italic copper accents kept as brand exception (Instrument Serif webfont, `.font-accent` class); uppercase mono eyebrows kept as signature. Verified 100% (`iteration_8.json`):
- index.css tokens: `--font-sans` (SF Pro/system stack), `--font-serif` (Instrument Serif), `--text-primary #F5F5F7 / secondary #AEAEB2 / muted #8E8E93`; body line-height 1.65; h1-h4 text-wrap:balance
- Removed Satoshi/General Sans (Fontshare import deleted); global color migration #F6F1E9 → #F5F5F7 (incl. rgba + --m-ivory)
- Hero h1: weight 600, 44/60/76/92px; section H2s 38/48/58-60 leading-1.08; body paragraphs bumped to 16-19px; nav links 15px sentence case; .input/.dealer-input 16px; .btn-pill 0.95rem weight 500 normal tracking
- GOTCHA: all accent spans use `.font-accent` (Instrument Serif italic); don't reintroduce `italic` alone for accents

- REVERTED per user (June 2026): headlines back to Satoshi — `.font-display` = "Satoshi", var(--font-sans) with ss01/ss02; Satoshi Fontshare import restored (700/500/400). Body/nav/buttons remain SF stack. Serif accents unchanged.

## Mobile (390px) Visual QA Pass (June 2026)
Full scroll-through audit at 390x844 after typography migration. Fixes (verified via screenshots + DOM measurement, stat right edge 366<390):
- Hero stat grid: gap-3/pl-3 on mobile + tighter label tracking (0.12em) — no more right-edge clipping
- Hero scroll cue hidden on mobile (`hidden md:[@media(min-height:700px)]:flex`)
- Interiors caption meta: flex-wrap + whitespace-nowrap on "01 / 05" counter — no mid-token wrapping
- All other sections (products, performance, technology, portal, testimonials, faq, contact, footer) verified clean, no horizontal overflow

## Social Links Wired (June 2026)
Footer social icons all live (target=_blank, verified): Instagram → instagram.com/meridianply · LinkedIn → linkedin.com/company/meridianply · YouTube → youtube.com/@MeridianPly. JSON-LD Organization sameAs kept in sync.

## Interiors Images Sharpened for Desktop (June 2026)
Root cause: portrait 928×1152 AI images upscaled >2× when object-cover cropped to 1920px full-bleed. Fix:
- Regenerated all 5 gallery scenes as LANDSCAPE via Nano Banana (image-edit mode with originals as reference), Lanczos-upscaled to 1920×1288 + unsharp mask → `/images/interior_*_wide.jpg`
- `GALLERY` items now have `srcWide`; `Interiors.jsx` picks wide on ≥768px (`prefersWideImages()` — NOTE: must NOT be named use* or ESLint hooks rule breaks build), portrait originals kept for mobile
- Verified: desktop serves *_wide.jpg (natural 1920×1288, visibly crisp), mobile serves portrait originals

## Local + Pan-India SEO Pass (June 2026)
Telangana/Hyderabad sales + pan-India targeting (verified: 8 FAQ items visible = 8 in FAQPage JSON-LD, all 5 schemas parse, footer line renders):
- 2 new FAQ entries: "plywood price in Hyderabad" + "supply across Telangana and pan-India" (Secunderabad/Warangal/metros) — synced in Faq.jsx AND FAQPage JSON-LD
- LocalBusiness: areaServed expanded to 11 entries (TG cities + Mumbai/Delhi/Bengaluru/Chennai/Pune/Kolkata + India), added hasMap Google Maps link
- Meta description/keywords: added plywood dealer/shop/price Hyderabad, plywood Secunderabad, plywood suppliers Telangana, plywood manufacturer India
- Footer: crawlable "serving areas" paragraph (data-testid footer-serving-line)

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
