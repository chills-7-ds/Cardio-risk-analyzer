import React, { useEffect, useRef, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { fetchPatientById } from "../services/patientService";
import RiskBadge from "../components/RiskBadge";
import { getVitalStatus, statusStyles } from "../utils/vitalUtils";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function PatientReport() {
  const { id } = useParams();
  const reportRef = useRef(null);

  const [report, setReport] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatientById(id)
      .then((res) => setReport(res.data))
      .catch((err) => {
        if (err.response?.status === 403) setError("ACCESS_DENIED");
        else setError("Failed to load report");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-8">Loading report...</p>;
  if (error === "ACCESS_DENIED") return <Navigate to="/unauthorized" />;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  const { demographics, vitals, analysis, patientId, generatedAt } = report;

  const hrStatus = getVitalStatus("heartRate", vitals.heartRate);
  const cholStatus = getVitalStatus("cholesterol", vitals.cholesterol);
  const bpStatus = getVitalStatus("bloodPressure", vitals.bloodPressure);

  const handleDownloadPDF = async () => {
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`Patient_Report_${patientId}.pdf`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8">
      {/* ================= Header ================= */}
      <header className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Patient Risk Report
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Patient ID: {patientId} • Generated{" "}
            {new Date(generatedAt).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2.5 rounded-xl
                     bg-gradient-to-r from-emerald-500 to-teal-500
                     text-white font-semibold
                     shadow-lg shadow-emerald-500/20
                     hover:opacity-90 transition"
        >
          Download PDF
        </button>
      </header>

      {/* ================= Report Body ================= */}
      <main ref={reportRef} className="space-y-12">
        {/* ===== Risk Overview ===== */}
        <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Risk Overview
          </h2>

          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <RiskBadge level={analysis.riskLevel} />

            <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
              Based on demographic attributes and analyzed clinical vitals,
              the AI‑assisted cardiovascular model classifies this patient
              under{" "}
              <span className="font-semibold text-slate-800">
                {analysis.riskLevel}
              </span>{" "}
              cardiovascular risk.
            </p>
          </div>
        </section>

        {/* ===== Demographics ===== */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Patient Demographics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard label="Age" value={`${demographics.age} years`} />
            <InfoCard label="Gender" value={demographics.gender} />
            <VitalCard
              label="Heart Rate"
              value={`${vitals.heartRate} bpm`}
              status={hrStatus}
            />
          </div>
        </section>

        {/* ===== Clinical Vitals ===== */}
        <section>
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Clinical Vitals
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VitalCard
              label="Cholesterol"
              value={vitals.cholesterol}
              status={cholStatus}
            />
            <VitalCard
              label="Blood Pressure"
              value={vitals.bloodPressure}
              status={bpStatus}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

/* ================= Reusable UI Blocks ================= */

function InfoCard({ label, value }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <h3 className="text-2xl font-semibold text-slate-800 mt-2">
        {value}
      </h3>
    </div>
  );
}

function VitalCard({ label, value, status }) {
  return (
    <div
      className={`bg-white rounded-3xl p-6 shadow-sm
                  border-l-4 ${statusStyles[status]} border border-slate-100`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <h3 className="text-2xl font-semibold text-slate-800 mt-2">
        {value}
      </h3>
      <p className="text-xs text-slate-500 mt-1">
        {status}
      </p>
    </div>
  );
}
