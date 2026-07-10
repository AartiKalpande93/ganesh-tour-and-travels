import SectionTitle from "../components/SectionTitle";
import PackageCard from "../components/PackageCard";
import { packages } from "../data/siteData";

const Packages = () => (
  <section id="packages" className="py-20 bg-[#FFF8E7]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        title="Popular Packages"
        subtitle="Handpicked destinations at unbeatable prices — book your dream trip today"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <PackageCard key={pkg.title} {...pkg} />
        ))}
      </div>
    </div>
  </section>
);

export default Packages;
