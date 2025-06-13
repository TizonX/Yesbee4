import Section from './Section';

export default function CTASection() {
  return (
    <Section className="bg-primary" id="cta">
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Ready to Secure Your Financial Future?
          </h2>
          <p className="mt-6 text-lg leading-8 text-white/80">
            Join thousands of satisfied clients who have transformed their financial lives with FinanceHub. Start your journey today.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-primary shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Schedule a Free Consultation
            </a>
            <a href="#pricing" className="text-lg font-semibold text-white hover:text-white/90">
              View Pricing <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </Section>
  );
} 