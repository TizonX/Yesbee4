import Section from './Section';

const testimonials = [
  {
    content:
      "FinanceHub transformed our business's financial strategy. Their expert team provided invaluable guidance that led to significant growth.",
    author: 'Sarah Johnson',
    role: 'CEO, TechStart Inc.',
    image: '/testimonials/sarah.jpg',
  },
  {
    content:
      'The personalized retirement planning service exceeded my expectations. I now feel confident about my financial future.',
    author: 'Michael Chen',
    role: 'Senior Engineer',
    image: '/testimonials/michael.jpg',
  },
  {
    content:
      'Their tax planning strategies saved us a considerable amount while ensuring complete compliance. Highly recommended!',
    author: 'Priya Patel',
    role: 'Business Owner',
    image: '/testimonials/priya.jpg',
  },
];

export default function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Trusted by Industry Leaders
        </h2>
        <p className="mt-6 text-lg leading-8 text-accent-dark">
          Don't just take our word for it. Here's what our clients have to say about their experience with FinanceHub.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="flex flex-col justify-between rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200"
          >
            <div>
              <div className="relative h-12">
                <svg
                  className="absolute h-12 w-12 text-primary/10"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mt-6 text-lg font-medium leading-8">
                {testimonial.content}
              </p>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/5">
                {/* Placeholder for image */}
                <div className="flex h-full w-full items-center justify-center text-primary">
                  {testimonial.author[0]}
                </div>
              </div>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-accent-dark">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
} 