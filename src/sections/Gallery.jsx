import SectionTitle from "../components/SectionTitle";
import GalleryItem from "../components/GalleryItem";
import { galleryImages } from "../data/siteData";

const Gallery = () => (
  <section id="gallery" className="py-20 bg-[#FFF8E7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="Gallery"
        subtitle="Glimpses of beautiful destinations our travelers have explored"
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <GalleryItem key={image.alt} {...image} />
        ))}
      </div>
    </div>
  </section>
);

export default Gallery;
