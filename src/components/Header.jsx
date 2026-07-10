import { useState, useEffect } from "react";
import { navLinks } from "../data/siteData";
import { scrollToSection } from "../utils/scrollTo";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#fff8e7] shadow-xl py-3" : "bg-[#fff8e7]/95 backdrop-blur-xl py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="/src/assets/image-removebg-preview.png"
              alt="Ganesh Yatra logo"
              className="h-12 w-12 rounded-2xl object-contain shadow-sm"
            />
            <div className="text-left">
              <span className="block text-lg md:text-xl font-bold text-[#0F172A] leading-tight">
                Ganesh Tour
              </span>
              <span className="block text-xs md:text-sm font-semibold text-[#15803D] leading-tight">
                and Travels
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8 text-sm md:text-base">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-[#475569] hover:text-[#F97316] font-medium transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNavClick("contact")}
            className="hidden lg:inline-flex bg-[#F97316] hover:bg-[#dc6803] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-[#F97316]/30 hover:-translate-y-0.5 cursor-pointer"
          >
            Book Now
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-white/90 shadow-sm border border-[#CBD5E1] cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#0EA5E9] transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        <nav
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 mt-4 pb-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-3 border border-[#CBD5E1] bg-white/95 rounded-3xl p-4 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-[#1F2937] hover:text-[#F97316] font-medium py-3 text-left transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="bg-[#F97316] hover:bg-[#dc6803] text-white px-5 py-3 rounded-full font-semibold transition-all mt-2 cursor-pointer"
            >
              Book Now
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
