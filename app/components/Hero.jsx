import Image from 'next/image';
import Container from './Container';

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-primary/5 to-transparent">
      <Container className="relative pt-20 pb-32 md:pt-24 md:pb-32 lg:pt-40 lg:pb-40">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-primary sm:text-6xl lg:text-7xl">
            Smart Financial Solutions for{' '}
            <span className="relative whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Your Future</span>
            </span>
          </h1>
          <p className="mt-6 text-lg text-accent-dark md:text-xl">
            Expert financial guidance to help you achieve your goals. We combine cutting-edge technology with personalized service to secure your financial future.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="btn-primary"
            >
              Get Started
            </a>
            <a href="#services" className="btn text-accent-dark hover:text-primary">
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
          </div>
        </div>
      </Container>
      
      {/* Background Elements */}
      <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl" aria-hidden="true">
        <div
          className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-primary-light to-secondary opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
} 