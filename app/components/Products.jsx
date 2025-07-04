import React from "react";
import Section from "./Section";
import Container from "./Container";

const FINANCE_IMAGE =
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const bulletPoints = [
  "No training on your data",
  "You own and control your data",
  "FIPS 140-2 compliant data encryption",
];

const Products = ({
  reverse = true,
  title = "",
  desc = "",
  bulletPoints = [],
  italicText = "",
}) => {
  return (
    <div className="bg-background-dark">
      <Container>
        <div
          className={`flex flex-col ${
            reverse ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-center justify-between gap-0 lg:gap-0 my-10 py-10 px-0 md:px-0 lg:px-14`}
        >
          {/* Image Section */}
          <div className="flex-1 flex items-center justify-center w-full max-w-md md:max-w-xl lg:max-w-md mx-auto lg:mx-0">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-primary/10 flex items-center justify-center">
              <img
                src={"/dashboard.png" || FINANCE_IMAGE}
                alt="Finance security illustration"
                className="w-full h-full object-cover object-center"
                loading="lazy"
                style={{ filter: "saturate(1.1) contrast(1.05)" }}
              />
              {/* Accent ring */}
              <div className="absolute inset-0 ring-2 ring-primary/30 rounded-2xl pointer-events-none" />
            </div>
          </div>
          {/* Text Section */}
          <div className="flex-1 flex flex-col justify-center items-start w-auto max-w-xl mx-auto lg:mx-0 space-y-7">
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mt-10 lg:mt-0">
              {title}
            </h2>
            {/* Italic Text */}
            {italicText && (
              <p className="italic text-accent-dark text-base">{italicText}</p>
            )}
            <p className="text-accent-dark text-base leading-relaxed">{desc}</p>
            <ul className="space-y-1">
              {bulletPoints?.map((point, idx) => (
                <li
                  key={idx}
                  className="flex items-center text-sm gap-1 text-accent-dark"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-primary/90 text-sm">
                    <svg
                      className="w-4 h-4  leading-8 text-accent-dark"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Products;
