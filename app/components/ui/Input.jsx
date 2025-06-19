import { forwardRef } from "react";

const Input = forwardRef(({ label, error, className = "", ...props }, ref) => {
  return (
    <div className="space-y-1" suppressHydrationWarning={true}>
      <label className="block text-sm font-medium text-primary">{label}</label>
      <input
        data-gramm="false"
        ref={ref}
        className={`block w-full px-4 py-2 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
          error
            ? "border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-primary focus:ring-primary"
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
