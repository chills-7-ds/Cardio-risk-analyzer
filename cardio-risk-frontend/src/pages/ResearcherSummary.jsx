import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function ResearcherSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/summary");
        setSummary(res.data);
      } catch (err) {
        setError("Failed to fetch researcher summary");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <p className="p-6">Loading summary...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const highRiskPercent = (
    (summary.highRisk / summary.totalPatients) *
    100
  ).toFixed(1);

  const lowRiskPercent = (
    (summary.lowRisk / summary.totalPatients) *
    100
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-5 bg-white shadow">
        <h1 className="text-xl font-semibold">Researcher Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      {/* Content */}
      <main className="p-6 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-lg shadow">
            <p className="text-gray-500">Total Patients</p>
            <h2 className="text-3xl font-bold">
              {summary.totalPatients}
            </h2>
          </div>

          <div className="bg-red-50 p-5 rounded-lg shadow">
            <p className="text-red-600">High Risk Patients</p>
            <h2 className="text-3xl font-bold text-red-700">
              {summary.highRisk}
            </h2>
            <p className="text-sm text-red-600 mt-1">
              {highRiskPercent}% of total
            </p>
          </div>

          <div className="bg-green-50 p-5 rounded-lg shadow">
            <p className="text-green-600">Low Risk Patients</p>
            <h2 className="text-3xl font-bold text-green-700">
              {summary.lowRisk}
            </h2>
            <p className="text-sm text-green-600 mt-1">
              {lowRiskPercent}% of total
            </p>
          </div>
        </div>

        {/* Analytical Summary */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">
            Risk Distribution Summary
          </h2>
          <p className="text-gray-600 text-sm">
            Out of <strong>{summary.totalPatients}</strong> analyzed patients,
            <strong className="text-red-600">
              {" "}
              {summary.highRisk}
            </strong>{" "}
            are classified as high risk and
            <strong className="text-green-600">
              {" "}
              {summary.lowRisk}
            </strong>{" "}
            as low risk. This dashboard provides researchers with an aggregated
            overview of cardiovascular risk trends in the dataset.
          </p>

          <p className="text-xs text-gray-400 mt-3">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </main>
    </div>
  );
}
