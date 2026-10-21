import { useEffect, useState } from "react";
import { navLinks, contactInfo, FACEBOOK_URL, INSTAGRAM_URL } from "../data/siteData";
import { useLanguage } from "../context/useLanguage";
import { Icon } from "./Icons";
import logo from "../assets/logo.png";

const Header = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-line bg-white ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => handleNavClick("home")}
          className="flex min-w-0 items-center gap-2.5 cursor-pointer"
        >
          <img
            src={logo}
            alt="Ganesh Yatra Tourism logo"
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-brand/80"
          />
          <span className="min-w-0 text-left leading-none">
            <span
              className={`block truncate text-[15px] font-extrabold tracking-[0.08em] text-ink uppercase ${
                lang === "mr" ? "font-mr text-base tracking-normal normal-case" : ""
              }`}
            >
              {t.brand}
            </span>
            <span
              className={`mt-1 block text-[10px] font-semibold tracking-[0.22em] text-brand uppercase ${
                lang === "mr" ? "font-mr text-xs tracking-normal normal-case" : ""
              }`}
            >
              {t.brandSub}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-4 xl:flex">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className={`cursor-pointer text-[13px] font-semibold transition ${
                activeTab === link.id ? "text-brand" : "text-ink/75 hover:text-brand"
              }`}
            >
              {t.nav[link.id]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden items-center gap-1 text-xs font-semibold sm:flex">
            <button
              type="button"
              onClick={() => setLang("mr")}
              className={`cursor-pointer rounded-md px-1.5 py-1 ${
                lang === "mr" ? "text-brand" : "text-ink/70 hover:text-ink"
              }`}
            >
              मराठी
            </button>
            <span className="text-ink/25">|</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`cursor-pointer rounded-md px-1.5 py-1 ${
                lang === "en" ? "text-brand" : "text-ink/70 hover:text-ink"
              }`}
            >
              EN
            </button>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ganesh Yatra on Instagram"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-brand-soft hover:text-brand"
          >
            <Icon name="instagram" className="h-5 w-5" />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ganesh Yatra on Facebook"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition hover:bg-brand-soft hover:text-brand"
          >
            <Icon name="facebook" className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={() => handleNavClick("contact")}
            className="hidden cursor-pointer items-center rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark xl:inline-flex"
          >
            {t.bookTrip}
          </button>

          <div className="hidden items-center gap-2 text-sm font-semibold text-ink 2xl:flex">
            {contactInfo.phones.slice(0, 2).map((phone, index) => (
              <a
                key={phone}
                href={`tel:${phone.replace(/[\s]/g, "")}`}
                className="transition hover:text-brand"
              >
                {index === 0 ? phone.replace("+91 ", "") : phone.replace("+91 ", "")}
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full cursor-pointer xl:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <span className={`block h-0.5 w-5 bg-ink transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition ${isOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 xl:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setIsOpen(false)}
          />
          <nav className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex-1 overflow-y-auto px-4 py-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`mb-1 flex min-h-12 w-full items-center rounded-xl px-4 text-left text-base font-semibold cursor-pointer ${
                    activeTab === link.id ? "bg-brand-soft text-brand" : "text-ink hover:bg-cream"
                  }`}
                >
                  {t.nav[link.id]}
                </button>
              ))}
            </div>

            <div className="space-y-3 border-t border-line px-4 py-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setLang("mr")}
                  className={`min-h-11 flex-1 rounded-xl cursor-pointer ${
                    lang === "mr" ? "bg-brand text-white" : "bg-cream text-ink"
                  }`}
                >
                  मराठी
                </button>
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`min-h-11 flex-1 rounded-xl cursor-pointer ${
                    lang === "en" ? "bg-brand text-white" : "bg-cream text-ink"
                  }`}
                >
                  English
                </button>
              </div>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line font-semibold text-ink"
              >
                <Icon name="instagram" className="h-5 w-5" />
                {contactInfo.instagramHandle}
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line font-semibold text-ink"
              >
                <Icon name="facebook" className="h-5 w-5" />
                Facebook
              </a>
              <button
                type="button"
                onClick={() => handleNavClick("contact")}
                className="flex min-h-12 w-full items-center justify-center rounded-xl bg-brand font-semibold text-white cursor-pointer"
              >
                {t.bookTrip}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
