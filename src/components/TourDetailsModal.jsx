import { useState, useEffect } from "react";
import { contactInfo } from "../data/siteData";
import { scrollToSection } from "../utils/scrollTo";
import { getEmiDetails } from "../utils/emi";

const defaultTourData = {
  "Andaman Tour": {
    duration: "7 Days / 6 Nights",
    destinations: ["Port Blair", "Havelock Island", "Neil Island", "Radhanagar Beach", "Cellular Jail"],
    highlights: [
      "Light & Sound show at historic Cellular Jail",
      "Sunset at world-famous Radhanagar Beach (Asia's best beach)",
      "Snorkeling & Coral Reef exploration at Elephant Beach",
      "Speedboat cruise to Havelock & Neil Islands",
      "Ross Island heritage walk & Chidiyatapu sunset point"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Port Blair & Cellular Jail Light & Sound Show", desc: "Arrive at Veer Savarkar International Airport, Port Blair. Transfer to hotel. In the afternoon, visit the historic Cellular Jail followed by the breathtaking Light and Sound Show in the evening." },
      { day: "Day 2", title: "Port Blair to Havelock Island & Radhanagar Beach", desc: "Board high-speed cruise to Havelock Island. Check in at beach resort. Afternoon visit to the world-renowned Radhanagar Beach (Beach No. 7), known for white sands and turquoise waters." },
      { day: "Day 3", title: "Elephant Beach Water Sports Excursion", desc: "Proceed to Elephant Beach by boat for water activities including complimentary snorkeling, sea walk, and banana boat rides. Evening at leisure at resort." },
      { day: "Day 4", title: "Havelock Island to Neil Island (Shaheed Dweep)", desc: "Take cruise to Neil Island. Visit Bharatpur Beach, Laxmanpur Beach for spectacular sunset, and the famous Natural Rock Formation (Howrah Bridge)." },
      { day: "Day 5", title: "Neil Island to Port Blair & Shopping", desc: "Return cruise to Port Blair. Afternoon visit to Sagarika Govt. Emporium for local handicrafts, pearls, and wooden artifacts." },
      { day: "Day 6", title: "Chidiyatapu & Ross Island Day Tour", desc: "Explore Ross Island (Netaji Subhash Chandra Bose Dweep), the former British administrative headquarters. Evening sunset at Chidiyatapu bird sanctuary." },
      { day: "Day 7", title: "Departure with Unforgettable Memories", desc: "Check out from hotel after delicious breakfast. Transfer to Port Blair Airport for homebound flight." }
    ],
    inclusions: [
      "Accommodation in 3-Star Deluxe Hotels/Beach Resorts",
      "Daily Breakfast & Dinner (Veg & Non-Veg options)",
      "Inter-island transfers by AC Cruise (Makruzz / Nautika)",
      "All entry permits, ferry tickets & monument entry fees",
      "AC Vehicle for all sightseeing & airport transfers",
      "Dedicated Tour Manager & 24/7 travel assistance"
    ],
    exclusions: [
      "Airfare / Flight tickets (available on request)",
      "Personal expenses like laundry, room service, drinks",
      "Water sports activities (Scuba diving, Parasailing optional)",
      "GST / Govt taxes if applicable",
      "Anything not mentioned in inclusions"
    ],
    accommodation: "3-Star Deluxe AC Hotels & Beach Resorts (Double/Triple Sharing Rooms)",
    transport: "AC Private Cabs (Ertinga/Innova/Tempo Traveler) & High-Speed Luxury Cruise",
    mealPlan: "Daily Morning Breakfast & Buffet Dinner (Pure Veg & Non-Veg arrangements)",
    thingsToCarry: [
      "Original Govt ID Proof (Aadhaar / Passport / Voter ID)",
      "Light cotton clothing, swimwear & beach hats",
      "Sunscreen lotion, sunglasses & insect repellent",
      "Comfortable footwear & flip-flops",
      "Camera with extra memory card & waterproof pouch",
      "Personal prescribed medicines"
    ]
  },
  "Leh Ladakh Tour": {
    duration: "7 Days / 6 Nights",
    destinations: ["Leh", "Pangong Lake", "Nubra Valley", "Khardung La Pass", "Monasteries"],
    highlights: [
      "Drive through Khardung La Pass (World's highest motorable road)",
      "Overnight stay at Pangong Tso Lake in luxury camps",
      "Double-humped Bactrian camel ride at Hunder Sand Dunes",
      "Visit Hemis, Thiksey & Shey Monasteries",
      "Magnetic Hill & Confluence of Indus & Zanskar rivers"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrival in Leh & Complete Acclimatization", desc: "Arrive at Kushok Bakula Rimpochee Airport, Leh. Full day rest at hotel for altitude acclimatization. Evening stroll at Leh Main Bazaar." },
      { day: "Day 2", title: "Leh Local Sightseeing & Monasteries", desc: "Visit Shey Palace, Thiksey Monastery, Hemis Monastery, and Hall of Fame Museum built by Indian Army." },
      { day: "Day 3", title: "Leh to Nubra Valley via Khardung La Pass", desc: "Drive over Khardung La Pass (17,582 ft). Arrive in Nubra Valley, check-in at luxury camp, and enjoy double-humped camel ride in Hunder Sand Dunes." },
      { day: "Day 4", title: "Nubra Valley to Diskit Monastery & Turtuk Village", desc: "Visit Diskit Monastery with gigantic Maitreya Buddha statue. Excursion to Turtuk, India's northernmost border village." },
      { day: "Day 5", title: "Nubra Valley to Pangong Tso Lake via Shyok Route", desc: "Scenic drive alongside Shyok River to Pangong Tso Lake (13,862 ft). Marvel at the changing colors of the pristine lake." },
      { day: "Day 6", title: "Pangong Lake to Leh via Chang La Pass", desc: "Witness breathtaking sunrise at Pangong Lake. Drive back to Leh crossing Chang La Pass. Visit 3 Idiots School on the way." },
      { day: "Day 7", title: "Departure from Leh", desc: "Check out from Leh hotel. Airport drop for return flight with lifelong memories." }
    ],
    inclusions: [
      "Hotels in Leh & Deluxe Camps in Nubra & Pangong",
      "Breakfast & Dinner daily",
      "All Inner Line Permits & Wild Life Fees",
      "Non-AC Xylo/Innova/Tempo Traveler as per mountain norms",
      "Oxygen Cylinder in vehicle for high-altitude emergency"
    ],
    exclusions: [
      "Flight tickets to/from Leh",
      "Camel rides, ATV rides & rafting charges",
      "Personal snacks & laundry",
      "Medical insurance"
    ],
    accommodation: "Deluxe Hotels in Leh & Heated Luxury Camps with attached bath in Nubra & Pangong",
    transport: "Non-AC Xylo / Innova / Tempo Traveler (Best suited for high altitude terrain)",
    mealPlan: "Hot Veg Breakfast & Healthy Buffet Dinner daily",
    thingsToCarry: [
      "Heavy thermals, windproof jacket, gloves & woolens",
      "UV protection sunglasses & heavy moisturizing lotion",
      "High SPF Sunscreen (SPF 50+)",
      "Diamox / Altitude sickness medication after consulting doctor",
      "Power bank & BSNL / Airtel postpaid SIM card"
    ]
  },
  "Chardham Tour": {
    duration: "14 Days / 13 Nights",
    destinations: ["Haridwar", "Barkot", "Yamunotri", "Uttarkashi", "Gangotri", "Guptkashi", "Kedarnath", "Badrinath", "Rishikesh"],
    highlights: [
      "Holy Darshan at all 4 Sacred Dham Temples (Yamunotri, Gangotri, Kedarnath, Badrinath)",
      "Ganga Aarti at Har Ki Pauri in Haridwar",
      "Overnight stay near Kedarnath Temple",
      "Holy dip in Tapt Kund & visit Mana Village (India's last village)",
      "Rishikesh Laxman Jhula & Ram Jhula exploration"
    ],
    itinerary: [
      { day: "Day 1", title: "Haridwar to Barkot", desc: "Pick up from Haridwar. Scenic drive to Barkot via Mussoorie & Kempty Falls." },
      { day: "Day 2", title: "Barkot - Yamunotri - Barkot", desc: "Drive to Janki Chatti. Trek 6 km to Yamunotri Temple. Holy dip in Surya Kund, Darshan of Yamunotri Ji. Trek back to Janki Chatti and drive to Barkot." },
      { day: "Day 3", title: "Barkot to Uttarkashi", desc: "Drive to Uttarkashi. Visit Kashi Vishwanath Temple on arrival." },
      { day: "Day 4", title: "Uttarkashi - Gangotri - Uttarkashi", desc: "Excursion to Gangotri Temple alongside Bhagirathi River. Holy dip in Ganga River and return to Uttarkashi." },
      { day: "Day 5", title: "Uttarkashi to Guptkashi", desc: "Drive via Mandakini river valley to Guptkashi. Visit Ardh Narishwar Temple." },
      { day: "Day 6", title: "Guptkashi to Kedarnath Ji", desc: "Drive to Gaurikund. Trek 16 km to Kedarnath Temple (by foot / pony / helicopter). Evening Aarti & Darshan at Kedarnath Temple." },
      { day: "Day 7", title: "Kedarnath Darshan to Guptkashi", desc: "Early morning Bhasma Aarti Darshan. Trek back to Gaurikund and drive back to Guptkashi hotel." },
      { day: "Day 8", title: "Guptkashi to Badrinath", desc: "Drive to Badrinath via Joshimath. Holy dip in Tapt Kund, Darshan of Lord Badri Vishal. Attend evening Aarti." },
      { day: "Day 9", title: "Badrinath to Rudraprayag", desc: "Morning Darshan, visit Mana Village (Vyasa Gufa, Ganesh Gufa, Saraswati River). Drive to Rudraprayag." },
      { day: "Day 10-14", title: "Rudraprayag to Rishikesh & Haridwar Return", desc: "Drive to Haridwar via Devprayag & Rishikesh. Ganga Aarti at Triveni Ghat and transfer for onward journey." }
    ],
    inclusions: [
      "Comfortable Hotel/Dharamshala stays across all halts",
      "Delicious Pure Vegetarian Breakfast & Dinner prepared by Marathi Maharaj / Expert Chef",
      "AC Deluxe Bus / Tempo Traveler",
      "Dedicated Yatra Manager throughout the pilgrimage",
      "All toll taxes, parking, driver allowance"
    ],
    exclusions: [
      "Pony / Doli / Helicopter charges for Kedarnath & Yamunotri",
      "Train / Flight fare to Haridwar",
      "Personal puja fees & prasad expenses"
    ],
    accommodation: "Clean, hygienic Deluxe Hotels & Yatri Niwas on Double/Triple sharing",
    transport: "Comfortable AC Bus / Tempo Traveler with experienced mountain drivers",
    mealPlan: "Pure Vegetarian Freshly Prepared Meals (Breakfast, Lunch & Dinner)",
    thingsToCarry: [
      "Valid Photo ID Card (Aadhaar Mandatory)",
      "Warm thermals, sweater, rain poncho/umbrella",
      "Trekking shoes with good grip",
      "Torch light & personal medical kit",
      "Cash (ATMs are limited in higher altitudes)"
    ]
  },
  "Europe Delight Tour": {
    duration: "12 Days / 11 Nights",
    destinations: [
      "Zurich",
      "Grindelwald",
      "Interlaken",
      "Mount Titlis",
      "Lucerne",
      "Rhine Falls",
      "Black Forest",
      "Frankfurt",
      "Cologne",
      "Amsterdam",
      "Brussels",
      "Paris",
      "Disneyland Paris"
    ],
    highlights: [
      "Discover Zurich and the Swiss village of Grindelwald",
      "Optional Jungfraujoch excursion from Grindelwald",
      "Experience Mount Titlis and explore Lucerne",
      "Visit Rhine Falls and travel through Germany's Black Forest",
      "See Cologne Cathedral, Amsterdam canals and Brussels' Grand Place",
      "Explore Paris landmarks, with a Disneyland Paris or leisure-day option"
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Zurich", desc: "Arrive in Zurich, transfer to the hotel and settle in. Enjoy the evening at leisure and an Indian dinner. Overnight stay in Zurich." },
      { day: "Day 2", title: "Grindelwald and Interlaken", desc: "Travel to Grindelwald and enjoy its Alpine scenery. An optional excursion to Jungfraujoch may be available. Continue to Interlaken for a walk before returning to Zurich." },
      { day: "Day 3", title: "Mount Titlis and Lucerne", desc: "Visit Mount Titlis for mountain views and the Rotair cable-car experience, subject to operating conditions. Later explore Lucerne's old town and Lion Monument. Overnight in Zurich." },
      { day: "Day 4", title: "Rhine Falls and Black Forest", desc: "See Rhine Falls at Schaffhausen, then continue through the scenic Black Forest region toward Frankfurt. Overnight in Frankfurt." },
      { day: "Day 5", title: "Frankfurt to Cologne and Amsterdam", desc: "Travel to Cologne and visit the cathedral area. Continue to Amsterdam and check in for the night." },
      { day: "Day 6", title: "Amsterdam, Windmills and Canals", desc: "Explore Amsterdam's canals and city highlights. Depending on the season and final schedule, visit a tulip garden or the windmills and workshops at Zaanse Schans. Overnight in Amsterdam." },
      { day: "Day 7", title: "Amsterdam to Brussels and Paris", desc: "Travel to Brussels to see Grand Place and the Atomium area. Continue to Paris for an overnight stay." },
      { day: "Day 8", title: "Paris City Tour", desc: "Discover Paris landmarks including the Eiffel Tower area, Champs-Élysées and Arc de Triomphe. Enjoy a Seine River cruise if included in the confirmed itinerary." },
      { day: "Day 9", title: "Disneyland Paris or Leisure Day", desc: "Choose a day at Disneyland Paris or spend the day exploring Paris at your own pace. Overnight in Paris." },
      { day: "Day 10", title: "Paris at Leisure", desc: "Enjoy time for museums, local neighbourhoods or shopping. Optional activities depend on the final tour plan. Overnight in Paris." },
      { day: "Day 11", title: "Paris and Farewell Evening", desc: "Spend a relaxed day revisiting favourite sights or shopping for souvenirs. Prepare for departure and stay overnight in Paris." },
      { day: "Day 12", title: "Departure from Paris", desc: "After breakfast, check out and transfer to the Paris airport for your onward journey." }
    ],
    accommodation: "11 nights of hotel accommodation across the itinerary; hotel names and room arrangements are confirmed before booking.",
    transport: "Intercity transfers and sightseeing transport as specified in the confirmed itinerary.",
    mealPlan: "Meals as specified in the confirmed all-inclusive tour plan; dietary preferences should be shared in advance.",
    thingsToCarry: [
      "Valid passport and required travel documents",
      "Weather-appropriate layers and comfortable walking shoes",
      "Travel adapter suitable for European sockets",
      "Personal medicines and basic travel essentials",
      "Travel insurance documents, if arranged separately"
    ]
  }
};

