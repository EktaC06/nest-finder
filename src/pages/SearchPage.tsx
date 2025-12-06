import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, SlidersHorizontal, MapPin, X, ChevronDown,
  Grid3X3, List, ArrowUpDown
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PGCard } from "@/components/pg/PGCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { mockPGs, PGListing } from "@/data/mockPGs";
import { cn } from "@/lib/utils";

const filters = {
  type: ["Boys", "Girls", "Co-ed"],
  sharing: ["Single", "Double", "Triple", "4+ Sharing"],
  amenities: ["WiFi", "AC", "Food Included", "Laundry", "Power Backup", "CCTV", "Gym", "Parking"],
  sortBy: ["Price: Low to High", "Price: High to Low", "Rating", "Newest"],
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([3000, 25000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("location") || "");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Rating");

  const [filteredPGs, setFilteredPGs] = useState<PGListing[]>(mockPGs);

  useEffect(() => {
    let result = [...mockPGs];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pg) =>
          pg.name.toLowerCase().includes(query) ||
          pg.locality.toLowerCase().includes(query) ||
          pg.city.toLowerCase().includes(query)
      );
    }

    // Filter by type
    if (selectedTypes.length > 0) {
      result = result.filter((pg) =>
        selectedTypes.some((type) => type.toLowerCase() === pg.type || (type === "Co-ed" && pg.type === "coed"))
      );
    }

    // Filter by price
    result = result.filter((pg) => pg.minPrice >= priceRange[0] && pg.minPrice <= priceRange[1]);

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      result = result.filter((pg) =>
        selectedAmenities.every(
          (amenity) =>
            pg.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase())) ||
            (amenity === "Food Included" && pg.foodIncluded)
        )
      );
    }

    // Sort
    switch (sortBy) {
      case "Price: Low to High":
        result.sort((a, b) => a.minPrice - b.minPrice);
        break;
      case "Price: High to Low":
        result.sort((a, b) => b.minPrice - a.minPrice);
        break;
      case "Rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredPGs(result);
  }, [searchQuery, selectedTypes, priceRange, selectedAmenities, sortBy]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedAmenities([]);
    setPriceRange([3000, 25000]);
    setSearchQuery("");
  };

  const activeFiltersCount = selectedTypes.length + selectedAmenities.length + (priceRange[0] !== 3000 || priceRange[1] !== 25000 ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <div className="sticky top-16 z-40 bg-card border-b shadow-sm">
          <div className="container py-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search Input */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by city, locality, college..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12"
                />
              </div>

              {/* Filter Toggle */}
              <Button
                variant={showFilters ? "default" : "outline"}
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>

              {/* Sort */}
              <div className="relative">
                <Button variant="outline" size="lg" className="gap-2">
                  <ArrowUpDown className="h-4 w-4" />
                  Sort: {sortBy}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              {/* View Toggle */}
              <div className="hidden md:flex items-center gap-1 bg-muted rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "grid" ? "bg-card shadow-sm" : "hover:bg-card/50"
                  )}
                >
                  <Grid3X3 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === "list" ? "bg-card shadow-sm" : "hover:bg-card/50"
                  )}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {selectedTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="gap-1">
                    {type}
                    <button onClick={() => toggleType(type)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedAmenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="gap-1">
                    {amenity}
                    <button onClick={() => toggleAmenity(amenity)}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {(priceRange[0] !== 3000 || priceRange[1] !== 25000) && (
                  <Badge variant="secondary" className="gap-1">
                    ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    <button onClick={() => setPriceRange([3000, 25000])}>
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="container py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <motion.aside
              initial={false}
              animate={{
                width: showFilters ? 280 : 0,
                opacity: showFilters ? 1 : 0,
              }}
              className={cn(
                "hidden md:block flex-shrink-0 overflow-hidden",
                !showFilters && "md:hidden"
              )}
            >
              <div className="bg-card rounded-xl p-6 shadow-card sticky top-40 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Filters</h3>
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Reset
                  </Button>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium mb-4">Price Range</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={3000}
                    max={25000}
                    step={500}
                    className="mb-2"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0].toLocaleString()}</span>
                    <span>₹{priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                {/* Type */}
                <div>
                  <h4 className="font-medium mb-4">Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {filters.type.map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleType(type)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                          selectedTypes.includes(type)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        )}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h4 className="font-medium mb-4">Amenities</h4>
                  <div className="space-y-3">
                    {filters.amenities.map((amenity) => (
                      <label
                        key={amenity}
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <span className="text-sm">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* Results */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">
                  {filteredPGs.length} PGs Found
                  {searchQuery && ` for "${searchQuery}"`}
                </h1>
              </div>

              {filteredPGs.length > 0 ? (
                <div
                  className={cn(
                    "grid gap-6",
                    viewMode === "grid"
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : "grid-cols-1"
                  )}
                >
                  {filteredPGs.map((pg, index) => (
                    <PGCard key={pg.id} pg={pg} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-xl font-semibold mb-2">No PGs found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}