import { motion } from "framer-motion";
import { Shield, Droplets, Battery, Award, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Droplets,
    title: "Advanced Water Technology",
    description: "Pulsating water streams effectively remove plaque and debris from between teeth and below the gumline.",
  },
  {
    icon: Battery,
    title: "Long-Lasting Battery",
    description: "Up to 30 days of use on a single charge. Never worry about running out of power during your routine.",
  },
  {
    icon: Shield,
    title: "IPX7 Waterproof",
    description: "Fully waterproof design allows for safe use in the shower. Easy to clean and maintain.",
  },
  {
    icon: Award,
    title: "Clinically Proven",
    description: "Tested and approved by dental professionals. Proven to be 50% more effective than string flossing.",
  },
  {
    icon: Zap,
    title: "Multiple Modes",
    description: "Choose from gentle, normal, or pulse modes to customize your cleaning experience.",
  },
  {
    icon: Heart,
    title: "Gentle on Gums",
    description: "Designed with sensitive gums in mind. Our flossers provide thorough cleaning without irritation.",
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">
            Why Choose OCare
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Technology That{" "}
            <span className="text-gradient">Cares</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Every OCare product is engineered with cutting-edge technology to deliver professional-grade oral care at home.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-8 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-card transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon
                    size={28}
                    className="text-primary group-hover:text-primary-foreground transition-colors"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
