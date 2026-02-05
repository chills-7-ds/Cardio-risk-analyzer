import React from "react";

export default function InputField({ label, ...props }) {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium mb-1">
          {label}
        </label>
      )}
      <input
        {...props}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
