// src/controllers/patientController.js

import { getPatients } from "../config/patientDataLoader.js";
import preprocess from "../utils/preprocessPatientData.js";
import analyze from "../utils/heartDiseaseAnalyzer.js";
import classifyRisk from "../utils/riskClassifier.js";

/**
 * GET /api/patients
 * Doctor + Researcher
 */
export const getAllPatients = (req, res) => {
  const patients = getPatients().map((p) => {
    const cleanData = preprocess(p);
    const analysis = analyze(cleanData);
    const riskLevel = classifyRisk(
      analysis.hasHeartDisease,
      analysis.riskFlags
    );

    return {
      patientId: p.patientId,
      age: p.age,
      gender: p.gender,
      analysis: {
        riskLevel, // ✅ THIS FIXES EVERYTHING
      },
    };
  });

  res.json(patients);
};


/**
 * GET /api/patients/:id
 * Doctor only
 */
export const getPatientReport = (req, res) => {
  const patientId = Number(req.params.id);

  const patient = getPatients().find(
    (p) => p.patientId === patientId
  );

  if (!patient) {
    return res.status(404).json({ message: "Patient not found" });
  }

  const cleanData = preprocess(patient);
  const analysis = analyze(cleanData);
  const riskLevel = classifyRisk(
    analysis.hasHeartDisease,
    analysis.riskFlags
  );

  res.json({
    patientId: patient.patientId,
    demographics: {
      age: patient.age,
      gender: patient.gender,
    },
    vitals: {
      cholesterol: cleanData.cholesterol,
      bloodPressure: cleanData.bloodPressure,
      heartRate: cleanData.heartRate,
      diabetes: cleanData.diabetes,
    },
    analysis: {
      hasHeartDisease: analysis.hasHeartDisease,
      riskLevel,
    },
    generatedAt: new Date().toISOString(),
  });
};

/**
 * GET /api/patients/summary
 * Researcher only
 */
export const getPatientSummary = (req, res) => {
  const patients = getPatients();

  let highRisk = 0;
  let lowRisk = 0;

  patients.forEach((p) => {
    const cleanData = preprocess(p);
    const analysis = analyze(cleanData);
    const riskLevel = classifyRisk(
      analysis.hasHeartDisease,
      analysis.riskFlags
    );

    if (riskLevel === "HIGH") highRisk++;
    else lowRisk++;
  });

  res.json({
    totalPatients: patients.length,
    highRisk,
    lowRisk,
  });
};
