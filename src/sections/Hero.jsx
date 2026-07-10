import Button from "../components/Button";
import { scrollToSection } from "../utils/scrollTo";

const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex items-center justify-center"
  >
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80')",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50" />

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white pt-24 pb-16">
      <p className="text-accent font-semibold text-sm md:text-base uppercase tracking-widest mb-4">
        Welcome to Ganesh Tour and Travels
      </p>
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
        Explore the World with{" "}
        <span className="text-accent">Ganesh Tour and Travels</span>
      </h1>
      <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
        Best travel packages, car rentals, hotel booking, and customized tours
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button onClick={() => scrollToSection("packages")}>View Packages</Button>
        <Button variant="secondary" onClick={() => scrollToSection("contact")}>
          Contact Us
        </Button>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <button
        onClick={() => scrollToSection("about")}
        className="text-white/70 hover:text-white transition-colors cursor-pointer"
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
