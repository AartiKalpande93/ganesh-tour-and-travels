import { navLinks, services, contactInfo, FACEBOOK_URL, text, INSTAGRAM_URL } from "../data/siteData";
import { useLanguage } from "../context/LanguageContext";
import { Icon } from "./Icons";
import logo from "../assets/logo.png";

const Footer = ({ setActiveTab }) => {
  const { lang, t } = useLanguage();

  const handleClick = (id) => {
    setActiveTab?.(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-4 pb-28 pt-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <button type="button" onClick={() => handleClick("home")} className="flex items-center gap-3 cursor-pointer">
              <img src={logo} alt="" className="h-12 w-12 rounded-full object-cover ring-2 ring-gold" />
              <span className="text-left leading-none">
                <span className="block text-lg font-extrabold tracking-wide">{t.brand}</span>
                <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  {t.brandSub}
                </span>
              </span>
            </button>
            <p className="mt-4 font-script-mr text-base text-gold">{contactInfo.tagline}</p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">
              {lang === "mr"
                ? "अमरावती, महाराष्ट्र येथून ग्रुप टूर, कौटुंबिक सुट्ट्या आणि तीर्थयात्रा."
                : "Group tours, family holidays and pilgrimage yatras from Amravati, Maharashtra."}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-gold"
              >
                <Icon name="instagram" className="h-5 w-5" />
                {contactInfo.instagramHandle}
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ganesh Yatra on Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-gold"
              >
                <Icon name="facebook" className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gold">
              {lang === "mr" ? "द्रुत दुवे" : "Quick Links"}
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => handleClick(link.id)}
                    className="cursor-pointer text-sm text-white/80 transition hover:text-gold"
                  >
                    {t.nav[link.id]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gold">
              {lang === "mr" ? "सेवा" : "Services"}
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {services.slice(0, 6).map((service) => (
                <li key={service.title.en}>
                  <button
                    type="button"
                    onClick={() => handleClick("services")}
                    className="cursor-pointer text-left transition hover:text-gold"
                  >
                    {text(service.title, lang)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-gold">
              {lang === "mr" ? "संपर्क" : "Contact"}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/80">
              <li className="leading-relaxed">{contactInfo.address}</li>
              {contactInfo.phones.map((phone) => (
                <li key={phone}>
                  <a href={`tel:${phone.replace(/\s/g, "")}`} className="font-semibold hover:text-gold">
                    {phone}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${contactInfo.email}`} className="break-all hover:text-gold">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-white/10 py-5 text-center text-xs font-semibold text-white/70 sm:text-sm">
          {contactInfo.features.map((feature) => (
            <span key={feature}>{feature}</span>
          ))}
        </div>

        <p className="border-t border-white/10 pt-5 text-center text-xs text-white/55">
          © {new Date().getFullYear()} Ganesh Yatra Tourism.{" "}
          {lang === "mr" ? "सर्व हक्क राखीव." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
