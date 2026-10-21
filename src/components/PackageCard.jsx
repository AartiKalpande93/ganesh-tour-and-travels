import Button from "./Button";
import { getEmiDetails } from "../utils/emi";

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
  imageCredit,
  imageCreditUrl,
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
      imageCredit,
      imageCreditUrl,
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
  const emiDetails = getEmiDetails(price);

  const typeColors = {
    Domestic: "bg-palm-soft text-palm border-palm/30",
    International: "bg-sky-soft text-sky-dark border-sky/30",
    Pilgrimage: "bg-sunset-soft text-gold-deep border-sunset/40",
  };

  return (
    <div className="group bg-white rounded-[24px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-line flex flex-col h-full">
      <div className="relative overflow-hidden h-56 shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        
        {/* Date Badge */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-ink font-bold text-xs px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-white/50">
          <span className="text-sunset">📅</span> {date}
        </div>

        {/* Type Badge */}
        <div className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${typeColors[type] || "bg-cream text-ink"}`}>
          {type}
        </div>
        {imageCredit && imageCreditUrl && (
          <a
            href={imageCreditUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Photo credit: ${imageCredit}. View image source and license.`}
            className="absolute bottom-2 left-2 rounded-md bg-black/60 px-2 py-1 text-[10px] text-white/90 transition hover:bg-black/80"
          >
            Photo: {imageCredit}
          </a>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-xl font-bold text-ink mb-2 leading-snug group-hover:text-brand transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted mb-4 text-sm leading-relaxed min-h-[40px]">
            {description}
          </p>
        </div>

        <div className="mt-auto">
          {/* Price Section */}
          <div className="flex flex-col items-center justify-center p-3.5 mb-4 bg-brand-soft rounded-2xl border border-brand/15">
            <span className="text-xs text-brand font-semibold uppercase tracking-wider mb-1">
              Tour Price
            </span>
            <span className="bg-brand text-white font-extrabold text-xl px-5 py-1.5 rounded-xl tracking-wide shadow-md shadow-brand/25">
              {formattedPrice}
            </span>
            {emiDetails && (
              <span className="mt-2 text-center text-xs font-semibold text-ink">
                EMI: approx. {emiDetails.formattedMonthlyAmount} × {emiDetails.installments} installments
              </span>
            )}
            {note && (
              <span className="text-xs text-muted font-medium mt-2 italic">
                ({note})
              </span>
            )}
          </div>

          <Button onClick={handleViewDetails} className="w-full justify-center py-3.5 font-semibold text-sm cursor-pointer">
            View Details 🔍
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
