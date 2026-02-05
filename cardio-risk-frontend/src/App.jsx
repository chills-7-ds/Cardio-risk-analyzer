import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DoctorDashboard from "./pages/DoctorDashboard";
import ResearcherSummary from "./pages/ResearcherSummary";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./utils/ProtectedRoute";
import PatientList from "./pages/PatientList";
import PatientReport from "./pages/PatientReport";

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />

      {/* Doctor */}
      <Route
        path="/doctor-dashboard"
        element={
          <ProtectedRoute allowedRole="Doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/patients"
        element={
          <ProtectedRoute allowedRole="Doctor">
            <PatientList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor/patients/:id"
        element={
          <ProtectedRoute allowedRole="Doctor">
            <PatientReport />
          </ProtectedRoute>
        }
      />

      {/* Researcher */}
      <Route
        path="/researcher-dashboard"
        element={
          <ProtectedRoute allowedRole="Researcher">
            <ResearcherSummary />
          </ProtectedRoute>
        }
      />

      {/* Unauthorized */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
