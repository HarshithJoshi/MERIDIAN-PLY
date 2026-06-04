import { BRAND, IMAGES, NAV } from "@/lib/meridian";
import { Instagram, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative bg-[#080808] border-t border-white/[0.06] pt-10 md:pt-14 pb-8">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 lg:px-24">
        {/* Official Meridian brand mark — boxed rectangular wordmark */}
        <div className="overflow-hidden border-b border-white/5 pb-8 md:pb-12 flex flex-col items-center sm:flex-row sm:items-end sm:justify-between gap-6">
          <img
            src={IMAGES.logoBox}
            alt="Meridian Plywood — always with you. Plywood · Block Board · Flush Door"
            data-testid="footer-logo-full"
            className="w-full max-w-[460px] sm:max-w-[520px] h-auto select-none"
            draggable={false}
          />
          <div className="text-center sm:text-right">
            <div className="eyebrow">— Tagline</div>
            <div
              className="mt-3 font-display text-[15px] text-[#F6F1E9]/85"
              style={{ fontWeight: 500, letterSpacing: "-0.005em" }}
            >
              {BRAND.tagline}
            </div>
          </div>
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <div className="eyebrow">Brand</div>
            <p className="mt-4 text-[13px] text-[#F6F1E9]/55 leading-relaxed max-w-xs">
              Meridian Plywood — BWP Gurjan engineered for architects who refuse to compromise on the substrate.
            </p>
          </div>
          <div>
            <div className="eyebrow">Explore</div>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {NAV.slice(0, 4).map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-[#F6F1E9]/65 hover:text-[#B87333] transition-colors" data-testid={`footer-link-${n.id}`}>
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
                  <a href={`#${n.id}`} className="text-[#F6F1E9]/65 hover:text-[#B87333] transition-colors" data-testid={`footer-link-${n.id}`}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="eyebrow">Contact</div>
            <div className="mt-4 space-y-2 text-[13.5px] text-[#F6F1E9]/65">
              <div>{BRAND.phone}</div>
              <div>{BRAND.email}</div>
              <a
                href={BRAND.mapShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[12.5px] leading-relaxed text-[#F6F1E9]/45 hover:text-[#B87333] transition-colors duration-300"
                data-testid="footer-address"
              >
                {BRAND.address}
              </a>
            </div>
            <div className="mt-5 flex gap-3 text-[#F6F1E9]/60">
              <a href="#" aria-label="Instagram" data-testid="social-instagram" className="hover:text-[#B87333] transition-colors"><Instagram size={17} /></a>
              <a href="#" aria-label="LinkedIn" data-testid="social-linkedin" className="hover:text-[#B87333] transition-colors"><Linkedin size={17} /></a>
              <a href="#" aria-label="YouTube" data-testid="social-youtube" className="hover:text-[#B87333] transition-colors"><Youtube size={17} /></a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-7 border-t border-white/5 flex flex-col md:flex-row gap-3 md:items-center justify-between text-[11.5px] text-[#F6F1E9]/40 font-mono uppercase tracking-[0.18em]">
          <div>© {new Date().getFullYear()} Meridian Plywood · IS 710 · ISO 9001</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#F6F1E9]/80">Privacy</a>
            <a href="#" className="hover:text-[#F6F1E9]/80">Terms</a>
            <a href="#" className="hover:text-[#F6F1E9]/80">Warranty</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
