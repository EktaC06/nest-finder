import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, TrendingUp, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  { icon: TrendingUp, text: "Increase occupancy rates" },
  { icon: Users, text: "Reach verified tenants" },
  { icon: Shield, text: "Secure payments" },
];

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-secondary text-secondary-foreground relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              <Building2 className="h-4 w-4" />
              For PG Owners & Brokers
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              List Your Property & Earn More
            </h2>

            <p className="text-lg text-secondary-foreground/80 mb-8 max-w-lg">
              Join thousands of property owners who trust PGFinder to connect them with quality tenants. 
              Get verified leads, secure payments, and hassle-free management.
            </p>

            <div className="flex flex-wrap gap-6 mb-8">
              {benefits.map((benefit) => (
                <div key={benefit.text} className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <benefit.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-medium">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/auth?role=owner">
                <Button variant="hero" size="lg">
                  List Your PG Free
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button variant="hero-outline" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card rounded-2xl p-8 shadow-xl text-foreground">
              <div className="text-center mb-8">
                <div className="text-5xl font-bold text-primary mb-2">₹50,000+</div>
                <div className="text-muted-foreground">Average monthly earnings</div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                  <span className="text-muted-foreground">Properties Listed</span>
                  <span className="font-bold text-lg">15,000+</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                  <span className="text-muted-foreground">Active Owners</span>
                  <span className="font-bold text-lg">8,500+</span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-muted">
                  <span className="text-muted-foreground">Bookings Monthly</span>
                  <span className="font-bold text-lg">25,000+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}