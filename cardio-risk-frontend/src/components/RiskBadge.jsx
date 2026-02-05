import React from "react";

export default function RiskBadge({ level }) {
  if (!level) return null;

  const colors = {
    LOW: "bg-green-500",
    MEDIUM: "bg-yellow-500 text-black",
    HIGH: "bg-red-500",
  };

  return (
    <span
      className={`inline-block px-4 py-1 rounded-full text-sm font-bold text-white ${colors[level]}`}
    >
      {level} RISK
    </span>
  );
}
