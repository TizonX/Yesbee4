import ContactHero from '../components/ContactHero';
import ContactContent from '../components/ContactContent';

export const metadata = {
  title: 'Contact Us | FinanceHub',
  description: 'Get in touch with our team. We\'re here to help you achieve your financial goals.',
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactContent />
    </>
  );
} 