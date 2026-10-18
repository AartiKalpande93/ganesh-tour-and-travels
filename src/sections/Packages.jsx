import { useState, useMemo, useEffect } from "react";
import SectionTitle from "../components/SectionTitle";
import PackageCard from "../components/PackageCard";
import TourDetailsModal from "../components/TourDetailsModal";
import { fetchPackages } from "../api/packages";
import { useLanguage } from "../context/useLanguage";
import { seedPackages } from "../../backend/src/seed/packages.js";
import { comparePackages } from "../../backend/src/utils/packageOrder.js";

const localPackages = seedPackages.map((pkg, index) => ({
  ...pkg,
  id: `seed-${index}`,
}));

const FAMILY_PATTERN = /kerala|rajasthan|rajsthan|gujarat|himachal|andaman|kashmir/i;
const MONTH_NUMBERS = {
  JAN: 1,
  FEB: 2,
  MAR: 3,
  APR: 4,
  MAY: 5,
  JUN: 6,
  JUL: 7,
  AUG: 8,
  SEP: 9,
  OCT: 10,
  NOV: 11,
  DEC: 12,
};

const getDepartureMonth = (date) => {
  const monthName = String(date || "").match(
    /\b(JAN(?:UARY)?|FEB(?:RUARY)?|MAR(?:CH)?|APR(?:IL)?|MAY|JUN(?:E)?|JUL(?:Y)?|AUG(?:UST)?|SEP(?:TEMBER)?|OCT(?:OBER)?|NOV(?:EMBER)?|DEC(?:EMBER)?)\b/i
  )?.[0];
  return monthName ? MONTH_NUMBERS[monthName.slice(0, 3).toUpperCase()] : null;
};

const parseDays = (duration) => {
  const match = String(duration || "").match(/(\d+)/);
  return match ? Number(match[1]) : null;
};

const matchesDuration = (duration, key) => {
  if (!key) return true;
  const days = parseDays(duration);
  if (!days) return true;
  const ranges = {
    "2-3": [2, 3],
    "4-7": [4, 7],
    "8-12": [8, 12],
    "13+": [13, 365],
  };
  const [min, max] = ranges[key] || [0, 999];
  return days >= min && days <= max;
};

const matchesBudget = (price, key) => {
  if (!key) return true;
  const ranges = {
    "20-35": [20000, 34999],
    "35-50": [35000, 49999],
    "50-100": [50000, 99999],
    "100+": [100000, Infinity],
  };
  const [min, max] = ranges[key] || [0, Infinity];
  return price >= min && price <= max;
};

