import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PGCard } from "@/components/pg/PGCard";
import { Button } from "@/components/ui/button";
import { mockPGs } from "@/data/mockPGs";

export function FeaturedPGs() {
  const featuredPGs = mockPGs.filter((pg) => pg.featured).slice(0, 6);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Featured <span className="text-primary">PGs</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Hand-picked accommodations with the best ratings and amenities
            </p>
          </div>
          <Link to="/search">
            <Button variant="outline" className="gap-2">
              View All PGs
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPGs.map((pg, index) => (
            <PGCard key={pg.id} pg={pg} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}