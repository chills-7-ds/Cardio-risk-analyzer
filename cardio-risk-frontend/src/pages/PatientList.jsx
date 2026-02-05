import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPatients } from "../services/patientService";

export default function PatientList() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔎 NEW STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [riskFilter, setRiskFilter] = useState("ALL");

  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients()
      .then((res) => setPatients(res.data))
      .catch(() => setError("Failed to fetch patients"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading patients...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  // 🔍 SEARCH + FILTER LOGIC (FRONTEND ONLY)
  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.patientId.toString().includes(searchTerm) ||
      p.gender.toLowerCase().includes(searchTerm.toLowerCase());

    const patientRisk = p.analysis?.riskLevel; // <-- IMPORTANT FIELD

    const matchesRisk =
      riskFilter === "ALL" || patientRisk === riskFilter;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Patients</h1>

        {/* 🔎 SEARCH + FILTER CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by Patient ID or Gender"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border px-4 py-2 rounded-md w-full md:w-1/2"
          />

          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            className="border px-4 py-2 rounded-md w-full md:w-1/4"
          >
            <option value="ALL">All Risks</option>
            <option value="HIGH">High Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>

        {/* 📋 TABLE */}
        {filteredPatients.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No patients match the selected criteria.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Gender</th>
                <th className="border px-4 py-2">Risk</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((p) => (
                <tr key={p.patientId} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{p.patientId}</td>
                  <td className="border px-4 py-2">{p.age}</td>
                  <td className="border px-4 py-2">{p.gender}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        p.analysis?.riskLevel === "HIGH"
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {p.analysis?.riskLevel || "N/A"}
                    </span>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        navigate(`/doctor/patients/${p.patientId}`)
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
