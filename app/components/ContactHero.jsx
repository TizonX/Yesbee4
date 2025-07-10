"use client";

import { motion } from "framer-motion";

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/5 to-transparent">
      <div className="mx-auto max-w-7xl px-4 pt-40 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Get in Touch
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-accent-dark"
          >
            Get your questions answered. We’d love to hear from you!
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
