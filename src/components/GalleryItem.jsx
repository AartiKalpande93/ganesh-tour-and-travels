import { useState } from "react";

const GalleryItem = ({ src, alt, featured = false, onClick }) => {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative block w-full cursor-pointer overflow-hidden rounded-2xl bg-sand text-left ring-1 ring-line ${
        featured ? "aspect-[4/3] sm:col-span-2 sm:aspect-[16/10] lg:row-span-2 lg:aspect-auto lg:h-full lg:min-h-[18rem]" : "aspect-[4/3]"
      }`}
    >
      {failed ? (
        <span className="flex h-full min-h-40 items-end bg-gradient-to-br from-brand to-brand-dark p-4 text-sm font-semibold text-white">
          {alt}
        </span>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      )}
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-white sm:translate-y-2 sm:opacity-0 sm:transition sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
        {alt}
      </span>
    </button>
  );
};

export default GalleryItem;
