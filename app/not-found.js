// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold text-blue-800 mb-4">404</h1>
      <p className="text-xl mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link href="/" className="text-blue-600 underline hover:text-blue-800 transition">
        Go back to homepage
      </Link>
    </div>
  );
}
