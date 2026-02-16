import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Zap, Droplets, Battery } from "lucide-react";
import { Button } from "@/components/ui/button";
import normalFlosser from "@/assets/normal-flosser.png";
import travelKit from "@/assets/travel-kit.png";

const products = [
  {
    id: 1,
    name: "Orpick Flosser",
    tagline: "Professional-Grade Cleaning",
    description: "Our flagship water flosser delivers powerful yet gentle cleaning for your entire family. With 3 pressure modes and a large reservoir, enjoy thorough cleaning without frequent refills.",
    image: normalFlosser,
    features: ["3 Pressure Modes", "Large 300ml Tank", "USB Rechargeable", "360° Rotation"],
    bgColor: "bg-gradient-to-br from-slate-100 to-slate-200",
    isUpcoming: false,
  },
  {
    id: 2,
    name: "Orpick Travel Kit",
    tagline: "Oral Care On-The-Go",
    description: "Compact, portable, and powerful. The Travel Kit comes with multiple nozzle attachments and a convenient carrying case, perfect for maintaining your routine anywhere.",
    image: travelKit,
    features: ["5 Nozzle Tips", "Compact Design", "Travel Case Included", "IPX7 Waterproof"],
    bgColor: "bg-gradient-to-br from-ocean-light to-secondary",
    isUpcoming: false,
  },
  {
    id: 3,
    name: "Electric Brushes",
    tagline: "Coming Soon",
    description: "Experience the next generation of electric toothbrushes. Advanced sonic technology with smart pressure sensors and personalized brushing modes.",
    image: null,
    features: ["Sonic Technology", "Smart Sensors", "Long Battery Life", "Multiple Heads"],
    bgColor: "bg-muted",
    isUpcoming: true,
  },
];

const featureIcons: Record<string, typeof Clock> = {
  "3 Pressure Modes": Zap,
  "Large 300ml Tank": Droplets,
  "USB Rechargeable": Battery,
  "5 Nozzle Tips": Zap,
  "Compact Design": Clock,
  "Sonic Technology": Zap,
  "Smart Sensors": Clock,
};

export const Products = () => {
  return (
    <section id="products" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Our Products
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Designed for Your{" "}
            <span className="text-gradient">Perfect Smile</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover our range of innovative dental care products, engineered with precision and designed for everyday use.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-500 h-full flex flex-col">
                {/* Image Section */}
                <div className={`relative h-72 ${product.bgColor} overflow-hidden flex items-center justify-center`}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center text-muted-foreground">
                        <Clock size={48} className="mx-auto mb-3 opacity-50" />
                        <span className="text-sm uppercase tracking-wider">Coming Soon</span>
                      </div>
                    </div>
                  )}
                  
                  {product.isUpcoming && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Upcoming
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-primary text-sm font-medium">
                    {product.tagline}
                  </span>
                  <h3 className="text-2xl font-bold mt-1 mb-3">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {product.features.slice(0, 4).map((feature) => {
                      const Icon = featureIcons[feature] || Zap;
                      return (
                        <div
                          key={feature}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Icon size={14} className="text-primary" />
                          <span>{feature}</span>
                        </div>
                      );
                    })}
                  </div>

                  {!product.isUpcoming && (
                    <Link to="/contact" className="block w-full">
                      <Button 
                        variant="outline" 
                        className="w-full group/btn"
                      >
                        Learn More
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
