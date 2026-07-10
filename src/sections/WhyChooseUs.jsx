import SectionTitle from "../components/SectionTitle";
import { whyChooseUs } from "../data/siteData";

const WhyChooseUs = () => (
  <section className="py-20 bg-primary text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        light
        title="Why Choose Us"
        subtitle="We go the extra mile to ensure your travel experience is nothing short of amazing"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {whyChooseUs.map((item) => (
          <div
            key={item.title}
            className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h3 className="text-lg font-bold mb-2 text-accent">{item.title}</h3>
            <p className="text-blue-100 text-sm leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
