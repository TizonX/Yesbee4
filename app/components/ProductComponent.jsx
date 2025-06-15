'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const pricingPeriods = ['Monthly', 'Quarterly', 'Half-Yearly', 'Annually'];

const products = [
  {
    id: 1,
    title: 'Investment Portfolio Manager',
    description: 'Professional portfolio management with AI-driven insights and real-time analytics.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'AI-powered investment recommendations',
      'Real-time portfolio tracking',
      'Risk assessment tools',
      'Custom investment strategies',
      'Market trend analysis'
    ],
    pricing: {
      Monthly: 2999,
      Quarterly: 7999,
      'Half-Yearly': 14999,
      Annually: 29999
    },
    tags: ['Popular', 'AI-Powered'],
    discount: {
      Quarterly: 10,
      'Half-Yearly': 15,
      Annually: 20
    }
  },
  {
    id: 2,
    title: 'Tax Optimization Suite',
    description: 'Comprehensive tax planning and optimization tools for individuals and businesses.',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Automated tax calculations',
      'Tax-saving recommendations',
      'Document management',
      'Compliance tracking',
      'Multi-jurisdiction support'
    ],
    pricing: {
      Monthly: 1999,
      Quarterly: 4999,
      'Half-Yearly': 8999,
      Annually: 17999
    },
    tags: ['Best Value'],
    discount: {
      Quarterly: 15,
      'Half-Yearly': 20,
      Annually: 25
    }
  },
  {
    id: 3,
    title: 'Retirement Planning Pro',
    description: 'Advanced retirement planning tools with personalized strategies and projections.',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Retirement goal tracking',
      'Pension optimization',
      'Social security analysis',
      'Healthcare cost planning',
      'Legacy planning tools'
    ],
    pricing: {
      Monthly: 2499,
      Quarterly: 6499,
      'Half-Yearly': 11999,
      Annually: 22999
    },
    tags: ['New'],
    discount: {
      Quarterly: 10,
      'Half-Yearly': 15,
      Annually: 20
    }
  },
  {
    id: 4,
    title: 'Business Finance Hub',
    description: 'Complete financial management solution for businesses of all sizes.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Cash flow management',
      'Financial forecasting',
      'Invoice automation',
      'Expense tracking',
      'Business analytics'
    ],
    pricing: {
      Monthly: 3999,
      Quarterly: 9999,
      'Half-Yearly': 18999,
      Annually: 35999
    },
    tags: ['Enterprise'],
    discount: {
      Quarterly: 15,
      'Half-Yearly': 20,
      Annually: 25
    }
  },
  {
    id: 5,
    title: 'Wealth Management Suite',
    description: 'Comprehensive wealth management tools for high-net-worth individuals.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Asset allocation tools',
      'Estate planning',
      'Philanthropy management',
      'Family office features',
      'Wealth transfer planning'
    ],
    pricing: {
      Monthly: 4999,
      Quarterly: 12999,
      'Half-Yearly': 24999,
      Annually: 47999
    },
    tags: ['Premium'],
    discount: {
      Quarterly: 10,
      'Half-Yearly': 15,
      Annually: 20
    }
  },
  {
    id: 6,
    title: 'Crypto Investment Platform',
    description: 'Advanced cryptocurrency investment and trading platform with analytics.',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Portfolio tracking',
      'Market analysis',
      'Trading automation',
      'Risk management',
      'Tax reporting'
    ],
    pricing: {
      Monthly: 1999,
      Quarterly: 4999,
      'Half-Yearly': 8999,
      Annually: 16999
    },
    tags: ['Trending'],
    discount: {
      Quarterly: 15,
      'Half-Yearly': 20,
      Annually: 25
    }
  },
  {
    id: 7,
    title: 'Financial Education Hub',
    description: 'Comprehensive financial education platform with courses and tools.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    features: [
      'Interactive courses',
      'Financial calculators',
      'Learning paths',
      'Certification programs',
      'Community features'
    ],
    pricing: {
      Monthly: 999,
      Quarterly: 2499,
      'Half-Yearly': 4499,
      Annually: 7999
    },
    tags: ['Educational'],
    discount: {
      Quarterly: 15,
      'Half-Yearly': 20,
      Annually: 25
    }
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const ProductCard = ({ product, selectedPeriod }) => {
  const [isHovered, setIsHovered] = useState(false);

  const calculatePrice = (basePrice, period) => {
    const discount = product.discount?.[period] || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    return Math.round(discountedPrice);
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
    >
      <div className="relative h-48">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          {product.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{product.title}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>

        <div className="space-y-2 mb-4">
          {product.features.map((feature, index) => (
            <div key={index} className="flex items-center text-gray-700">
              <svg
                className="w-5 h-5 text-primary mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {feature}
            </div>
          ))}
        </div>

        <div className="border-t pt-4">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{calculatePrice(product.pricing[selectedPeriod], selectedPeriod)}
            </span>
            <span className="text-gray-500">/{selectedPeriod}</span>
          </div>
          {product.discount?.[selectedPeriod] && (
            <div className="text-sm text-green-600">
              Save {product.discount[selectedPeriod]}% with {selectedPeriod} plan
            </div>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-4 bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
        >
          Get Started
        </motion.button>
      </div>
    </motion.div>
  );
};

export default function ProductComponent() {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Our Financial Solutions
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the perfect plan for your financial needs
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            {pricingPeriods.map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedPeriod === period
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedPeriod={selectedPeriod}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 