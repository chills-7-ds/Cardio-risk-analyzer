import React from "react";

export default function InputField({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-4 py-2.5 rounded-lg border
                   border-gray-300 bg-white
                   focus:outline-none focus:ring-2 focus:ring-blue-500
                   transition"
      />
    </div>
  );
}
