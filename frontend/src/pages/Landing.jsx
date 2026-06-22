import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import MaterialStory from "@/components/sections/MaterialStory";
import Technology from "@/components/sections/Technology";
import Products from "@/components/sections/Products";
import Performance from "@/components/sections/Performance";
import Interiors from "@/components/sections/Interiors";
import Sustainability from "@/components/sections/Sustainability";
import Portal from "@/components/sections/Portal";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import FloatingWhatsApp from "@/components/sections/FloatingWhatsApp";
import ScrollProgress from "@/components/sections/ScrollProgress";
import LoadCurtain from "@/components/sections/LoadCurtain";

export default function Landing() {
  return (
    <main data-testid="landing-page" className="bg-[#0B0B0B] text-[#F6F1E9] overflow-x-clip">
      <LoadCurtain />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <div className="section-divider" aria-hidden />
      <MaterialStory />
      <div className="section-divider" aria-hidden />
      <Technology />
      <div className="section-divider" aria-hidden />
      <Products />
      <div className="section-divider" aria-hidden />
      <Performance />
      <Interiors />
      <div className="section-divider" aria-hidden />
      <Sustainability />
      <div className="section-divider" aria-hidden />
      <Portal />
      <div className="section-divider" aria-hidden />
      <Testimonials />
      <div className="section-divider" aria-hidden />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
