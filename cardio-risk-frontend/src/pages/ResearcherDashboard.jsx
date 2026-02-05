import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResearcherDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-4 bg-white shadow">
        <h1 className="text-xl font-semibold">Researcher Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        {/* Existing dashboard content */}
      </main>
    </div>
  );
}
