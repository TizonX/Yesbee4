import Section from './Section';

const stats = [
  {
    value: '₹500Cr+',
    label: 'Assets Under Management',
    description: 'Trust and confidence from our valued clients',
  },
  {
    value: '10K+',
    label: 'Happy Clients',
    description: 'Serving individuals and businesses',
  },
  {
    value: '15+',
    label: 'Years of Excellence',
    description: 'Proven track record of success',
  },
  {
    value: '98%',
    label: 'Client Retention',
    description: 'Long-term relationships built on trust',
  },
];

export default function Stats() {
  return (
    <Section className="bg-primary text-white" id="stats">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Our Impact in Numbers
        </h2>
        <p className="mt-6 text-lg leading-8 text-white/80">
          We take pride in our achievements and the trust our clients place in us. Here's a glimpse of our impact.
        </p>
      </div>
      <dl className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <dt className="text-4xl font-bold tracking-tight">{stat.value}</dt>
            <dd className="mt-2">
              <span className="text-lg font-semibold">{stat.label}</span>
              <span className="mt-1 block text-sm text-white/80">
                {stat.description}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
} 