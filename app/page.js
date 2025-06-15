"use client";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Stats from "./components/Stats";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import CTASection from "./components/CTASection";
import ProductComponent from "./components/ProductComponent";

export default function Home() {
  return (
    <main>
      {/* <ProductComponent /> */}
      <Hero />
      <Services />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTASection />
    </main>
  );
}
