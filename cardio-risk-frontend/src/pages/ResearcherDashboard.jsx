import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResearcherDashboard({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Research Analytics
          </h1>
          <p className="text-sm text-slate-500">
            Cardio Risk Analyzer • Population Insights
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-xl bg-red-500 text-white font-medium
                     shadow hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* Page Content */}
      <main className="p-8 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
