import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between items-center p-5 bg-white shadow">
        <h1 className="text-xl font-semibold">Doctor Dashboard</h1>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <main className="p-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <button
            onClick={() => navigate("/doctor/patients")}
            className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            View Patients
          </button>
        </div>
      </main>
    </div>
  );
}
