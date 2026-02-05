import React from "react";

export default function RiskBadge({ level }) {
  if (!level) return null;

  const styles = {
    LOW: "bg-emerald-100 text-emerald-700",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex items-center px-4 py-1
                  rounded-full text-sm font-semibold
                  ${styles[level]}`}
    >
      {level} RISK
    </span>
  );
}
