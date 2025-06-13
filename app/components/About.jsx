import Section from './Section';

export default function About() {
  return (
    <Section className="bg-background-dark" id="about">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          Transforming Financial Futures Since 2010
        </h2>
        <p className="mt-6 text-lg leading-8 text-accent-dark">
          At FinanceHub, we believe everyone deserves access to expert financial guidance. Our mission is to democratize financial services through technology while maintaining the personal touch that complex financial decisions require.
        </p>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {[
            {
              title: 'Expert Team',
              description: 'Led by certified financial advisors with decades of experience',
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ),
            },
            {
              title: 'Technology-Driven',
              description: 'Cutting-edge platforms for smarter financial decisions',
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: 'Client-First',
              description: 'Personalized solutions tailored to your unique needs',
              icon: (
                <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              ),
            },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5">
                {item.icon}
              </div>
              <h3 className="mt-6 text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-accent-dark">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
} 