const TourDetailsModal = ({ tour, onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!tour) return null;

  // Prefer API package fields; fall back to curated defaults by title
  const fallback = defaultTourData[tour.title] || {
    duration: "7 Days / 6 Nights",
    destinations: [tour.title, "Local Highlights", "Scenic Viewpoints", "Cultural Landmarks"],
    highlights: [
      "Guided tour of iconic landmarks and heritage sites",
      "Handpicked 3-Star deluxe stay with top hospitality",
      "Delicious local and traditional meals provided daily",
      "Hassle-free transfers in modern AC vehicles",
      "Dedicated tour manager for 24/7 assistance"
    ],
    itinerary: [
      { day: "Day 1", title: `Arrival & Welcome to ${tour.title}`, desc: `Arrive at the destination airport/station. Meet our local representative and transfer to your hotel. Relax and enjoy a welcome evening.` },
      { day: "Day 2", title: "Full Day Guided City Tour & Highlights", desc: `After breakfast, explore famous tourist spots, historic monuments, and scenic viewpoints of ${tour.title}.` },
      { day: "Day 3", title: "Excursion to Scenic Valleys & Attractions", desc: "Enjoy an exciting day trip to surrounding natural attractions, lakes, and famous spots. Evening leisure time for local markets." },
      { day: "Day 4", title: "Cultural Experience & Local Cuisine", desc: "Experience the authentic local culture, traditional performances, and sample famous regional delicacies." },
      { day: "Day 5", title: "Leisure & Shopping Excursion", desc: "Visit local bazaars to shop for souvenirs, handicrafts, and specialty goods." },
      { day: "Day 6", title: "Final Exploration & Departure", desc: "Enjoy breakfast, check out from hotel, and transfer to airport/station for your return journey with fond memories." }
    ],
    inclusions: [
      "Accommodation in deluxe 3-Star hotels/resorts",
      "Daily Breakfast & Dinner",
      "All transfers & sightseeing in AC vehicle",
      "Tour Manager assistance throughout the trip",
      "All driver allowances, toll & parking charges"
    ],
    exclusions: [
      tour.note || "Flight / Train tickets extra",
      "Personal expenses like laundry, phone calls, tips",
      "Any adventure activity or optional entry fees",
      "GST / Govt tax if applicable"
    ],
    accommodation: "3-Star Deluxe Hotels & Resorts (Double/Triple Sharing Rooms)",
    transport: "Clean AC Vehicle (Sedan / SUV / Tempo Traveler depending on group size)",
    mealPlan: "Daily Morning Breakfast & Evening Dinner",
    thingsToCarry: [
      "Original Govt ID Proof (Aadhaar / Voter ID / Passport)",
      "Season-appropriate clothing (Cotton / Thermals)",
      "Comfortable walking shoes & sandals",
      "Sunscreen lotion, sunglasses & basic toiletries",
      "Personal medications & camera"
    ]
  };

  const customInfo = {
    ...fallback,
    duration: tour.duration || fallback.duration,
    destinations: tour.destination
      ? String(tour.destination).split(/,| & /).map((d) => d.trim()).filter(Boolean)
      : fallback.destinations,
    highlights: Array.isArray(tour.highlights) && tour.highlights.length > 0
      ? tour.highlights
      : fallback.highlights,
    inclusions: Array.isArray(tour.inclusions) && tour.inclusions.length > 0
      ? tour.inclusions
      : fallback.inclusions,
    exclusions: Array.isArray(tour.exclusions) && tour.exclusions.length > 0
      ? tour.exclusions
      : fallback.exclusions,
  };

  const formattedPrice = typeof tour.price === 'number' ? `₹${tour.price.toLocaleString('en-IN')}/-` : tour.price;
  const emiDetails = getEmiDetails(tour.price);

  const faqs = [
    { q: "Is vegetarian food available during the tour?", a: "Yes! We make special arrangements for pure vegetarian and regional meals throughout the trip. Special dietary requirements can be requested in advance." },
    { q: "What type of accommodation is provided?", a: "We provide well-maintained, clean, 3-Star Deluxe hotels and resorts with modern amenities, attached bathrooms, and AC facilities." },
    { q: "Are train or flight tickets included in the price?", a: tour.note ? tour.note : "Price is for the land package. Flight/Train tickets can be arranged upon request at actual charges." },
    { q: "How can I book this tour package?", a: "You can click the 'Book Now' button at the bottom of this page to submit an inquiry, call us directly at +91 97638 76734 or +91 70582 55525, or message us on WhatsApp!" },
    { q: "What is the cancellation & refund policy?", a: "Cancellations made 30+ days prior to departure receive a 90% refund. 15-30 days prior receives 50% refund. Cancellations under 15 days are non-refundable but transferable to future dates based on terms." }
  ];

  const handleBookNowClick = () => {
    const event = new CustomEvent("select-package", {
      detail: { title: tour.title, date: tour.date }
    });
    window.dispatchEvent(event);
    onClose();
    scrollToSection("contact");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-ink/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden border border-line">
        
        {/* Top Header Bar */}
        <div className="sticky top-0 z-30 bg-ink text-white px-6 py-4 flex items-center justify-between border-b border-white/10 shadow-md">
          <div className="flex items-center gap-3">
            <span className="bg-brand text-white text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              {tour.type || "Tour Package"}
            </span>
            <h2 className="text-lg sm:text-xl font-bold truncate max-w-md">{tour.title}</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
            aria-label="Close details"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Main Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-10 text-ink">

          {/* Hero Banner Section */}
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-lg group">
            <img
              src={tour.image}
              alt={tour.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold">
                  📅 {tour.date}{tour.year ? ` (${tour.year})` : ""}
                </span>
                <span className="bg-palm/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">
                  ⏱️ {customInfo.duration}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold mb-2 drop-shadow-md">{tour.title}</h1>
              <p className="text-white/85 text-sm sm:text-base max-w-2xl leading-relaxed">
                {tour.description}
              </p>
            </div>

            <div className="absolute top-4 right-4 bg-brand text-white px-5 py-2 rounded-2xl font-black text-xl shadow-xl">
              {formattedPrice}
            </div>
          </div>

          {/* Quick Info Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-sunset-soft border border-sunset/25 p-4 rounded-2xl text-center">
              <span className="text-2xl block mb-1">⏱️</span>
              <span className="text-xs text-sunset font-bold uppercase block">Duration</span>
              <span className="text-sm font-extrabold text-ink">{customInfo.duration}</span>
            </div>
            <div className="bg-sky-soft border border-sky/25 p-4 rounded-2xl text-center">
              <span className="text-2xl block mb-1">🗓️</span>
              <span className="text-xs text-sky-dark font-bold uppercase block">Travel Dates</span>
              <span className="text-sm font-extrabold text-ink">{tour.date}</span>
            </div>
            <div className="bg-brand-soft border border-brand/20 p-4 rounded-2xl text-center">
              <span className="text-2xl block mb-1">💰</span>
              <span className="text-xs text-brand font-bold uppercase block">Tour Price</span>
              <span className="text-sm font-extrabold text-ink">{formattedPrice}</span>
            </div>
            <div className="bg-palm-soft border border-palm/25 p-4 rounded-2xl text-center">
              <span className="text-2xl block mb-1">🏨</span>
              <span className="text-xs text-palm font-bold uppercase block">Stay Category</span>
              <span className="text-sm font-extrabold text-ink">3-Star Deluxe</span>
            </div>
          </div>

          {emiDetails && (
            <div className="flex flex-col gap-1 rounded-2xl border border-brand/20 bg-brand-soft px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-extrabold text-ink">Flexible EMI option</p>
                <p className="mt-1 text-xs text-muted">
                  Approx. {emiDetails.formattedMonthlyAmount} × {emiDetails.installments} installments
                </p>
              </div>
              <p className="text-xs font-medium text-brand">
                Installment plan is subject to confirmation.
              </p>
            </div>
          )}

          {/* Nav Tabs */}
          <div className="flex border-b border-line overflow-x-auto gap-2 scrollbar-none pb-1">
            {[
              { id: "overview", label: "Overview & Highlights" },
              { id: "itinerary", label: "Day-wise Itinerary" },
              { id: "inclusions", label: "Inclusions / Exclusions" },
              { id: "details", label: "Stay & Transport" },
              { id: "carry", label: "Things to Carry" },
              { id: "faqs", label: "FAQs & Policy" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-brand text-white shadow-md"
                    : "bg-cream text-muted hover:bg-sand"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Section 1: Overview & Highlights */}
          {(activeTab === "overview" || activeTab === "all") && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-ink mb-3 flex items-center gap-2">
                  <span className="text-sunset">🌟</span> Tour Overview & Highlights
                </h3>
                <p className="text-muted leading-relaxed mb-4">
                  {tour.description} This meticulously planned package brings you the finest travel experience with expert tour management, comfortable stay, delicious meals, and seamless sightseeing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {customInfo.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-sunset-soft border border-sunset/20 p-3.5 rounded-2xl">
                      <span className="text-sunset font-bold">✓</span>
                      <span className="text-sm font-semibold text-ink">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Destinations Covered */}
              <div className="bg-cream border border-line p-5 rounded-2xl">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted mb-3">📍 Destinations Covered</h4>
                <div className="flex flex-wrap gap-2">
                  {customInfo.destinations.map((dest, idx) => (
                    <span key={idx} className="bg-white border border-line text-ink font-semibold text-xs px-3 py-1.5 rounded-full shadow-sm">
                      {dest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Complete Day-Wise Itinerary */}
          {(activeTab === "itinerary" || activeTab === "all") && (
            <div>
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="text-sky">🗺️</span> Complete Day-Wise Itinerary
              </h3>
              <div className="space-y-4 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-sky/30">
                {customInfo.itinerary.map((item, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-sky-dark text-white flex items-center justify-center font-extrabold text-xs shadow-md">
                      {idx + 1}
                    </div>
                    <div className="bg-white border border-line p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-xs font-extrabold text-brand uppercase tracking-wider block mb-1">
                        {item.day}
                      </span>
                      <h4 className="text-base font-bold text-ink mb-2">{item.title}</h4>
                      <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Inclusions & Exclusions */}
          {(activeTab === "inclusions" || activeTab === "all") && (
            <div>
              <h3 className="text-xl font-bold text-ink mb-6 flex items-center gap-2">
                <span className="text-palm">📋</span> Inclusions & Exclusions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions */}
                <div className="bg-palm-soft border border-palm/25 p-5 rounded-2xl">
                  <h4 className="text-palm font-bold text-base mb-4 flex items-center gap-2">
                    <span>✅</span> Package Inclusions
                  </h4>
                  <ul className="space-y-2.5">
                    {customInfo.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted font-medium">
                        <span className="text-palm font-bold mt-0.5">✓</span>
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Exclusions */}
                <div className="bg-brand-soft border border-brand/20 p-5 rounded-2xl">
                  <h4 className="text-brand font-bold text-base mb-4 flex items-center gap-2">
                    <span>❌</span> Package Exclusions
                  </h4>
                  <ul className="space-y-2.5">
                    {customInfo.exclusions.map((exc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted font-medium">
                        <span className="text-brand font-bold mt-0.5">✕</span>
                        <span>{exc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Section 4: Stay & Transport Details */}
          {(activeTab === "details" || activeTab === "all") && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <span className="text-gold-deep">🏨</span> Accommodation, Transport & Meals
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-line p-5 rounded-2xl shadow-sm">
                  <span className="text-3xl block mb-2">🏨</span>
                  <h4 className="font-bold text-ink text-sm mb-1">Accommodation Details</h4>
                  <p className="text-xs text-muted leading-relaxed">{customInfo.accommodation}</p>
                </div>
                <div className="bg-white border border-line p-5 rounded-2xl shadow-sm">
                  <span className="text-3xl block mb-2">🚘</span>
                  <h4 className="font-bold text-ink text-sm mb-1">Transportation Details</h4>
                  <p className="text-xs text-muted leading-relaxed">{customInfo.transport}</p>
                </div>
                <div className="bg-white border border-line p-5 rounded-2xl shadow-sm">
                  <span className="text-3xl block mb-2">🍽️</span>
                  <h4 className="font-bold text-ink text-sm mb-1">Meal Plan</h4>
                  <p className="text-xs text-muted leading-relaxed">{customInfo.mealPlan}</p>
                </div>
              </div>
            </div>
          )}

          {/* Section 5: Things to Carry */}
          {(activeTab === "carry" || activeTab === "all") && (
            <div>
              <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                <span className="text-gold-deep">🎒</span> Things to Carry (Packing Checklist)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {customInfo.thingsToCarry.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-sunset-soft border border-gold/30 p-3.5 rounded-xl text-xs sm:text-sm font-semibold text-ink">
                    <span className="text-gold-deep font-bold">📌</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 6: FAQs, Terms & Cancellation Policy */}
          {(activeTab === "faqs" || activeTab === "all") && (
            <div className="space-y-8">
              {/* FAQs */}
              <div>
                <h3 className="text-xl font-bold text-ink mb-4 flex items-center gap-2">
                  <span className="text-sky">❓</span> Frequently Asked Questions (FAQs)
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <div key={idx} className="border border-line rounded-2xl overflow-hidden bg-white">
                      <button
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left px-5 py-3.5 flex items-center justify-between font-bold text-xs sm:text-sm text-ink hover:bg-cream cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <span className="text-brand text-lg">{openFaq === idx ? "−" : "+"}</span>
                      </button>
                      {openFaq === idx && (
                        <div className="px-5 pb-4 text-xs sm:text-sm text-muted leading-relaxed border-t border-line pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="bg-cream border border-line p-5 rounded-2xl">
                <h4 className="font-bold text-ink text-sm mb-2">📜 Terms & Cancellation Policy</h4>
                <p className="text-xs text-muted leading-relaxed">
                  30+ days prior to departure: 90% refund. 15-30 days prior: 50% refund. Less than 15 days: Non-refundable but transferable to future dates. Valid government photo ID is mandatory for all travelers.
                </p>
              </div>
            </div>
          )}

          {/* Contact Information for Inquiries */}
          <div className="bg-gradient-to-r from-brand-dark to-brand text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-extrabold mb-1">Have Questions About This Tour?</h4>
              <p className="text-xs text-white/80">Our travel experts are ready to assist you round the clock.</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs font-semibold text-gold">
                <span>📞 {contactInfo.phones[0]}</span>
                <span>✉️ {contactInfo.email}</span>
              </div>
            </div>
            <a
              href={`https://wa.me/${contactInfo.whatsapp}?text=Hi,%20I%20am%20interested%20in%20the%20${encodeURIComponent(tour.title)}%20(${encodeURIComponent(tour.date)})`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-palm hover:bg-palm-dark text-white font-bold text-xs flex items-center gap-2 shadow-lg shrink-0 transition-transform hover:scale-105"
            >
              💬 WhatsApp Inquiry
            </a>
          </div>

          {/* PROMINENT BOOK NOW BUTTON AT THE BOTTOM AFTER ALL DETAILS */}
          <div className="pt-6 border-t border-line text-center space-y-3">
            <p className="text-xs text-muted font-semibold uppercase tracking-wider">
              Ready for an unforgettable adventure?
            </p>
            <button
              onClick={handleBookNowClick}
              className="w-full sm:w-auto min-w-[280px] bg-brand hover:bg-brand-dark text-white font-extrabold text-lg px-10 py-4 rounded-full shadow-2xl shadow-brand/35 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Book Now 🚀
            </button>
            <p className="text-xs text-muted">
              * Click to proceed with your booking & reserve your seats
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TourDetailsModal;
