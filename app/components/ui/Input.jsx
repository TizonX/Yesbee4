export default function Input({ label, error, className = '', ...props }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-primary">
        {label}
      </label>
      <input
        className={`block w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:ring-2 transition-colors ${
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-primary focus:ring-primary'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 