import { BRAND, IMAGES, NAV } from "@/lib/meridian";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative bg-[#080808] border-t border-white/[0.06] pt-12 md:pt-16 pb-8">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        {/* Official Meridian brand mark — boxed rectangular wordmark */}
        <div className="overflow-hidden pb-10 md:pb-14 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between gap-8">
          <div className="relative flex flex-col items-center sm:items-start">
            <img
              src={IMAGES.logoBox}
              alt="Meridian Plywood — always with you. Plywood · Block Board · Flush Door"
              data-testid="footer-logo-full"
              className="w-full max-w-[480px] sm:max-w-[540px] h-auto select-none"
              draggable={false}
            />
            {/* Subtle copper hairline + glow beneath the wordmark — a soft
                signature seal that reads as "official" without shouting. */}
            <div
              aria-hidden
              className="mt-5 h-px w-[80%] max-w-[420px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(184,115,51,0.55) 50%, transparent 100%)",
                boxShadow: "0 0 12px rgba(184,115,51,0.25)",
              }}
            />
          </div>
          <div className="flex flex-col items-center sm:items-end text-center sm:text-right gap-5">
            <div className="eyebrow eyebrow-no-dot">Tagline</div>
            <div
              className="font-display text-[24px] md:text-[30px] leading-[1.15] text-[#F5F5F7] max-w-sm"
              style={{ fontWeight: 600, letterSpacing: "-0.02em" }}
            >
              Built to Endure.
              <br />
              <span className="font-accent text-[#B87333]" style={{ fontWeight: 500 }}>
                Designed
              </span>{" "}
              to Inspire.
            </div>
            <a
              href="#contact"
              data-testid="footer-cta-contact"
              className="btn-pill btn-pill-ghost text-[12px]"
            >
              Speak to a Specifier
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-10 md:pt-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="eyebrow">Brand</div>
            <p className="mt-4 text-[13px] text-[#F5F5F7]/55 leading-relaxed max-w-xs">
              Meridian Plywood — BWP Gurjan engineered for architects who refuse to compromise on the substrate.
            </p>
          </div>
          <div>
            <div className="eyebrow">Explore</div>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {NAV.slice(0, 4).map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-[#F5F5F7]/65 hover:text-[#B87333] transition-colors" data-testid={`footer-link-${n.id}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow">Resources</div>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {NAV.slice(4).map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-[#F5F5F7]/65 hover:text-[#B87333] transition-colors" data-testid={`footer-link-${n.id}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow">Contact</div>
            <div className="mt-4 space-y-2 text-[13.5px] text-[#F5F5F7]/65">
              <div>{BRAND.phone}</div>
              <div>{BRAND.email}</div>
              <a
                href={BRAND.mapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[12.5px] leading-relaxed text-[#F5F5F7]/45 hover:text-[#B87333] transition-colors duration-300"
                data-testid="footer-address"
              >
                {BRAND.address}
              </a>
            </div>
            <div className="mt-5 flex gap-3 text-[#F5F5F7]/60">
              <a href="https://www.instagram.com/meridianply" target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="social-instagram" className="hover:text-[#B87333] transition-colors"><Instagram size={17} /></a>
              <a href="https://www.linkedin.com/company/meridianply/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="social-linkedin" className="hover:text-[#B87333] transition-colors"><Linkedin size={17} /></a>
              <a href="https://www.youtube.com/@MeridianPly" target="_blank" rel="noopener noreferrer" aria-label="YouTube" data-testid="social-youtube" className="hover:text-[#B87333] transition-colors"><Youtube size={17} /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/5">
          <p
            data-testid="footer-serving-line"
            className="text-[12px] leading-relaxed text-[#F5F5F7]/45 max-w-3xl"
          >
            Plywood dealer in Hyderabad, Telangana — flagship store at Aghapura. Supplying BWP
            Gurjan &amp; Marine plywood across Secunderabad, Warangal and all of Telangana, with
            pan-India delivery to Mumbai, Delhi NCR, Bengaluru, Chennai, Pune and Kolkata through
            our authorised dealer network.
          </p>
          <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center justify-between text-[11.5px] text-[#F5F5F7]/40 font-mono uppercase tracking-[0.18em]">
            <div>© {new Date().getFullYear()} Meridian Plywood · IS 710 · ISO 9001</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#F5F5F7]/80">Privacy</a>
              <a href="#" className="hover:text-[#F5F5F7]/80">Terms</a>
              <a href="#" className="hover:text-[#F5F5F7]/80">Warranty</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
