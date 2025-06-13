import Section from './Section';

const plans = [
  {
    name: 'Essential',
    price: '₹2,999',
    frequency: '/month',
    description: 'Perfect for individuals starting their financial journey',
    features: [
      'Personal Financial Planning',
      'Investment Advisory',
      'Tax Planning Basics',
      'Quarterly Portfolio Review',
      'Email Support',
    ],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹7,999',
    frequency: '/month',
    description: 'Ideal for growing businesses and serious investors',
    features: [
      'Everything in Essential, plus:',
      'Advanced Investment Strategies',
      'Estate Planning',
      'Monthly Portfolio Review',
      'Priority Support',
      'Tax Optimization',
      'Retirement Planning',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: '',
    description: 'Tailored solutions for large organizations',
    features: [
      'Everything in Professional, plus:',
      'Dedicated Financial Advisor',
      'Custom Investment Strategy',
      'Weekly Portfolio Review',
      '24/7 Priority Support',
      'Corporate Advisory',
      'M&A Consulting',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function Pricing() {
  return (
    <Section id="pricing" className="bg-background-dark">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Simple, Transparent Pricing
        </h2>
        <p className="mt-6 text-lg leading-8 text-accent-dark">
          Choose the plan that best fits your needs. All plans include our core features with varying levels of service and support.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative flex flex-col rounded-2xl ${
              plan.popular
                ? 'bg-primary text-white shadow-xl scale-105'
                : 'bg-white text-accent-dark ring-1 ring-gray-200'
            } p-8`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-white">
                Most Popular
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-lg font-semibold leading-8">{plan.name}</h3>
              <p className={`mt-4 ${plan.popular ? 'text-white/90' : 'text-accent-dark'}`}>
                {plan.description}
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-accent-dark'}`}>
                  {plan.frequency}
                </span>
              </div>
            </div>
            <ul className="mb-8 space-y-3 text-sm leading-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-3">
                  <svg
                    className={`h-6 w-6 flex-none ${
                      plan.popular ? 'text-white' : 'text-primary'
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`mt-auto w-full rounded-lg px-4 py-2.5 text-sm font-semibold ${
                plan.popular
                  ? 'bg-white text-primary hover:bg-gray-50'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
} 