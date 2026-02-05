import React, { useEffect, useState } from "react";
import api from "../api/api";
import ResearcherDashboard from "./ResearcherDashboard";

export default function ResearcherSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await api.get("/summary");
        setSummary(res.data);
      } catch {
        setError("Failed to load researcher insights");
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  if (loading) return <p className="p-8">Loading analytics...</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  const highRiskPercent = (
    (summary.highRisk / summary.totalPatients) *
    100
  ).toFixed(1);

  const lowRiskPercent = (
    (summary.lowRisk / summary.totalPatients) *
    100
  ).toFixed(1);

  return (
    <ResearcherDashboard>
      {/* ===== KPI CARDS ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <MetricCard
          label="Total Patients"
          value={summary.totalPatients}
        />

        <MetricCard
          label="High Risk Patients"
          value={summary.highRisk}
          subtitle={`${highRiskPercent}% of total`}
          accent="red"
        />

        <MetricCard
          label="Low Risk Patients"
          value={summary.lowRisk}
          subtitle={`${lowRiskPercent}% of total`}
          accent="green"
        />
      </div>

      {/* ===== ANALYTICAL SUMMARY ===== */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">
          Risk Distribution Summary
        </h2>

        <p className="text-slate-600 leading-relaxed max-w-4xl">
          Out of <span className="font-semibold">{summary.totalPatients}</span>{" "}
          analyzed patients,
          <span className="font-semibold text-red-600">
            {" "}
            {summary.highRisk}
          </span>{" "}
          are classified as high cardiovascular risk and
          <span className="font-semibold text-green-600">
            {" "}
            {summary.lowRisk}
          </span>{" "}
          as low risk. These insights provide a population‑level overview of
          cardiovascular trends derived from AI‑assisted analysis.
        </p>

        <p className="text-xs text-slate-400 mt-4">
          Last updated: {new Date().toLocaleString()}
        </p>
      </section>
    </ResearcherDashboard>
  );
}

/* ================= UI COMPONENTS ================= */

function MetricCard({ label, value, subtitle, accent }) {
  const accents = {
    red: "from-red-500 to-rose-500 text-red-600",
    green: "from-emerald-500 to-teal-500 text-green-600",
    default: "from-slate-500 to-slate-600 text-slate-700",
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <p className="text-sm text-slate-500">{label}</p>

      <h3
        className={`text-4xl font-bold mt-2 ${
          accent ? accents[accent].split(" ").pop() : "text-slate-800"
        }`}
      >
        {value}
      </h3>

      {subtitle && (
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
