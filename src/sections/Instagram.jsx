import { INSTAGRAM_HANDLE, INSTAGRAM_URL, popularJourneys } from "../data/siteData";
import { useLanguage } from "../context/useLanguage";
import { Icon } from "../components/Icons";
import groupPhoto from "../assets/home2.jpeg";
import travelPhoto from "../assets/home1.jpeg";
import gardenPhoto from "../assets/team.jpeg";

const copy = {
  en: {
    eyebrow: "Instagram",
    title: "Follow Our Journey",
    text: "Follow us on Instagram for the latest tours, destinations, travel updates and memories.",
    button: "Follow on Instagram",
    journeys: "Popular journeys",
  },
  mr: {
    eyebrow: "Instagram",
    title: "आमचा प्रवास फॉलो करा",
    text: "नवीन सहली, गंतव्ये, प्रवास अपडेट्स आणि आठवणींसाठी आम्हाला Instagram वर फॉलो करा.",
    button: "Instagram वर फॉलो करा",
    journeys: "लोकप्रिय सहली",
  },
};

const photos = [
  { src: groupPhoto, alt: "Ganesh Yatra group tour" },
  { src: travelPhoto, alt: "Ganesh Yatra travellers before a trip" },
  { src: gardenPhoto, alt: "Ganesh Yatra group at a tour stop" },
];

const Instagram = () => {
  const { lang } = useLanguage();
  const c = copy[lang] || copy.en;

  const openJourney = (query) => {
    const detail = { destination: query, type: "All", category: "domestic" };
    window.__heroSearch = detail;
    window.dispatchEvent(new CustomEvent("hero-search", { detail }));
    document.getElementById("packages")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="instagram" className="bg-sand py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-ink text-white shadow-xl">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold">{c.eyebrow}</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{c.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">{c.text}</p>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold"
              >
                <Icon name="instagram" className="h-5 w-5" />
                {INSTAGRAM_HANDLE}
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-dark"
              >
                {c.button}
              </a>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4 sm:p-6 lg:grid-cols-1">
              {photos.map((photo) => (
                <a
                  key={photo.src}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block overflow-hidden rounded-2xl"
                >
                  <img src={photo.src} alt={photo.alt} className="h-24 w-full object-cover sm:h-36 lg:h-32" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <p className="text-sm font-semibold text-ink">{c.journeys}</p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {popularJourneys.map((journey) => (
              <button
                key={journey.query}
                type="button"
                onClick={() => openJourney(journey.query)}
                className="shrink-0 cursor-pointer rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
              >
                {journey.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Instagram;
