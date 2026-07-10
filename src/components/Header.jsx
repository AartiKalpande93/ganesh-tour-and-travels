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
        scrolled ? "bg-white shadow-lg py-3" : "bg-white/95 backdrop-blur-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl md:text-3xl">✈️</span>
            <div className="text-left">
              <span className="block text-lg md:text-xl font-bold text-primary leading-tight">
                Ganesh Tour
              </span>
              <span className="block text-xs md:text-sm font-semibold text-accent leading-tight">
                and Travels
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-gray-700 hover:text-accent font-medium transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNavClick("contact")}
            className="hidden lg:inline-flex bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
          >
            Book Now
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-primary transition-all duration-300 ${
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
          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-gray-700 hover:text-accent font-medium py-2 text-left transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-semibold transition-colors mt-2 cursor-pointer"
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
