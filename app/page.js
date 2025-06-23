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
import Products from "./components/Products";
import ProductComponent from "./components/ProductComponent";
import Banner from "./components/Banner";

export default function Home() {
  const products = [
    {
      title: "Your Data. Your Control.",
      desc: `At yesbee4.ai, your business data stays private, secure, and fully under your control always.`,
      italicText: "",
      bulletPoints: [
        "No training on your data",
        "You own and manage access",
        "Compliant with MeitY & CERT-In guidelines",
      ],
      reverse: false,
    },
    {
      title: "Cashflow Planner",
      desc: `AI planner with smart alerts for collections, shortfalls, and cash position.`,
      italicText: `Stay alert. Stay ahead.`,
      reverse: true,
    },
    {
      title: "Sales Analysis",
      desc: `sales performance by branch or product with benchmarks.`,
      italicText: `Sales clarity, on demand.`,
      reverse: false,
    },
  ];

  const products2 = [
    {
      title: "Business Valuation",
      desc: `Automated valuation using DCF, market-based, and hybrid models.`,
      italicText: "Know your true worth.",
      reverse: true,
    },
    {
      title: "Financial Modeling",
      desc: `P&L, cash flow, and balance sheet forecasts — all in one place.`,
      italicText: `Plan beyond instinct.`,
      reverse: false,
    },
  ];
  const products3 = [
    {
      title: "Financial Safety",
      desc: `Instant health check using the trusted Piotroski F-Score model.`,
      italicText: "Your financial safety net.",
      reverse: false,
    },
    {
      title: "Fraud Detection",
      desc: `AI-powered detection of suspicious activity and financial anomalies.`,
      italicText: `Catch what others miss.`,
      reverse: true,
    },
  ];
  return (
    <main>
      {/* <ProductComponent /> */}
      <Hero />
      <Services />
      {products?.map(
        ({ title, desc, italicText, bulletPoints, reverse }, index) => (
          <Products
            key={index}
            title={title}
            desc={desc}
            italicText={italicText}
            bulletPoints={bulletPoints}
            reverse={reverse}
          />
        )
      )}
      <Banner />
      {products2?.map(
        ({ title, desc, italicText, bulletPoints, reverse }, index) => (
          <Products
            key={index}
            title={title}
            desc={desc}
            italicText={italicText}
            bulletPoints={bulletPoints}
            reverse={reverse}
          />
        )
      )}
      <Banner
        bg="bg-background-dark"
        buttonText="Try it free – zero friction, zero money!"
        testimonial={
          <div className="text-primary">
            <span className="font-bold text-primary">
              “What used to take 3 tools and a team of professionals now takes
              10 seconds. I couldn’t believe it.”
            </span>
          </div>
        }
      />
      {/* <WhyChooseUs /> */}
      {/* <Stats /> */}
      <Pricing />
      {products3?.map(
        ({ title, desc, italicText, bulletPoints, reverse }, index) => (
          <Products
            key={index}
            title={title}
            desc={desc}
            italicText={italicText}
            bulletPoints={bulletPoints}
            reverse={reverse}
          />
        )
      )}
      <Banner
        bg="bg-background-dark"
        buttonText="Start for FREE! Contact Us"
        testimonial={
          <div className="text-primary">
            <span className="font-bold text-primary">
              “In seconds, I saw numbers I used to wait days for. It felt like
              having a CFO on demand.”
            </span>
          </div>
        }
      />
      <Testimonials />
      <FAQ />
      <CTASection />
      {/* <Banner /> */}
    </main>
  );
}
