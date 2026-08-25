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
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-md"
      }`}
    >
      {/* Top Banner Bar */}
      <div className="bg-[linear-gradient(35deg,#0d9488,#ffffff)] text-teal-950 text-[11px] sm:text-xs py-2 px-4 sm:px-6 lg:px-8 border-b border-teal-100 font-semibold shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <span className="italic text-center sm:text-left text-teal-900">
            "चला सहलीला, गणेश टूरिझम आहे ना साथीला!"
          </span>
          <div className="flex gap-4 text-[10px] sm:text-xs font-bold text-teal-900">
            <a href="tel:+917058255525" className="hover:text-teal-700 transition-colors">📞 +91 70582 55525</a>
            <a href="mailto:travelganeshyaatra@gmail.com" className="hover:text-teal-700 transition-colors">✉️ travelganeshyaatra@gmail.com</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src="\src\assets\image-removebg-preview.jpeg"
              alt="Ganesh Yatra logo"
              className="h-12 w-12 rounded-2xl object-contain shadow-sm"
            />
            <div className="text-left">
              <span className="block text-lg md:text-xl font-bold text-teal-800 leading-tight font-serif">
                Ganesh Yatra
              </span>
              <span className="block text-xs md:text-sm font-bold text-[#27374D] leading-tight uppercase tracking-wider">
                Tourism
              </span>
            </div>
          </button>

          {/* Main Nav */}
          <nav className="hidden lg:flex items-center gap-2 bg-[linear-gradient(35deg,#ffffff,#e6f4f4)] rounded-full px-6 py-2 border border-teal-100 shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-[#27374D] hover:text-white hover:bg-teal-700 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => handleNavClick("contact")}
            className="hidden lg:inline-flex bg-[linear-gradient(35deg,#1e293b,#0d9488)] hover:bg-[linear-gradient(35deg,#0d9488,#ffffff)] text-white hover:text-slate-900 px-6 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-md border border-[#27374D] hover:-translate-y-0.5 cursor-pointer text-sm"
          >
            Book Now
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg bg-white shadow-sm border border-teal-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-teal-700 transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-teal-700 transition-all duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-teal-700 transition-all duration-300 ${
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
          <div className="flex flex-col gap-2 border border-teal-100 bg-white/95 rounded-3xl p-4 shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-[#27374D] hover:bg-teal-700 hover:text-white px-4 py-2.5 rounded-xl font-medium text-left transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="bg-[linear-gradient(35deg,#1e293b,#0d9488)] text-white px-5 py-3 rounded-full font-semibold transition-all mt-2 cursor-pointer text-center"
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
