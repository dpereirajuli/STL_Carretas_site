import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { FeaturedAccessories } from "@/components/home/FeaturedAccessories";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <FeaturedAccessories />
    </Layout>
  );
};

export default Index;
