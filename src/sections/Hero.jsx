import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { contactInfo } from "../data/siteData";
import heroImage from "../assets/home2.jpeg";

const openTab = (tab) => {
  window.dispatchEvent(new CustomEvent("open-tab", { detail: tab }));
};

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 19h18L14.5 7 11 12.5 8.2 9 3 19z" />
    </svg>
  );
}

function TempleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l2.2 3.2H9.8L12 3zM7 20V10.5h10V20M5 20h14M12 10.5V20M9.5 14.5h5" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l18-6-6 16-2.2-6.2L3 12z" />
    </svg>
  );
}

function FamilyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="8.5" r="1.8" />
      <path strokeLinecap="round" d="M3.5 18.5c.4-2.6 2.3-4 4.5-4s4.1 1.4 4.5 4M13.2 14.8c1.8.2 3.2 1.5 3.6 3.7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
      <circle cx="11" cy="11" r="6.5" />
      <path strokeLinecap="round" d="M16 16l4 4" />
    </svg>
  );
}

const tabIcons = [MountainIcon, TempleIcon, PlaneIcon, FamilyIcon];

const trustIcons = [
  () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-2.8 7.4-7 9-4.2-1.6-7-4.5-7-9V6l7-3z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="8" cy="9" r="2.2" />
      <circle cx="16" cy="9" r="2.2" />
      <path strokeLinecap="round" d="M3.8 18.5c.5-2.5 2.4-4 4.2-4s3.7 1.5 4.2 4M12.2 14.6c1.6.15 3 1.4 3.5 3.9" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 3v6c0 4.5-2.8 7.4-7 9-4.2-1.6-7-4.5-7-9V6l7-3z" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4l1.6 3.4L17.2 8l-2.6 2.5.6 3.5L12 12.3 8.8 14l.6-3.5L6.8 8l3.6-.6L12 4z" />
      <path strokeLinecap="round" d="M5 19h14" />
    </svg>
  ),
  () => (
    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7a5 5 0 0 1 5 5v1H7v-1a5 5 0 0 1 5-5z" />
      <path strokeLinecap="round" d="M8 18a4 4 0 0 0 8 0M12 3v2" />
    </svg>
  ),
];

const Hero = () => {
  const { lang, t } = useLanguage();
  const { hero, search, trust } = t;
  const [category, setCategory] = useState(search.tabs[0].id);
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");

  const activeTab = search.tabs.find((tab) => tab.id === category) || search.tabs[0];

  const handleSearch = (event) => {
    event.preventDefault();
    const durationLabel = search.durations.find((item) => item.id === duration)?.label;
    const budgetLabel = search.budgets.find((item) => item.id === budget)?.label;
    const lines = [
      lang === "mr"
        ? "नमस्कार गणेश यात्रा टुरिझम! मला सहलीची माहिती हवी आहे."
        : "Hello Ganesh Yatra Tourism! I would like to enquire about a trip.",
      lang === "mr" ? `प्रकार: ${activeTab.label}` : `Trip type: ${activeTab.label}`,
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

    const url = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.location.href = url;
  };

  const explore = () => {
    window.__heroSearch = null;
    window.dispatchEvent(new CustomEvent("hero-search", { detail: null }));
    openTab("packages");
  };

  return (
    <section id="home" className="relative flex min-h-[calc(100vh-4.5rem)] flex-col bg-[#1a120d]">
      <div className="relative flex flex-1 items-center overflow-hidden">
        <img
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_62%]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/25" />

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-12 lg:px-8 lg:py-14">
          <div className="max-w-3xl text-white">
            <p
              className={`text-[1.65rem] text-[#f0a04b] sm:text-3xl ${
                lang === "mr" ? "font-script-mr" : "font-script"
              }`}
            >
              {hero.script}
            </p>
            <h1
              className={`mt-3 text-white ${
                lang === "mr"
                  ? "font-mr text-[2.6rem] sm:text-6xl"
                  : "font-display text-[clamp(2.15rem,4.4vw,4.5rem)] uppercase"
              }`}
            >
              <span className="block">{hero.line1}</span>
              <span className="block">{hero.line2}</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
              {hero.sub}
            </p>
            <button
              type="button"
              onClick={explore}
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#ff7a18] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:bg-[#ff8a33] cursor-pointer"
            >
              {hero.cta}
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="w-full shrink-0 justify-self-end rounded-2xl bg-white p-4 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-5"
          >
            <div className="grid grid-cols-4 gap-1 border-b border-slate-200">
              {search.tabs.map((tab, index) => {
                const Icon = tabIcons[index];
                const active = tab.id === category;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setCategory(tab.id)}
                    className={`flex min-w-0 flex-col items-center gap-1.5 border-b-2 px-1 pb-2.5 pt-1 text-[11px] font-semibold leading-none transition cursor-pointer ${
                      active
                        ? "border-[#ff7a18] text-[#ff7a18]"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <Icon />
                    <span className="block w-full truncate text-center">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <label className="mt-4 block text-[11px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
              {search.destination}
              <span className="mt-1.5 flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 normal-case tracking-normal">
                <span className="text-slate-400">
                  <PinIcon />
                </span>
                <input
                  value={destination}
                  onChange={(event) => setDestination(event.target.value)}
                  placeholder={search.placeholder}
                  className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                />
              </span>
            </label>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <label className="block text-[11px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                {search.duration}
                <select
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-slate-700 outline-none focus:border-[#ff7a18]"
                >
                  <option value="">{search.anyDuration}</option>
                  {search.durations.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-[11px] font-semibold tracking-[0.14em] text-slate-500 uppercase">
                {search.budget}
                <select
                  value={budget}
                  onChange={(event) => setBudget(event.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium normal-case tracking-normal text-slate-700 outline-none focus:border-[#ff7a18]"
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
              className={`mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff7a18] py-3 text-sm font-bold text-white transition hover:bg-[#ff8a33] cursor-pointer ${
                lang === "mr" ? "tracking-normal" : "tracking-[0.16em] uppercase"
              }`}
            >
              {search.submit}
              <SearchIcon />
            </button>
          </form>
        </div>
      </div>

      <div className="relative z-10 border-t border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-5 lg:px-8">
          {trust.map((item, index) => {
            const Icon = trustIcons[index];
            return (
              <div key={item.title} className="flex items-center gap-3">
                <span className="text-[#ff7a18]">
                  <Icon />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                  {item.action === "gallery" ? (
                    <button
                      type="button"
                      onClick={() => openTab("gallery")}
                      className="text-xs font-medium text-[#ff7a18] hover:underline cursor-pointer"
                    >
                      {item.sub}
                    </button>
                  ) : (
                    <p className="text-xs text-slate-500">{item.sub}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
