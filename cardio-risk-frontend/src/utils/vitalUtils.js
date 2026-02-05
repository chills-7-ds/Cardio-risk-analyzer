export const getVitalStatus = (type, value) => {
  switch (type) {
    case "heartRate":
      if (value < 60 || value > 120) return "CRITICAL";
      if (value >= 100) return "WARNING";
      return "NORMAL";

    case "cholesterol":
      if (value >= 240) return "CRITICAL";
      if (value >= 200) return "WARNING";
      return "NORMAL";

    case "bloodPressure":
      if (value >= 140) return "CRITICAL";
      if (value >= 120) return "WARNING";
      return "NORMAL";

    default:
      return "NORMAL";
  }
};

export const statusStyles = {
  NORMAL: "bg-green-100 text-green-700 border-green-300",
  WARNING: "bg-yellow-100 text-yellow-700 border-yellow-300",
  CRITICAL: "bg-red-100 text-red-700 border-red-300",
};
