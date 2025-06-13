'use client';

import { useState } from 'react';
import Section from './Section';

const faqs = [
  {
    question: 'What types of financial services do you offer?',
    answer:
      'We offer a comprehensive range of financial services including investment management, retirement planning, tax planning, estate planning, insurance solutions, and business advisory services. Each service is tailored to meet your specific needs and goals.',
  },
  {
    question: 'How do you charge for your services?',
    answer:
      'Our fee structure is transparent and varies based on the service level you choose. We offer monthly subscription plans as well as customized pricing for enterprise clients. All fees are clearly outlined before any engagement begins.',
  },
  {
    question: 'What makes FinanceHub different from other financial advisors?',
    answer:
      'We combine cutting-edge technology with personalized service to deliver superior results. Our team of certified experts, transparent pricing, and track record of success sets us apart. We focus on building long-term relationships and providing tailored solutions.',
  },
  {
    question: 'How often will I receive updates about my portfolio?',
    answer:
      'The frequency of updates depends on your service level. Essential plan clients receive quarterly reviews, Professional plan clients get monthly reviews, and Enterprise clients enjoy weekly portfolio reviews. All clients have 24/7 access to their portfolio dashboard.',
  },
  {
    question: 'Can I switch between different service plans?',
    answer:
      'Yes, you can upgrade or downgrade your plan at any time. Our team will help ensure a smooth transition and adjust your services accordingly. There are no penalties for changing plans.',
  },
  {
    question: 'What is your investment philosophy?',
    answer:
      'Our investment philosophy is based on long-term value creation, risk management, and diversification. We focus on creating personalized investment strategies that align with your goals, risk tolerance, and time horizon.',
  },
];

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex w-full items-center justify-between py-6 text-left"
        onClick={onClick}
      >
        <span className="text-lg font-semibold">{question}</span>
        <span className="ml-6 flex h-7 w-7 items-center justify-center rounded-full border-2 border-primary">
          <svg
            className={`h-4 w-4 text-primary transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-accent-dark">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section id="faq">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Frequently Asked Questions
        </h2>
        <p className="mt-6 text-lg leading-8 text-accent-dark">
          Find answers to common questions about our services, process, and how we can help you achieve your financial goals.
        </p>
      </div>
      <div className="mx-auto mt-16 max-w-3xl">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={index === openIndex}
            onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
          />
        ))}
      </div>
    </Section>
  );
} 