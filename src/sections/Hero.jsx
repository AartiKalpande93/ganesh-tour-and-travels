import { useState, useEffect } from "react";
import { scrollToSection } from "../utils/scrollTo";
import home1 from "../assets/home1.jpeg";
import home2 from "../assets/home2.jpeg";

const slides = [
  {
    image: home1,
    badge: "✨ DESTINATION DISCOVERY",
    heading: "Explore The Unseen, Create Unforgettable Memories",
    buttonText: "View Packages",
    targetSection: "packages",
  },
  {
    image: home2,
    badge: "🌟 LUXURY & COMFORT TRAVEL",
    heading: "Your Journey Begins With Unmatched Comfort",
    buttonText: "Book Your Trip",
    targetSection: "contact",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const activeSlideData = slides[currentSlide];

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
    >
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out transform ${
            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
      ))}

      {/* Dark tint overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-110 active:scale-95 shadow-xl"
        aria-label="Previous slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:bg-black/60 hover:scale-110 active:scale-95 shadow-xl"
        aria-label="Next slide"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Vertical Navigation Dots on the Right Side (Matching reference screenshot) */}
      <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col space-y-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "h-4 w-4 bg-white border-2 border-[#F97316] scale-125 shadow-lg"
                : "h-2.5 w-2.5 bg-white/50 hover:bg-white"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Minimalist Hero Content - Compact & Sleek Small Pills */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center text-white flex flex-col items-center justify-center">
        {/* Small Top Badge Pill */}
        <div
          key={`badge-${currentSlide}`}
          className="inline-block px-3 py-1 rounded-full border border-white/20 bg-black/50 backdrop-blur-md mb-3 shadow-md transition-all duration-500"
        >
          <span className="text-[#F97316] font-bold text-[10px] sm:text-xs tracking-wider uppercase">
            {activeSlideData.badge}
          </span>
        </div>

        {/* Compact Title Pill - Small Font & Tight Padding */}
        <div
          key={`heading-${currentSlide}`}
          className="inline-block rounded-full border border-white/20 bg-slate-950/60 backdrop-blur-md px-5 sm:px-7 py-2 sm:py-2.5 shadow-xl mb-4 max-w-full transition-all duration-700"
        >
          <h1 className="text-sm sm:text-lg md:text-xl font-semibold text-white tracking-wide leading-snug drop-shadow-md">
            {activeSlideData.heading}
          </h1>
        </div>

        {/* Small Clean Pill Button */}
        <div key={`btn-${currentSlide}`} className="transition-all duration-500">
          <button
            onClick={() => scrollToSection(activeSlideData.targetSection)}
            className="inline-flex items-center gap-1.5 px-6 py-2 sm:py-2.5 rounded-full bg-white text-slate-900 font-bold text-xs sm:text-sm shadow-xl transition-all duration-300 hover:bg-[#F97316] hover:text-white hover:scale-105 active:scale-95"
          >
            <span>{activeSlideData.buttonText}</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={() => scrollToSection("about")}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white shadow-md transition-all duration-300 hover:bg-black/60"
          aria-label="Scroll down"
        >
          <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;



