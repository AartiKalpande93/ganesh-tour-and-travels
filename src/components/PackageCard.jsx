import Button from "./Button";
import { scrollToSection } from "../utils/scrollTo";

const PackageCard = ({
  id,
  _id,
  title,
  description,
  price,
  image,
  date,
  note,
  type,
  year,
  category,
  destination,
  duration,
  highlights,
  inclusions,
  exclusions,
  available,
  onViewDetails,
}) => {
  const handleViewDetails = () => {
    const tourData = {
      id: id || _id,
      title,
      description,
      price,
      image,
      date,
      note,
      type,
      year,
      category,
      destination,
      duration,
      highlights,
      inclusions,
      exclusions,
      available,
    };

    if (onViewDetails) {
      onViewDetails(tourData);
    } else {
      const event = new CustomEvent("view-tour-details", {
        detail: tourData,
      });
      window.dispatchEvent(event);
    }
  };

  const formattedPrice = typeof price === 'number' ? `₹${price.toLocaleString('en-IN')}/-` : price;

  const typeColors = {
    Domestic: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    International: "bg-blue-50 text-blue-700 border-blue-200/60",
    Pilgrimage: "bg-amber-50 text-amber-800 border-amber-200/60"
  };

  return (
    <div className="group bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-[#E2E8F0] flex flex-col h-full">
      <div className="relative overflow-hidden h-56 shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#1E293B] font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/50">
          <span className="text-orange-500">📅</span> {date}
        </div>

        {/* Type Badge */}
        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${typeColors[type] || "bg-slate-50 text-slate-700"}`}>
          {type}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2 leading-snug group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-[#64748B] mb-4 text-sm leading-relaxed min-h-[40px]">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          {/* Price Section */}
          <div className="flex flex-col items-center justify-center p-3.5 mb-4 bg-red-50/50 rounded-2xl border border-red-100">
            <span className="text-xs text-red-600 font-semibold uppercase tracking-wider mb-1">
              Tour Price
            </span>
            <span className="bg-red-600 text-white font-extrabold text-xl px-5 py-1.5 rounded-xl tracking-wide shadow-md shadow-red-500/20">
              {formattedPrice}
            </span>
            {note && (
              <span className="text-xs text-[#475569] font-medium mt-2 italic">
                ({note})
              </span>
            )}
          </div>

          <Button onClick={handleViewDetails} className="w-full justify-center py-3.5 font-semibold text-sm cursor-pointer bg-[#0369A1] hover:bg-[#025a8b]">
            View Details 🔍
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
