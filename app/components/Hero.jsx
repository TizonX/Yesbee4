import Image from "next/image";
import Container from "./Container";
import { motion } from "framer-motion";
export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/5 to-transparent h-auto lg:h-screen">
      <Container className="relative pt-20 pb-32 md:pt-24 md:pb-32 lg:pt-40 lg:pb-40">
        <div className="flex justify-center items-center text-center">
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full text-xs sm:text-sm text-gray-700 w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 1.75L3 5.5v6c0 5.25 3.75 10.25 9 11 5.25-.75 9-5.75 9-11v-6l-9-3.75zM12 12c-.828 0-1.5-.672-1.5-1.5S11.172 9 12 9s1.5.672 1.5 1.5S12.828 12 12 12zm1.25 5h-2.5V15h2.5v2z" />
            </svg>
            <span>AI-powered Business Intelligence. In seconds.</span>
          </div>
        </div>

        <div className="mx-auto max-w-4xl text-center mt-10">
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            AI Powered Business{" "}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Backbone
              </span>
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 text-lg text-accent-dark md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Your business deserves more than reports. It deserves intelligence.
          </motion.p>
          <motion.div
            className="mt-10 flex items-center justify-center gap-x-6 hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <a href="#contact" className="btn-primary">
              Get Started
            </a>
            <a
              href="#services"
              className="btn text-accent-dark hover:text-primary"
            >
              Learn More
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </Container>

      {/* Background Elements */}
      <div
        className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary-light to-secondary opacity-20"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  );
}
