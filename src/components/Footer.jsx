import { navLinks, services, contactInfo } from "../data/siteData";
import { scrollToSection } from "../utils/scrollTo";

const Footer = () => {
  const handleClick = (id) => scrollToSection(id);

  return (
    <footer className="bg-[linear-gradient(35deg,#008080,#0d9488)] text-white pt-16 pb-8 border-t border-teal-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">✈️</span>
              <div>
                <h3 className="text-xl font-extrabold tracking-wide">guruvarya Tour</h3>
                <span className="text-xs font-semibold text-teal-200 block uppercase tracking-wider">Tourism</span>
              </div>
            </div>
            <p className="text-teal-50 text-sm leading-relaxed italic">
              "चला सहलीला, गणेश टूरिझम आहे ना साथीला!"
            </p>
            <p className="text-teal-100 text-xs leading-relaxed">
              Your trusted travel partner based in Amravati, Maharashtra. We organize domestic, international, and pilgrimage tours.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold mb-4 text-teal-200 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleClick(link.id)}
                    className="text-teal-50 hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-base font-bold mb-4 text-teal-200 uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5 text-sm text-teal-50">
              {services.map((service) => (
                <li key={service.title} className="flex items-center gap-2">
                  <span>✨</span>
                  <span>{service.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-base font-bold mb-4 text-teal-200 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3 text-sm text-teal-50">
              <li className="flex items-start gap-2">
                <span className="mt-0.5">📍</span>
                <span>{contactInfo.address}</span>
              </li>
              <li className="flex flex-col gap-1">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">📞</span>
                  <div className="flex flex-col">
                    {contactInfo.phones.map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/[\s+]/g, "")}`}
                        className="hover:text-white transition-colors font-semibold"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors break-all">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🌐</span>
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Slogans Banner */}
        <div className="border-t border-teal-400/40 py-6 my-6 text-center">
          <div className="flex flex-wrap justify-center items-center gap-y-2 gap-x-4 md:gap-x-8 text-xs sm:text-sm font-semibold text-teal-100">
            {contactInfo.features.map((feature, idx) => (
              <span key={feature} className="flex items-center gap-2">
                {idx > 0 && <span className="text-teal-300 hidden sm:inline">•</span>}
                <span>{feature}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-teal-400/30 pt-6 text-center text-teal-100 text-xs">
          <p>&copy; {new Date().getFullYear()} guruvarya Tour Tourism. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
