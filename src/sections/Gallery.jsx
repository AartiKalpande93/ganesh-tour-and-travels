import { useEffect, useState } from "react";
import SectionTitle from "../components/SectionTitle";
import GalleryItem from "../components/GalleryItem";
import { galleryImages, text } from "../data/siteData";
import { useLanguage } from "../context/useLanguage";
import { Icon } from "../components/Icons";

const copy = {
  en: {
    eyebrow: "Gallery",
    title: "Moments from the road",
    subtitle: "Groups, temples, hills and coastlines from Ganesh Yatra journeys.",
    close: "Close preview",
    prev: "Previous photo",
    next: "Next photo",
  },
  mr: {
    eyebrow: "गॅलरी",
    title: "प्रवासातील क्षण",
    subtitle: "गणेश यात्रा सहलींमधील ग्रुप, मंदिरे, डोंगर आणि किनारे.",
    close: "पूर्वावलोकन बंद करा",
    prev: "मागील फोटो",
    next: "पुढील फोटो",
  },
};

const Gallery = () => {
  const { lang } = useLanguage();
  const c = copy[lang] || copy.en;
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (active === null) return undefined;

    const onKey = (event) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") {
        setActive((index) => (index + 1) % galleryImages.length);
      }
      if (event.key === "ArrowLeft") {
        setActive((index) => (index - 1 + galleryImages.length) % galleryImages.length);
      }
    };

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const current = active === null ? null : galleryImages[active];

  return (
    <section id="gallery" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={`${image.alt.en}-${index}`}
              src={image.src}
              alt={text(image.alt, lang)}
              featured={image.featured}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/90 p-3 sm:p-6 animate-fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={text(current.alt, lang)}
        >
          <button type="button" className="absolute inset-0 cursor-pointer" aria-label={c.close} onClick={() => setActive(null)} />
          <div className="relative z-10 w-full max-w-5xl">
            <img
              src={current.src}
              alt={text(current.alt, lang)}
              className="max-h-[78vh] w-full rounded-2xl object-contain bg-black"
            />
            <p className="mt-3 text-center text-sm font-medium text-white">{text(current.alt, lang)}</p>
            <div className="mt-3 flex items-center justify-center gap-3">
              <button
                type="button"
                aria-label={c.prev}
                onClick={() => setActive((index) => (index - 1 + galleryImages.length) % galleryImages.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink cursor-pointer"
              >
                <Icon name="arrow" className="h-4 w-4 rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="inline-flex min-h-11 items-center rounded-full bg-white px-5 text-sm font-semibold text-ink cursor-pointer"
              >
                {c.close}
              </button>
              <button
                type="button"
                aria-label={c.next}
                onClick={() => setActive((index) => (index + 1) % galleryImages.length)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink cursor-pointer"
              >
                <Icon name="arrow" className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
