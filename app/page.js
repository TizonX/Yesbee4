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
import Banner from "./components/Banner";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";

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
        "Built for Global businesses. Hence, backed by global security standards.",
      ],
      reverse: false,
      icon: faShieldHalved,
    },
    {
      title: "Cash Flow Planner",
      desc: `Streamline your cash flow management by receiving alerts for collections and potential cash shortages, enabling you to make proactive adjustments to ensure smooth financial operations.`,
      italicText: `Stay alert. Stay ahead.`,
      reverse: true,
    },
    {
      title: "Sales Analysis",
      desc: `Streamline your cash flow management by receiving alerts for collections and potential cash shortages, enabling you to make proactive adjustments to ensure smooth financial operations.`,
      italicText: `Sales clarity, on demand.`,
      reverse: false,
    },
  ];
  const products2 = [
    {
      title: "Business Valuation",
      desc: `Automated valuation using DCF, EBITDA multiples, Sensitivity Analysis and Monte Carlo Simulation ensuring you get a fair and accurate estimate for strategic decisions or selling.`,
      italicText: "Know your true worth.",
      reverse: true,
    },
    {
      title: "Financial Modelling",
      desc: `Custom financial models with 3-, 5-, 7- or 10-year projections including P&L, Cash Flows and Balance Sheet forecast tailored to your needs, giving you a clear outlook on future performance and business growth potential.`,
      italicText: `Plan beyond instinct.`,
      reverse: false,
    },
  ];
  const products3 = [
    {
      title: "Financial Safety",
      desc: `Instant financial health checking using the trusted Piotroski’s F-Score helping you understand whether you are on the right financial track or if any adjustments are needed to stay competitive and profitable.`,
      italicText: "Your financial safety net.",
      reverse: false,
    },
    {
      title: "Fraud Detection",
      desc: `AI powered detection of suspicious activity and financial anomalies using Beneish M-Score, Benford’s Law, the Modified  Jones Model , Altman Z-score`,
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
        ({ title, desc, italicText, bulletPoints, reverse, icon }, index) => (
          <Products
            key={index}
            title={title}
            desc={desc}
            italicText={italicText}
            bulletPoints={bulletPoints}
            reverse={reverse}
            icon={icon}
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
