import React from "react";

const Banner = ({
  bg = "bg-background-dark",
  testimonial = (
    <div className="text-primary">
      <span className="font-bold text-primary">
        “It’s like having a finance team that works instantly, and never
        sleeps.”
      </span>{" "}
      Start for FREE – built for founders
    </div>
  ),
  buttonText = "Get started for FREE!",
  onClick,
  subtext = "",
}) => {
  return (
    <div
      className={`w-full ${bg} flex items-center justify-center py-10 px-4 md:py-14 md:px-0`}
    >
      <div className="w-full max-w-xl flex flex-col items-center text-center">
        <p className="text-lg md:text-xl text-white font-normal leading-snug">
          {testimonial}
        </p>
        <button
          onClick={onClick}
          className="mt-6 bg-primary text-white px-20 py-2.5 rounded-lg font-semibold shadow-sm transition-all duration-150 hover:bg-primary-dark hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          {buttonText}
        </button>
        <span className="mt-3 text-xs text-accent-dark">{subtext}</span>
      </div>
    </div>
  );
};

export default Banner;
