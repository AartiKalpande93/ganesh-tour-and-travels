import { navLinks, services } from "../data/siteData";
import { scrollToSection } from "../utils/scrollTo";

const Footer = () => {
  const handleClick = (id) => scrollToSection(id);

  return (
    <footer className="bg-[#0369A1] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">✈️</span>
              <div>
                <h3 className="text-xl font-bold">Ganesh Tour and Travels</h3>
              </div>
            </div>
            <p className="text-[#DBEAFE] leading-relaxed">
              Your trusted partner for memorable journeys. We make travel simple,
              safe, and premium.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#F97316]">Quick Links</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className="text-[#DBEAFE] hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 text-[#F97316]">Our Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.title} className="text-[#DBEAFE]">
                  {service.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#0B4A74] mt-10 pt-6 text-center text-[#BFDBFE] text-sm">
          <p>&copy; {new Date().getFullYear()} Ganesh Tour and Travels. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
