import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useAuth } from "../context/AuthContext";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* TOP BAR */}
      <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Doctor Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Cardio Risk Analyzer • Clinical Workspace
          </p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
        >
          Logout
        </button>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* WELCOME */}
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back{user?.name ? `, Dr. ${user.name}` : ""}
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Access patient risk reports, review cardiovascular assessments,
            and make informed clinical decisions using AI‑assisted analysis.
          </p>
        </section>

        {/* ACTION CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 hover:shadow-lg transition cursor-pointer">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                View Patients
              </h3>
              <p className="text-sm text-gray-600 flex-grow">
                Browse all registered patients and access detailed heart‑risk
                reports with clinical indicators.
              </p>

              <button
                onClick={() => navigate("/doctor/patients")}
                className="mt-6 w-full py-2 rounded-md bg-gradient-to-r from-blue-600 to-teal-500 text-white font-semibold hover:opacity-90 transition"
              >
                Open Patient List
              </button>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Risk Insights
              </h3>
              <p className="text-sm text-gray-600 flex-grow">
                Identify high‑risk cardiovascular cases quickly using
                AI‑generated indicators and flags.
              </p>

              <div className="mt-6 text-sm text-gray-400 italic">
                Coming soon
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition">
            <div className="flex flex-col h-full">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Clinical Summary
              </h3>
              <p className="text-sm text-gray-600 flex-grow">
                Get an overview of patient trends and population‑level
                cardiovascular risk patterns.
              </p>

              <div className="mt-6 text-sm text-gray-400 italic">
                Coming soon
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
}
