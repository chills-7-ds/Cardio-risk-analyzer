import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../services/patientService";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients()
      .then((res) => setPatients(res.data))
      .catch(() => setError("Failed to fetch patients"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-8 text-gray-500">Loading patient registry…</p>;
  if (error) return <p className="p-8 text-red-500">{error}</p>;

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.patientId.toString().includes(searchTerm) ||
      p.gender.toLowerCase().includes(searchTerm.toLowerCase());

    const patientRisk = p.analysis?.riskLevel;
    const matchesRisk = riskFilter === "ALL" || patientRisk === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          Patient Registry
        </h1>
        <p className="text-slate-500 mt-1">
          Cardiovascular risk profiles & AI‑assisted reports
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search by Patient ID or Gender"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="px-4 py-2.5 rounded-lg border border-slate-200
                     focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="ALL">All Risk Levels</option>
          <option value="HIGH">High Risk</option>
          <option value="LOW">Low Risk</option>
        </select>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredPatients.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center text-slate-500">
            No patients match the selected criteria.
          </div>
        )}

        {filteredPatients.map((p) => (
          <div
            key={p.patientId}
            className="bg-white rounded-2xl shadow-sm p-6
                       hover:shadow-md transition cursor-pointer"
            onClick={() => navigate(`/doctor/patients/${p.patientId}`)}
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Left */}
              <div>
                <p className="text-xs text-slate-400">Patient ID</p>
                <p className="text-lg font-semibold text-slate-800">
                  #{p.patientId}
                </p>

                <div className="flex gap-4 mt-2 text-sm text-slate-600">
                  <span>Age: {p.age}</span>
                  <span>Gender: {p.gender}</span>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4">
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                    p.analysis?.riskLevel === "HIGH"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {p.analysis?.riskLevel || "N/A"} RISK
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/doctor/patients/${p.patientId}`);
                  }}
                  className="px-4 py-2 rounded-lg
                             bg-gradient-to-r from-blue-600 to-teal-500
                             text-white text-sm font-semibold
                             hover:opacity-90"
                >
                  View Report
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
