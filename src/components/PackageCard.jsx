import Button from "./Button";
import { scrollToSection } from "../utils/scrollTo";

const PackageCard = ({ title, description, price, image }) => (
  <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
    <div className="relative overflow-hidden h-52">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-primary mb-2">{title}</h3>
      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{description}</p>
      <p className="text-accent font-bold text-lg mb-4">{price}</p>
      <Button onClick={() => scrollToSection("contact")} className="w-full">
        Book Now
      </Button>
    </div>
  </div>
);

export default PackageCard;
