import Button from "../components/Button";
import { scrollToSection } from "../utils/scrollTo";

const Hero = () => (
  <section
    id="home"
    className="relative min-h-[calc(100vh-80px)] flex items-center"
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-[#0369A1]/90 via-[#0EA5E9]/55 to-[#FFF8E7]/10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,248,231,0.35),_transparent_35%)]" />

    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-28 pb-20">
      <div className="relative rounded-[24px] border border-white/20 bg-white/12 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl">
        <p className="text-[#F97316] font-semibold text-sm md:text-base uppercase tracking-[0.35em] mb-4 drop-shadow-lg">
          Welcome to Ganesh Tour and Travels
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 drop-shadow-2xl">
          Explore the World with <span className="text-[#F97316]">Ganesh Tour and Travels</span>
        </h1>
        <p className="text-[#E2E8F0] text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          Best travel packages, car rentals, hotel booking, and customized tours.
        </p>

        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => scrollToSection("packages")}>View Packages</Button>
          <Button variant="secondary" onClick={() => scrollToSection("contact")}>Contact Us</Button>
        </div>
      </div>
    </div>

    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
      <button
        onClick={() => scrollToSection("about")}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white/85 shadow-lg shadow-slate-950/20 transition-all duration-300 hover:bg-white/20 hover:text-white"
        aria-label="Scroll down"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  </section>
);

export default Hero;
