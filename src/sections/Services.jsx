import SectionTitle from "../components/SectionTitle";
import ServiceCard from "../components/ServiceCard";
import { services, text } from "../data/siteData";
import { useLanguage } from "../context/useLanguage";

const copy = {
  en: {
    eyebrow: "Services",
    title: "How we can help you travel",
    subtitle: "Tell us where you want to go and we will help plan the trip.",
    enquire: "Enquire",
  },
  mr: {
    eyebrow: "सेवा",
    title: "आम्ही प्रवासात कशी मदत करतो",
    subtitle: "कुठे जायचे ते सांगा, नियोजन आम्ही करू.",
    enquire: "विचारा",
  },
};

const Services = () => {
  const { lang } = useLanguage();
  const c = copy[lang] || copy.en;

  const enquire = (title) => {
    window.dispatchEvent(
      new CustomEvent("select-package", {
        detail: { title, date: lang === "mr" ? "योग्य तारीख" : "a suitable date" },
      })
    );
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="services" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service) => {
            const title = text(service.title, lang);
            return (
              <ServiceCard
                key={service.title.en}
                icon={service.icon}
                title={title}
                description={text(service.description, lang)}
                actionLabel={c.enquire}
                onAction={() => enquire(title)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
