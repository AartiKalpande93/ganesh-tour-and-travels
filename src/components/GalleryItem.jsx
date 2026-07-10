const GalleryItem = ({ src, alt }) => (
  <div className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors duration-300 flex items-center justify-center">
      <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-base px-4 text-center">
        {alt}
      </span>
    </div>
  </div>
);

export default GalleryItem;
