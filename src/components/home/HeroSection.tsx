import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";

export function HeroSection() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?location=${encodeURIComponent(location)}`);
  };

  const quickFilters = [
    { label: "Boys", icon: "👨" },
    { label: "Girls", icon: "👩" },
    { label: "Co-ed", icon: "👥" },
    { label: "Under ₹8k", icon: "💰" },
    { label: "With Food", icon: "🍽️" },
    { label: "Near Metro", icon: "🚇" },
  ];

  const stats = [
    { value: "50K+", label: "Verified PGs" },
    { value: "100+", label: "Cities" },
    { value: "1M+", label: "Happy Tenants" },
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Modern PG living space"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
      </div>

      <div className="container relative z-10 py-16 md:py-24">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              Trusted by 1M+ students & professionals
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary-foreground leading-tight mb-6">
              Find Your Perfect{" "}
              <span className="text-primary">PG Stay</span>{" "}
              in Minutes
            </h1>

            <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-xl">
              Discover verified paying guest accommodations with transparent pricing, 
              real photos, and instant booking.
            </p>
          </motion.div>

          {/* Search Box */}
          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card rounded-2xl p-3 shadow-xl mb-8"
          >
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by city, locality, or college..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-12 h-14 border-0 bg-muted/50 text-base"
                />
              </div>
              <Button type="submit" size="xl" variant="hero" className="gap-2">
                <Search className="h-5 w-5" />
                Search PGs
              </Button>
            </div>
          </motion.form>

          {/* Quick Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-2 mb-12"
          >
            {quickFilters.map((filter) => (
              <button
                key={filter.label}
                onClick={() => navigate(`/search?filter=${filter.label.toLowerCase()}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-secondary-foreground/10 text-secondary-foreground text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-8"
          >
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-secondary-foreground">
                  {stat.value}
                </div>
                <div className="text-sm text-secondary-foreground/60">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}