const Packages = () => {
  const { lang } = useLanguage();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeSeason, setActiveSeason] = useState("all");
  const [activeType, setActiveType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedTour, setSelectedTour] = useState(null);
  const [durationKey, setDurationKey] = useState("");
  const [budgetKey, setBudgetKey] = useState("");
  const [familyOnly, setFamilyOnly] = useState(false);
  const [isDestinationMenuOpen, setIsDestinationMenuOpen] = useState(false);

  const loadPackages = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetchPackages();
      const live = Array.isArray(response.data) ? response.data : [];
      setPackages(live.length > 0 ? live : localPackages);
    } catch {
      setPackages(localPackages);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPackages();
  }, []);

  useEffect(() => {
    const applySearch = (detail) => {
      if (!detail) {
        setSearchQuery("");
        setActiveType("All");
        setActiveSeason("all");
        setDurationKey("");
        setBudgetKey("");
        setFamilyOnly(false);
        return;
      }

      setSearchQuery(detail.destination || "");
      setActiveSeason("all");
      setActiveType(detail.type && detail.type !== "All" ? detail.type : "All");
      setFamilyOnly(detail.category === "family");
      setDurationKey(detail.duration || "");
      setBudgetKey(detail.budget || "");
    };

    const onSearch = (event) => applySearch(event.detail);
    window.addEventListener("hero-search", onSearch);
    if (window.__heroSearch) applySearch(window.__heroSearch);
    return () => window.removeEventListener("hero-search", onSearch);
  }, []);

  useEffect(() => {
    const handleViewTourDetails = (e) => {
      if (e.detail) {
        setSelectedTour(e.detail);
      }
    };
    window.addEventListener("view-tour-details", handleViewTourDetails);
    return () => window.removeEventListener("view-tour-details", handleViewTourDetails);
  }, []);

  const seasons = [
    { id: "all", label: "All Seasons" },
    { id: "jan-may", label: "Jan - May" },
    { id: "jun-sep", label: "June - Sep" },
    { id: "oct-dec", label: "Oct - Dec" },
  ];
  const types = ["All", "Domestic", "International", "Pilgrimage"];
  const destinationOptions = useMemo(() => {
    const destinations = new Map();

    packages.forEach((pkg) => {
      [pkg.destination, pkg.title]
        .filter(Boolean)
        .flatMap((value) => [value, ...value.split(/[,&/]+/)])
        .map((value) => value.replace(/\s+Tour$/i, "").trim())
        .filter((value) => value.length > 1)
        .forEach((value) => {
          const key = value.toLocaleLowerCase();
          if (!destinations.has(key)) destinations.set(key, value);
        });
    });

    return [...destinations.values()].sort((a, b) => a.localeCompare(b));
  }, [packages]);
  const matchingDestinationOptions = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase();
    return destinationOptions.filter((destination) => !query || destination.toLocaleLowerCase().includes(query));
  }, [destinationOptions, searchQuery]);

  const filteredAndSortedPackages = useMemo(() => {
    let result = [...packages];

    if (activeSeason !== "all") {
      result = result.filter((pkg) => {
        const month = getDepartureMonth(pkg.date);
        if (!month) return false;
        if (activeSeason === "jan-may") return month >= 1 && month <= 5;
        if (activeSeason === "jun-sep") return month >= 6 && month <= 9;
        return month >= 10 && month <= 12;
      });
    }

    if (familyOnly) {
      result = result.filter((pkg) =>
        FAMILY_PATTERN.test(`${pkg.title} ${pkg.destination} ${pkg.description}`)
      );
    } else if (activeType !== "All") {
      result = result.filter((pkg) => pkg.type === activeType);
    }

    if (durationKey) {
      result = result.filter((pkg) => matchesDuration(pkg.duration, durationKey));
    }

    if (budgetKey) {
      result = result.filter((pkg) => matchesBudget(pkg.price, budgetKey));
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.title?.toLowerCase().includes(query) ||
          pkg.description?.toLowerCase().includes(query) ||
          pkg.destination?.toLowerCase().includes(query) ||
          pkg.note?.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "alphabetical") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      result.sort(comparePackages);
    }

    return result;
  }, [packages, activeSeason, activeType, searchQuery, sortBy, durationKey, budgetKey, familyOnly]);

  useEffect(() => {
    setVisibleCount(6);
  }, [activeSeason, activeType, searchQuery, sortBy, durationKey, budgetKey, familyOnly]);

  return (
    <section id="packages" className="scroll-mt-24 py-20 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sky/15 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow={lang === "mr" ? "टूर पॅकेजेस" : "Tour packages"}
          title={lang === "mr" ? "येणाऱ्या ग्रुप डेपार्चर्स" : "Upcoming group departures"}
          subtitle={
            lang === "mr"
              ? "येत्या हंगामातील ठरलेल्या तारखांच्या सहली. कालावधी किंवा प्रकार निवडा आणि पॅकेज उघडा."
              : "Fixed-date tours for the coming season. Filter by period or type, then open a package to see what is included."
          }
        />

        <div className="bg-white rounded-3xl p-6 shadow-xl border border-line mb-12 space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:max-w-md">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted text-lg">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search packages, destinations (e.g. Dubai, Thailand,Kerala)..."
                value={searchQuery}
                onFocus={() => setIsDestinationMenuOpen(true)}
                onBlur={() => window.setTimeout(() => setIsDestinationMenuOpen(false), 120)}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsDestinationMenuOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsDestinationMenuOpen(false);
                }}
                aria-autocomplete="list"
                aria-expanded={isDestinationMenuOpen && matchingDestinationOptions.length > 0}
                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-line bg-white text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand transition-all text-sm"
              />
              {isDestinationMenuOpen && matchingDestinationOptions.length > 0 && (
                <ul
                  role="listbox"
                  className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-line bg-white py-1 text-ink shadow-xl"
                >
                  {matchingDestinationOptions.map((destination) => (
                    <li key={destination} role="option" aria-selected={searchQuery === destination}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          setSearchQuery(destination);
                          setIsDestinationMenuOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm transition hover:bg-cream focus:bg-cream focus:outline-none"
                      >
                        {destination}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted hover:text-ink cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto items-stretch sm:items-center">
              <div className="flex items-center gap-2 bg-cream border border-line rounded-2xl px-4 py-2">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-sm font-semibold text-ink focus:outline-none cursor-pointer"
                >
                  <option value="default">Featured order</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="alphabetical">A to Z Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          <hr className="border-line" />

          <div className="space-y-4">
            <div>
              <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-2.5">
                Filter by Season / Period
              </span>
              <div className="flex flex-wrap gap-2">
                {seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => {
                      setActiveSeason(season.id);
                      setFamilyOnly(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      activeSeason === season.id
                        ? "bg-brand text-white shadow-md shadow-brand/25 border border-brand"
                        : "bg-cream hover:bg-sand text-muted border border-line"
                    }`}
                  >
                    {season.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-bold text-muted uppercase tracking-wider mb-2.5">
                Filter by Tour Type
              </span>
              <div className="flex flex-wrap gap-2">
                {types.map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setActiveType(t);
                      setFamilyOnly(false);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                      activeType === t
                        ? "bg-sky-dark text-white shadow-md shadow-sky/25 border border-sky-dark"
                        : "bg-cream hover:bg-sand text-muted border border-line"
                    }`}
                  >
                    {t === "All" ? "All Types" : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-line shadow-md">
            <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-line border-t-brand" />
            <h3 className="text-xl font-bold text-ink mb-2">Loading tour packages...</h3>
            <p className="text-muted">Please wait while we fetch the latest packages.</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-brand/20 shadow-md">
            <span className="text-5xl block mb-4">⚠️</span>
            <h3 className="text-xl font-bold text-ink mb-2">Unable to load packages</h3>
            <p className="text-muted max-w-md mx-auto mb-6">{error}</p>
            <button
              onClick={loadPackages}
              className="bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3.5 rounded-full shadow-lg cursor-pointer"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted text-sm">
                Showing <span className="font-bold text-ink">{Math.min(filteredAndSortedPackages.length, visibleCount)}</span> of <span className="font-bold text-ink">{filteredAndSortedPackages.length}</span> tour packages
              </p>
            </div>

            {filteredAndSortedPackages.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredAndSortedPackages.slice(0, visibleCount).map((pkg) => (
                    <PackageCard
                      key={pkg.id || pkg._id || `${pkg.title}-${pkg.date}`}
                      {...pkg}
                      onViewDetails={(tourData) => setSelectedTour(tourData)}
                    />
                  ))}
                </div>

                {visibleCount < filteredAndSortedPackages.length && (
                  <div className="mt-12 text-center">
                    <button
                      onClick={() => setVisibleCount((prev) => prev + 6)}
                      className="bg-brand hover:bg-brand-dark text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-brand/25 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                    >
                      Load More Packages
                    </button>
                  </div>
                )}
              </>
            ) : packages.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-line shadow-md">
                <span className="text-5xl block mb-4">🧳</span>
                <h3 className="text-xl font-bold text-ink mb-2">No packages available yet</h3>
                <p className="text-muted max-w-md mx-auto">
                  Tour packages will appear here once they are added. Please check back soon.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-line shadow-md">
                <span className="text-5xl block mb-4">🔍</span>
                <h3 className="text-xl font-bold text-ink mb-2">No tour packages found</h3>
                <p className="text-muted max-w-md mx-auto">
                  We couldn't find any packages matching your filter criteria. Try adjusting your search query or selecting a different season.
                </p>
                <button
                  onClick={() => {
                    setActiveSeason("all");
                    setActiveType("All");
                    setSearchQuery("");
                    setSortBy("default");
                    setDurationKey("");
                    setBudgetKey("");
                    setFamilyOnly(false);
                    window.__heroSearch = null;
                  }}
                  className="mt-6 text-brand font-bold hover:underline cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </>
        )}

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
