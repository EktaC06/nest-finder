import { motion } from "framer-motion";
import { Search, Building2, Calendar, Key } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search & Discover",
    description: "Browse through thousands of verified PG listings. Filter by location, budget, amenities, and more.",
  },
  {
    icon: Building2,
    title: "Explore Details",
    description: "View real photos, read reviews, check amenities, and understand the house rules before deciding.",
  },
  {
    icon: Calendar,
    title: "Schedule a Visit",
    description: "Book a visit to see the property in person. Meet the owner and check the facilities.",
  },
  {
    icon: Key,
    title: "Book & Move In",
    description: "Complete the booking online with secure payment. Get your move-in date confirmed instantly.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Finding your perfect PG is just 4 simple steps away
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
                </div>
              )}

              {/* Step number */}
              <div className="relative inline-flex mb-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-10 w-10 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}