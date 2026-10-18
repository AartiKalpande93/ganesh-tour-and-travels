import { useEffect, useState } from "react";
import { useLanguage } from "../context/useLanguage";
import { contactInfo, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../data/siteData";
import { Icon } from "../components/Icons";
import heroImage from "../assets/home2.jpeg";

const openTab = (tab) => {
  window.dispatchEvent(new CustomEvent("open-tab", { detail: tab }));
};

const trustIcons = ["price", "group", "plan", "team", "support"];
const heroSlides = [
  { src: heroImage, label: "Ganesh Yatra" },
  {
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=85",
    label: "Europe",
  },
  {
    src: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=2000&q=85",
    label: "Singapore",
  },
  {
    src: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85",
    label: "Kerala",
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=85",
    label: "Switzerland",
  },
  {
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=2000&q=85",
    label: "Paris",
  },
];

const Hero = () => {
  const { lang, t } = useLanguage();
  const { hero, search, trust } = t;
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedJourneyId, setSelectedJourneyId] = useState(search.journeys[0].id);
  const [openJourneyId, setOpenJourneyId] = useState(null);
  const [selectedJourneyType, setSelectedJourneyType] = useState(search.journeyTypes[0].id);
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  const selectedJourney =
    search.journeys.find((journey) => journey.id === selectedJourneyId) || search.journeys[0];
  const activeJourneyType =
    search.journeyTypes.find((journeyType) => journeyType.id === selectedJourneyType) ||
    search.journeyTypes[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    const durationLabel = search.durations.find((item) => item.id === duration)?.label;
    const budgetLabel = search.budgets.find((item) => item.id === budget)?.label;
    const lines = [
      lang === "mr"
        ? "नमस्कार गणेश यात्रा टुरिझम! मला सहलीची माहिती हवी आहे."
        : "Hello Ganesh Yatra Tourism! I would like to enquire about a trip.",
      lang === "mr"
        ? `प्रवास: ${selectedJourney.label} - ${activeJourneyType.label}`
        : `Journey: ${selectedJourney.label} - ${activeJourneyType.label}`,
    ];

    if (destination.trim()) {
      lines.push(`${search.destination}: ${destination.trim()}`);
    }
    if (durationLabel) {
      lines.push(`${search.duration}: ${durationLabel}`);
    }
    if (budgetLabel) {
      lines.push(`${search.budget}: ${budgetLabel}`);
    }

    window.open(
      `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <section id="home" className="bg-ink">
      <div className="relative overflow-hidden">
        {heroSlides.map((slide, index) => (
          <img
            key={slide.label}
            src={slide.src}
            alt={index === activeSlide ? `${slide.label} tour destination` : ""}
            aria-hidden={index !== activeSlide}
            className={`absolute inset-0 h-full w-full object-cover object-[center_68%] transition-opacity duration-1000 motion-reduce:transition-none ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            fetchPriority={index === activeSlide ? "high" : "auto"}
          />
        ))}
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />
        {activeSlide > 0 && (
          <span className="absolute right-4 top-4 z-10 rounded-full border border-white/25 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm sm:right-6 sm:top-6">
            {heroSlides[activeSlide].label}
          </span>
        )}

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:min-h-[calc(100vh-4.5rem-7rem)] lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10 lg:px-8 lg:py-16">
          <div className="max-w-xl text-white">
            <p
              className={`text-center text-gold ${lang === "mr" ? "font-script-mr text-2xl sm:text-3xl" : "font-script text-2xl sm:text-3xl"}`}
            >
              {hero.script}
            </p>
            <p className="mt-1 text-center font-mr text-sm text-white/90 sm:text-base">
              " चला सहलीला, गणेश टूरिझम आहे ना साथीला "
            </p>
            <h1
              className={`mt-3 text-center text-white ${
                lang === "mr"
                  ? "font-mr text-[2.15rem] leading-[1.15] sm:text-5xl"
                  : "font-display text-[clamp(2.35rem,5vw,4.35rem)] uppercase"
              }`}
            >
              <span className="block">{hero.line1}</span>
              <span className="block">{hero.line2}</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-center text-sm leading-relaxed text-white/90 sm:text-base">
              {hero.sub}
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => openTab("packages")}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand px-6 text-sm font-bold text-white transition hover:bg-brand-dark cursor-pointer"
              >
                {hero.cta}
                <Icon name="arrow" className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => openTab("contact")}
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/70 bg-white/10 px-6 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-ink cursor-pointer"
              >
                {hero.ctaSecondary}
              </button>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto mt-4 inline-flex min-h-11 translate-x-3 items-center gap-2 text-sm font-semibold text-white/95 hover:text-gold sm:translate-x-5"
            >
              <Icon name="instagram" className="h-5 w-5" />
              {INSTAGRAM_HANDLE}
            </a>
          </div>

          <button
            type="button"
            onClick={() => openTab("about")}
            className="absolute bottom-3 left-1/2 z-20 inline-flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-white/35 bg-black/30 text-white shadow-lg backdrop-blur-sm transition hover:border-white/60 hover:bg-black/45"
            aria-label={hero.scrollPrompt}
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-6 w-6"
            >
              <path
                d="m5 7 5 5 5-5M5 12l5 5 5-5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.7"
              />
            </svg>
          </button>

          <form
            onSubmit={handleSearch}
            className="w-full rounded-2xl bg-white p-4 shadow-[0_20px_50px_rgba(0,0,0,0.28)] sm:p-5"
          >
            <div className="relative grid grid-cols-2 gap-2 border-b border-line">
              {search.journeys.map((journey, index) => {
                const active = journey.id === selectedJourneyId;
                const isDropdownOpen = openJourneyId === journey.id;
                return (
                    <button
                      key={journey.id}
                      type="button"
                      onClick={() => {
                        setSelectedJourneyId(journey.id);
                        setOpenJourneyId(isDropdownOpen ? null : journey.id);
                      }}
                      aria-expanded={isDropdownOpen}
                      aria-controls={`journey-options-${journey.id}`}
                      className={`flex min-h-14 min-w-0 items-center justify-center gap-2 border-b-2 px-1 pb-2 pt-1 text-[11px] font-semibold leading-tight transition cursor-pointer sm:text-xs ${
                        active || isDropdownOpen
                          ? "border-brand text-brand"
                          : "border-transparent text-muted hover:text-ink"
                      }`}
                    >
                      <Icon name={index === 0 ? "route" : "yatra"} className="h-5 w-5 shrink-0" />
                      <span className="truncate">{journey.label}</span>
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                        fill="none"
                        className={`h-4 w-4 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="m5 7.5 5 5 5-5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.7"
                        />
                      </svg>
                    </button>
                );
              })}
              <div className="col-span-2 grid grid-cols-3 gap-2 py-2">
                {search.journeyTypes.map((journeyType) => (
                  <button
                    key={journeyType.id}
                    type="button"
                    onClick={() => setSelectedJourneyType(journeyType.id)}
                    aria-pressed={selectedJourneyType === journeyType.id}
                    className={`min-h-10 rounded-xl border px-2 text-xs font-semibold transition cursor-pointer sm:text-sm ${
                      selectedJourneyType === journeyType.id
                        ? "border-brand bg-brand text-white"
                        : "border-line bg-white text-ink hover:border-brand hover:text-brand"
                    }`}
                  >
                    {journeyType.label}
                  </button>
                ))}
              </div>
              {openJourneyId && (
                <ul
                    id={`journey-options-${openJourneyId}`}
                    role="listbox"
                    className="absolute left-0 right-0 top-full z-30 mt-2 max-h-56 overflow-y-auto rounded-xl border border-line bg-white py-1 text-ink shadow-xl"
                >
                    {selectedJourney.destinations.map((option) => (
                      <li key={option.label} role="option" aria-selected={destination === option.query}>
                        <button
                          type="button"
                          onClick={() => {
                            setDestination(option.query);
                            setOpenJourneyId(null);
                          }}
                          className="w-full px-3 py-2.5 text-left text-xs font-medium text-ink transition hover:bg-cream focus:bg-cream focus:outline-none sm:text-sm"
                        >
                          {option.label}
                        </button>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            <label className="mt-4 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {search.destination}
              <span className="mt-1.5 flex min-h-12 items-center gap-2 rounded-xl border border-line px-3 normal-case tracking-normal">
                <Icon name="pin" className="h-4 w-4 shrink-0 text-muted" />
                <input
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder={search.placeholder}
                  className="w-full bg-transparent text-base font-medium text-ink outline-none placeholder:text-muted sm:text-sm"
                />
              </span>
            </label>

            <div className="mt-3 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2">
              <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {search.duration}
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="mt-1.5 min-h-12 w-full rounded-xl border border-line bg-white px-3 text-base font-medium normal-case tracking-normal text-ink outline-none focus:border-brand sm:text-sm"
                >
                  <option value="">{search.anyDuration}</option>
                  {search.durations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {search.budget}
                <select
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="mt-1.5 min-h-12 w-full rounded-xl border border-line bg-white px-3 text-base font-medium normal-case tracking-normal text-ink outline-none focus:border-brand sm:text-sm"
                >
                  <option value="">{search.anyBudget}</option>
                  {search.budgets.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand text-sm font-bold text-white transition hover:bg-brand-dark cursor-pointer"
            >
              {search.submit}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {trust.map((item, index) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                <Icon name={trustIcons[index]} className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                {item.action === "gallery" ? (
                  <button
                    type="button"
                    onClick={() => openTab("gallery")}
                    className="text-left text-xs font-semibold text-brand hover:underline cursor-pointer"
                  >
                    {item.sub}
                  </button>
                ) : (
                  <p className="text-xs leading-snug text-muted">{item.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
