import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Products } from "@/components/home/Products";
import { Features } from "@/components/home/Features";
import { CTA } from "@/components/home/CTA";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Products />
      <Features />
      <CTA />
    </Layout>
  );
};

export default Index;
