import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { cookies } from "next/headers";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "FinanceHub - Smart Financial Solutions",
  description:
    "Expert financial guidance to help you achieve your goals. We combine cutting-edge technology with personalized service to secure your financial future.",
};

export default function RootLayout({ children }) {
  const token = cookies().get("token")?.value;
  const isLoggedIn = !!token;
  
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <Navbar />
          <main className="pt-0">{children}</main>
          {/* <Toaster position="top-right" /> */}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
