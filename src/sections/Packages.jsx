import { useState, useMemo, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import PackageCard from "../components/PackageCard";
import TourDetailsModal from "../components/TourDetailsModal";
import { packages } from "../data/siteData";

const Packages = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    const handleViewTourDetails = (e) => {
      if (e.detail) {
        setSelectedTour(e.detail);
      }
    };
    window.addEventListener("view-tour-details", handleViewTourDetails);
    return () => window.removeEventListener("view-tour-details", handleViewTourDetails);
  }, []);

  const categories = ["All", "September - December 2026", "New Year Tour", "January - March 2027"];
  const types = ["All", "Domestic", "International", "Pilgrimage"];

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packages];

    if (activeCategory !== "All") {
      result = result.filter((pkg) => pkg.category === activeCategory);
    }

    if (activeType !== "All") {
      result = result.filter((pkg) => pkg.type === activeType);
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(query) ||
          pkg.description.toLowerCase().includes(query) ||
          pkg.note.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [activeCategory, activeType, searchQuery, sortBy]);

  useMemo(() => {
    setVisibleCount(6);
  }, [activeCategory, activeType, searchQuery, sortBy]);

  return (
    <section id="packages" className="py-20 bg-[#FFF8E7]/50 relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tours of 2026-27"
          subtitle="Explore our comprehensive 1-year tour packages. Plan your dream vacation with complete peace of mind."
        />

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100 mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-lg">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search packages, destinations (e.g. Dubai)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
              <div className="flex items-center gap-2 bg-[#F8FAFC] border border-slate-200 rounded-2xl px-4 py-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-sm font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="default">Flyer Order (Date)</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="alphabetical">A to Z Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Filter by Season / Period
              </span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#F97316] text-white shadow-md shadow-[#F97316]/20 border border-[#F97316]"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                    }`}
                  >
                    {cat === "All" ? "All Seasons" : cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Filter by Tour Type
              </span>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveType(t)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      activeType === t
                        ? "bg-[#0369A1] text-white shadow-md shadow-[#0369A1]/20 border border-[#0369A1]"
                        : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
                    }`}
                  >
                    {t === "All" ? "All Types" : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <p className="text-slate-500 text-sm">
            Showing <span className="font-bold text-[#0F172A]">{Math.min(filteredAndSortedPackages.length, visibleCount)}</span> of <span className="font-bold text-[#0F172A]">{filteredAndSortedPackages.length}</span> tour packages
          </p>
        </div>

        {filteredAndSortedPackages.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAndSortedPackages.slice(0, visibleCount).map((pkg) => (
                <PackageCard
                  key={`${pkg.title}-${pkg.date}`}
                  {...pkg}
                  onViewDetails={(tourData) => setSelectedTour(tourData)}
                />
              ))}
            </div>

            {visibleCount < filteredAndSortedPackages.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                  className="bg-[#0369A1] hover:bg-[#025a8b] text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-sky-700/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                >
                  Load More Packages
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-md">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No tour packages found</h3>
            <p className="text-slate-500 max-w-md mx-auto">
              We couldn't find any packages matching your filter criteria. Try adjusting your search query or selecting a different season.
            </p>
            <button
              onClick={() => {
                setActiveCategory("All");
                setActiveType("All");
                setSearchQuery("");
                setSortBy("default");
              }}
              className="mt-6 text-[#F97316] font-bold hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Dedicated Tour Details Page Overlay / Modal */}
        {selectedTour && (
          <TourDetailsModal
            tour={selectedTour}
            onClose={() => setSelectedTour(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Packages;
