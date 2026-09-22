import { useState } from "react";
import { navLinks, contactInfo } from "../data/siteData";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/image-removebg-preview.jpeg";

const Header = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const handleNavClick = (id) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#1a120d] text-[#f6efe6] shadow-md">
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => handleNavClick("home")}
          className="flex min-w-0 items-center gap-2.5 cursor-pointer"
        >
          <img
            src={logo}
            alt="Ganesh Yatra logo"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
          <span className="text-left leading-none">
            <span
              className={`block text-[15px] font-extrabold tracking-[0.12em] text-white uppercase ${
                lang === "mr" ? "font-mr tracking-normal normal-case text-lg" : ""
              }`}
            >
              {t.brand}
            </span>
            <span
              className={`mt-1 block text-[10px] font-semibold tracking-[0.28em] text-[#e7c9a4] uppercase ${
                lang === "mr" ? "font-mr tracking-normal normal-case text-xs" : ""
              }`}
            >
              {t.brandSub}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`text-sm font-medium transition cursor-pointer ${
                activeTab === link.id ? "text-[#ff7a18]" : "text-[#f3eadf] hover:text-white"
              }`}
            >
              {t.nav[link.id]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-1.5 text-sm font-semibold">
            <button
              type="button"
              onClick={() => setLang("mr")}
              className={`cursor-pointer ${lang === "mr" ? "text-[#ff7a18]" : "text-[#f3eadf] hover:text-white"}`}
            >
              मराठी
            </button>
            <span className="text-white/30">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`cursor-pointer ${lang === "en" ? "text-[#ff7a18]" : "text-[#f3eadf] hover:text-white"}`}
            >
              EN
            </button>
          </div>

          <a
            href={`tel:${contactInfo.phones[0].replace(/[\s+]/g, "")}`}
            className="hidden items-center gap-1.5 text-sm font-semibold text-[#f6efe6] xl:inline-flex"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 3.5h3l1.5 4-2 1.2a12 12 0 0 0 6.3 6.3l1.2-2 4 1.5v3A2 2 0 0 1 18.5 19 15 15 0 0 1 5 5.5a2 2 0 0 1 1.5-2z" />
            </svg>
            {contactInfo.phones[0].replace("+91 ", "")}
          </a>

          <button
            onClick={() => handleNavClick("contact")}
            className="hidden rounded-md bg-[#ff7a18] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#ff8a33] cursor-pointer sm:inline-flex"
          >
            {t.bookNow}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 p-2 lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block h-0.5 w-6 bg-white transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-white transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <nav className={`lg:hidden overflow-hidden bg-[#241910] transition-all ${isOpen ? "max-h-96 border-t border-white/10" : "max-h-0"}`}>
        <div className="flex flex-col gap-1 px-4 py-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium cursor-pointer ${
                activeTab === link.id ? "bg-white/10 text-[#ff7a18]" : "text-[#f3eadf]"
              }`}
            >
              {t.nav[link.id]}
            </button>
          ))}
          <a
            href={`tel:${contactInfo.phones[0].replace(/[\s+]/g, "")}`}
            className="px-3 py-2 text-sm font-semibold text-[#f6efe6]"
          >
            {contactInfo.phones[0]}
          </a>
          <button
            onClick={() => handleNavClick("contact")}
            className="mt-1 rounded-md bg-[#ff7a18] px-4 py-2.5 text-sm font-bold text-white cursor-pointer"
          >
            {t.bookNow}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
