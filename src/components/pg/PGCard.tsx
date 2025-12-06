import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Heart, Verified, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PGListing, amenityIcons } from "@/data/mockPGs";
import { cn } from "@/lib/utils";

interface PGCardProps {
  pg: PGListing;
  index?: number;
}

export function PGCard({ pg, index = 0 }: PGCardProps) {
  const typeVariant = pg.type === "boys" ? "boys" : pg.type === "girls" ? "girls" : "coed";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link to={`/pg/${pg.slug}`}>
        <Card hover className="overflow-hidden group">
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <img
              src={pg.images[0]}
              alt={pg.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            
            {/* Top badges */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <Badge variant={typeVariant} className="capitalize">
                {pg.type === "coed" ? "Co-ed" : pg.type}
              </Badge>
              {pg.verified && (
                <Badge variant="success" className="gap-1">
                  <Verified className="h-3 w-3" />
                  Verified
                </Badge>
              )}
            </div>

            {/* Wishlist button */}
            <button
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
              onClick={(e) => {
                e.preventDefault();
                // TODO: Add to wishlist
              }}
            >
              <Heart className="h-5 w-5 text-foreground" />
            </button>

            {/* Bottom info */}
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="flex items-center gap-1 text-primary-foreground">
                <Star className="h-4 w-4 fill-warning text-warning" />
                <span className="font-semibold">{pg.rating}</span>
                <span className="text-sm opacity-80">({pg.reviewCount})</span>
              </div>
              {pg.foodIncluded && (
                <Badge variant="accent" className="gap-1">
                  <Utensils className="h-3 w-3" />
                  Food Included
                </Badge>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                {pg.name}
              </h3>
              <div className="flex items-center gap-1 text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{pg.locality}, {pg.city}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-2 flex-wrap">
              {pg.amenities.slice(0, 4).map((amenity) => (
                <span
                  key={amenity}
                  className="text-sm px-2 py-0.5 rounded-md bg-muted text-muted-foreground"
                >
                  {amenityIcons[amenity] || "✓"} {amenity}
                </span>
              ))}
              {pg.amenities.length > 4 && (
                <span className="text-sm text-muted-foreground">
                  +{pg.amenities.length - 4} more
                </span>
              )}
            </div>

            {/* Price */}
            <div className="flex items-end justify-between pt-2 border-t">
              <div>
                <span className="text-2xl font-bold text-primary">
                  ₹{pg.minPrice.toLocaleString()}
                </span>
                <span className="text-muted-foreground text-sm">/month</span>
                {pg.minPrice !== pg.maxPrice && (
                  <span className="text-sm text-muted-foreground block">
                    to ₹{pg.maxPrice.toLocaleString()}
                  </span>
                )}
              </div>
              <Button size="sm">View Details</Button>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}