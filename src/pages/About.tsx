import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Award, Users, Target, Heart, CheckCircle } from "lucide-react";

const stats = [
  { value: "99%", label: "Customer Satisfaction" },
  { value: "24/7", label: "Customer Support" },
];

const values = [
  {
    icon: Award,
    title: "Excellence",
    description: "We are committed to delivering products of the highest quality, backed by extensive research and development.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Every decision we make starts with the question: How will this benefit our customers?",
  },
  {
    icon: Target,
    title: "Innovation",
    description: "We continuously push the boundaries of oral care technology to bring you the best solutions.",
  },
  {
    icon: Heart,
    title: "Care",
    description: "We genuinely care about your oral health and work tirelessly to help you achieve a healthier smile.",
  },
];

const milestones = [
  { year: "2018", event: "OCare founded with a mission to revolutionize oral care" },
  { year: "2019", event: "Launched our first water flosser to great acclaim" },
  { year: "2020", event: "Expanded to 5 countries across Asia" },
  { year: "2022", event: "Introduced the compact Travel Kit series" },
  { year: "2024", event: "Reached 50,000+ satisfied customers worldwide" },
  { year: "2026", event: "Launching revolutionary Electric Brushes" },
];

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">
              About OCare
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6">
              On a Mission to Create{" "}
              <span className="text-gradient">Healthier Smiles</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Founded with a vision to make professional-grade oral care accessible to everyone, 
              OCare has grown to become a trusted name in dental hygiene products across the globe.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center w-48"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                From Vision to Reality
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  OCare was born from a simple observation: quality oral care products were either 
                  too expensive or too complicated for everyday use. Our founders, a team of dental 
                  professionals and engineers, set out to change that.
                </p>
                <p>
                  Starting in a small office in Bangalore, we spent two years researching and 
                  developing our first water flosser. We consulted with dentists, tested countless 
                  prototypes, and listened to real users to create a product that truly works.
                </p>
                <p>
                  Today, OCare products are trusted by over 50,000 customers across 15 countries. 
                  But we're just getting started. Our commitment to innovation, quality, and 
                  customer satisfaction drives everything we do.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
              What Drives Us Forward
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-colors duration-300">
                  <value.icon
                    size={32}
                    className="text-primary group-hover:text-primary-foreground transition-colors"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-background/80 mb-10">
                "To make professional-grade oral care accessible, affordable, and enjoyable 
                for everyone. We believe that a healthy smile is the foundation of confidence 
                and well-being."
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  "Affordable Quality",
                  "Innovation First",
                  "Customer Focused",
                  "Sustainable Practices",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2 text-primary"
                  >
                    <CheckCircle size={20} />
                    <span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
