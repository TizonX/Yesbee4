import Container from './Container';

export default function Section({ className = '', children, ...props }) {
  return (
    <section className={`py-16 md:py-20 lg:py-24 ${className}`} {...props}>
      <Container>{children}</Container>
    </section>
  );
} 