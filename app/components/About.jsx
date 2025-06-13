'use client';

import Section from './Section';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const timeline = [
  {
    year: '2010',
    title: 'Our Beginning',
    description: 'Founded with a vision to democratize financial services',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2015',
    title: 'Digital Transformation',
    description: 'Launched our first digital platform for financial planning',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2018',
    title: 'Expansion',
    description: 'Expanded services to include investment advisory and wealth management',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    year: '2023',
    title: 'Innovation Leader',
    description: 'Recognized as a leading fintech innovator in the industry',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const strengths = [
  {
    title: 'Expert Guidance',
    description: 'Certified financial advisors with decades of experience',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: 'Secure Platform',
    description: 'Bank-grade security with end-to-end encryption',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: 'Fast Processing',
    description: 'Real-time updates and instant transaction processing',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  },
  {
    title: '24/7 Support',
    description: 'Round-the-clock customer service and technical support',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  }
];

const leadership = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: '20+ years of experience in financial services'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Investment Officer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Former Wall Street investment strategist'
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Technology',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    bio: 'Fintech innovator with multiple patents'
  }
];

export default function About() {
  return (
    <div className="bg-background-light">
      {/* Hero Section */}
<div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/5 to-transparent h-screen">
  <div className="absolute inset-0 z-0">
    <Image
      src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      alt="Finance background"
      fill
      className="object-cover opacity-10"
      priority
    />
  </div>

  <div className="relative z-10 flex h-full flex-col items-center justify-center mx-auto max-w-4xl text-center px-4">
    <motion.h1 
      className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Building Financial
      <span className="relative whitespace-nowrap">
        <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Confidence</span>
      </span>
    </motion.h1>

    <motion.p 
      className="mt-6 text-lg text-accent-dark md:text-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      We're on a mission to make financial success accessible to everyone through innovative technology and personalized guidance.
    </motion.p>
  </div>
</div>


      {/* Mission & Vision */}
      <Section className="bg-background-dark">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            {...fadeInUp}
          >
            Our Mission & Vision
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-accent-dark"
            {...fadeInUp}
          >
            At FinanceHub, we believe everyone deserves access to expert financial guidance. Our mission is to democratize financial services through technology while maintaining the personal touch that complex financial decisions require.
          </motion.p>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              {
                title: 'Mission',
                description: 'To empower individuals and businesses with accessible, innovative financial solutions that drive growth and security.',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                )
              },
              {
                title: 'Vision',
                description: 'To be the most trusted financial technology platform, transforming how people manage and grow their wealth.',
                icon: (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-300 group-hover:bg-primary/10">
                  <div className="text-primary">{item.icon}</div>
                </div>
                <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-accent-dark">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Timeline */}
      <Section className="bg-background-light">
        <div className="mx-auto max-w-4xl">
          <motion.h2 
            className="text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            {...fadeInUp}
          >
            Our Journey
          </motion.h2>
          <div className="mt-16">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                className="relative flex items-start gap-8 pb-12 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">
                    {item.year}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-accent-dark">{item.description}</p>
                </div>
                {index !== timeline.length - 1 && (
                  <div className="absolute left-12 top-24 h-full w-0.5 bg-primary/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <Section className="bg-background-dark">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            {...fadeInUp}
          >
            Why Choose FinanceHub?
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-accent-dark"
            {...fadeInUp}
          >
            We combine expertise, technology, and personalized service to deliver exceptional financial solutions.
          </motion.p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((strength, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 transition-colors duration-300 group-hover:bg-primary/10">
                  <div className="text-primary">{strength.icon}</div>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{strength.title}</h3>
                <p className="mt-2 text-sm text-accent-dark">{strength.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section className="bg-background-light">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            {...fadeInUp}
          >
            Meet Our Leadership
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-accent-dark"
            {...fadeInUp}
          >
            Experienced professionals dedicated to your financial success
          </motion.p>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {leadership.map((member, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="mt-1 text-secondary">{member.role}</p>
                  <p className="mt-2 text-sm text-accent-dark">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Finance background"
            fill
            className="object-cover opacity-10"
          />
        </div>
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            {...fadeInUp}
          >
            Ready to Start Your Financial Journey?
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg leading-8 text-accent-dark"
            {...fadeInUp}
          >
            Join thousands of satisfied clients who trust FinanceHub with their financial future.
          </motion.p>
          <motion.div 
            className="mt-10 flex items-center justify-center gap-x-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <a href="#contact" className="btn-primary">
              Get Started
            </a>
            <a href="#services" className="btn text-accent-dark hover:text-primary">
              Explore Services
              <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </Section>
    </div>
  );
} 