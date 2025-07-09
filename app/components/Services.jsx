import { title } from "process";
import Section from "./Section";
import { motion } from "framer-motion";

const services = [
  {
    title: "Investment Management",
    description:
      "Expert portfolio management with a focus on long-term growth and risk management.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
        />
      </svg>
    ),
  },
  {
    title: "Retirement Planning",
    description:
      "Comprehensive retirement strategies to ensure a comfortable and secure future.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Tax Planning",
    description:
      "Strategic tax planning to minimize liabilities and maximize your wealth.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Estate Planning",
    description:
      "Protect and transfer your wealth to the next generation efficiently.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
        />
      </svg>
    ),
  },
  {
    title: "Insurance Solutions",
    description: "Comprehensive coverage to protect what matters most to you.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
  },
  {
    title: "Business Advisory",
    description: "Strategic financial guidance for businesses of all sizes.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];
const features = [
  {
    title: "Cash Flow Planner",
    description:
      "AI planner with smart alerts for collections, shortfalls, and cash position.",
    image: "/path-to-your-image/bill.png", // Update image paths
  },
  {
    title: "Sales Analysis",
    description:
      "Complete sales insights by branch and product, with key performance benchmarks.",
    image: "/path-to-your-image/checking.png",
  },
  {
    title: "Business Valuation",
    description:
      "Automated business valuation using DCF, EBITDA multiples and hybrid methods. ( for unlisted companies) ",
    image: "/path-to-your-image/reimburse.png",
  },

  {
    title: "Financial Modeling",
    description: "Instant financial health check using Piotroski’s F-Score",
    image: "/path-to-your-image/card.png",
  },
  {
    title: "Financial Safety",
    description: `Instant financial health check using Piotroski's F-Score.`,
    image: "/path-to-your-image/loan.png",
  },
  {
    title: "Fraud Detection",
    description: `AI powered tools to detect fraud, anomalies and suspicious patterns with precision. `,
    image: "/path-to-your-image/loan.png",
  },
  {
    title: "Virtual CFO service",
    description: "Let experts handle your financial planning and strategy. ",
    image: "/path-to-your-image/loan.png",
  },
  {
    title: "Financial Metrics",
    description: `Business scoring engine based on industry benchmarks`,
    image: "/path-to-your-image/loan.png",
  },
];

export default function Services() {
  return (
    <Section id="services">
      <div className="text-center">
        <motion.h2
          className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Explore yesbee4.ai
        </motion.h2>
        <motion.p
          className="mt-6 text-lg leading-8 text-accent-dark mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Each product is designed to remove complexity, reduce dependency and
          bring AI-powered independence to your business operations.
        </motion.p>
      </div>
      {/* <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
              <div className="text-primary">{service.icon}</div>
            </div>
            <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
            <p className="mt-2 text-accent-dark">{service.description}</p>
            <div className="absolute right-4 bottom-4">
              <svg
                className="h-6 w-6 text-primary/20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        ))}
      </div> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 sm:mt-24 md:mt-14">
        {features.map((item, index) => (
          <div
            key={index}
            className="group bg-background-light hover:bg-background-gray rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col cursor-pointer"
          >
            <div className="overflow-hidden rounded-lg mb-4">
              <img
                src={
                  "/dashboard.png" ||
                  "https://cdn.prod.website-files.com/5f16d69f1760cdba99c3ce6e/66b0939b0243e4472cba6d13_6685511dab1b588b072c07da_img-04.webp"
                }
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h3 className="text-primary text-lg font-semibold mb-2 text-center  transition-colors duration-300">
              {item.title}
            </h3>
            <p className="text-accent-dark text-body-sm text-center  transition-colors duration-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
