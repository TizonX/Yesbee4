"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { useAuth } from "../context/AuthContext";

const products = [
  { name: "Cash Flow Planner", href: "/product/cash-flow-planner" },
  { name: "Business Valuation", href: "/product/business-valuation" },
  { name: "Financial Modeling", href: "/product/financial-modeling" },
  { name: "Financial Safety", href: "/product/financial-safety" },
  { name: "Fraud Detection", href: "/product/fraud-detection" },
  { name: "virtual-cfo-service", href: "/product/virtual-cfo-service" },
  { name: "Financial Metrics", href: "/product/financial-metrics" },
];

const solutions = [
  { name: "For Individuals", href: "/solutions/individuals" },
  { name: "For Businesses", href: "/solutions/businesses" },
  { name: "For Institutions", href: "/solutions/institutions" },
  { name: "For Family Offices", href: "/solutions/family-offices" },
];

const userMenuItems = [
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/settings" },
  { name: "Billing", href: "/billing" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const { user, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest("nav")) {
        setIsMobileMenuOpen(false);
        setMobileProductsOpen(false);
        setMobileSolutionsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobileMenuOpen]);

  const toggleMobileDropdown = (dropdown) => {
    if (dropdown === "products") {
      setMobileProductsOpen(!mobileProductsOpen);
      setMobileSolutionsOpen(false);
    } else if (dropdown === "solutions") {
      setMobileSolutionsOpen(!mobileSolutionsOpen);
      setMobileProductsOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <Container>
        <div className="relative flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="relative w-40 h-8">
              <Image
                src="/yesbee4ai_logo.png"
                alt="YesBee4.ai Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Home
            </Link>

            {/* Products Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
                Products
                <svg
                  className="w-4 h-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  {products.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-primary hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
                Solutions
                <svg
                  className="w-4 h-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-1 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-primary hover:bg-gray-50"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/about"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
            >
              Contact
            </Link>

            {/* Auth Section */}
            {user ? (
              <div className="relative group ml-8">
                <button className="flex items-center gap-2 text-sm font-medium text-primary group-hover:text-primary-dark">
                  <div className="relative w-8 h-8 rounded-full bg-primary-light overflow-hidden">
                    {user.avatar ? (
                      <Image
                        src={user.avatar}
                        alt={user.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex items-center justify-center w-full h-full text-white">
                        {user?.fullname && user?.fullname[0]}
                      </span>
                    )}
                  </div>
                  <span>{user?.name}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-1 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    {userMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-sm text-primary hover:bg-gray-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 ml-8">
                {/* <Link
                  href="/login"
                  className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                  Sign in
                </Link> */}
                <Link
                  href="/login" // signup
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors"
                >
                  Sign In
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary-dark hover:bg-gray-100"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className={`${isMobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`${isMobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Products Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => toggleMobileDropdown("products")}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50 rounded-md"
              >
                Products
                <svg
                  className={`w-4 h-4 transition-transform ${
                    mobileProductsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${mobileProductsOpen ? "block" : "hidden"} pl-4`}
              >
                {products.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setMobileProductsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Solutions Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => toggleMobileDropdown("solutions")}
                className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50 rounded-md"
              >
                Solutions
                <svg
                  className={`w-4 h-4 transition-transform ${
                    mobileSolutionsOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`${mobileSolutionsOpen ? "block" : "hidden"} pl-4`}
              >
                {solutions.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setMobileSolutionsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {/* Mobile Auth Section */}
            {user ? (
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="px-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="relative w-10 h-10 rounded-full bg-primary-light overflow-hidden">
                      {user.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <span className="flex items-center justify-center w-full h-full text-white text-lg">
                          {user?.fullname}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-primary">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-2 space-y-1">
                  <Link
                    href="/auth/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-primary hover:text-primary-dark hover:bg-gray-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary-dark"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
}
