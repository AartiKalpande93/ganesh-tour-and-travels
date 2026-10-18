import SectionTitle from "../components/SectionTitle";
import { Icon } from "../components/Icons";
import { whyChooseUs, text } from "../data/siteData";
import { useLanguage } from "../context/useLanguage";

const copy = {
  en: {
    eyebrow: "Why us",
    title: "Why travellers stay with Ganesh Yatra",
    subtitle: "A clear plan, a known team and a trip that families can actually enjoy.",
  },
  mr: {
    eyebrow: "आम्ही का",
    title: "प्रवासी गणेश यात्रेसोबत का राहतात",
    subtitle: "स्पष्ट नियोजन, ओळखीची टीम आणि कुटुंबांना आवडेल असा प्रवास.",
  },
};

const WhyChooseUs = () => {
  const { lang } = useLanguage();
  const c = copy[lang] || copy.en;

  return (
    <section id="why" className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => (
            <article key={item.title.en} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand-ink">
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-bold text-ink">{text(item.title, lang)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text(item.description, lang)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
