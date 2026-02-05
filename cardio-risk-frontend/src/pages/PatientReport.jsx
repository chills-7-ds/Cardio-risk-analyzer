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

  if (loading) return <p className="p-6">Loading report...</p>;
  if (error === "ACCESS_DENIED") return <Navigate to="/unauthorized" />;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  const { demographics, vitals, analysis, patientId, generatedAt } = report;

  const hrStatus = getVitalStatus("heartRate", vitals.heartRate);
  const cholStatus = getVitalStatus("cholesterol", vitals.cholesterol);
  const bpStatus = getVitalStatus("bloodPressure", vitals.bloodPressure);

  const handleDownloadPDF = async () => {
    const element = reportRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">
          Patient Report (ID: {patientId})
        </h1>

        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Download PDF
        </button>
      </div>

      {/* PDF CONTENT START */}
      <div ref={reportRef}>
        {/* Demographics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Age</p>
            <h3 className="text-xl">{demographics.age}</h3>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-gray-500">Gender</p>
            <h3 className="text-xl">{demographics.gender}</h3>
          </div>

          <div className={`p-4 rounded shadow border ${statusStyles[hrStatus]}`}>
            <p className="text-sm">Heart Rate</p>
            <h3 className="text-xl font-semibold">
              {vitals.heartRate} bpm
            </h3>
            <p className="text-xs mt-1">{hrStatus}</p>
          </div>
        </div>

        {/* Vital Parameters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div
            className={`p-4 rounded shadow border ${statusStyles[cholStatus]}`}
          >
            <p className="text-sm">Cholesterol</p>
            <h3 className="text-xl font-semibold">{vitals.cholesterol}</h3>
            <p className="text-xs mt-1">{cholStatus}</p>
          </div>

          <div
            className={`p-4 rounded shadow border ${statusStyles[bpStatus]}`}
          >
            <p className="text-sm">Blood Pressure</p>
            <h3 className="text-xl font-semibold">{vitals.bloodPressure}</h3>
            <p className="text-xs mt-1">{bpStatus}</p>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-2">Risk Assessment</h2>

          <RiskBadge level={analysis.riskLevel} />

          <p className="text-sm text-gray-600 mt-3">
            Based on the analyzed vitals and demographic attributes, the patient
            has been classified as{" "}
            <span className="font-semibold">
              {analysis.riskLevel}
            </span>{" "}
            cardiovascular risk.
          </p>

          <p className="text-xs text-gray-400 mt-2">
            Report generated on {new Date(generatedAt).toLocaleString()}
          </p>
        </div>
      </div>
      {/* PDF CONTENT END */}
    </div>
  );
}
