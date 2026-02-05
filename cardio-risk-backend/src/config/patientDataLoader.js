import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { fileURLToPath } from "url";
import Patient from "../models/patient.js";

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let patients = [];

export function loadPatientData() {
  const filePath = path.join(__dirname, "../../../heart.csv");
  let counter = 1;

  console.log("⏳ Loading patient data from CSV...");

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      const patient = new Patient({
        patientId: counter++,
        age: Number(row.age),
        gender: row.sex === "1" ? "Male" : "Female",
        cholesterol: Number(row.chol),
        bloodPressure: Number(row.trestbps),
        heartRate: Number(row.thalach),
        diabetes: Number(row.fbs) === 1,
        ecg: Number(row.restecg),
      });

      patients.push(patient);
    })
    .on("end", () => {
      console.log(`✔ Loaded ${patients.length} patient records`);
      console.log("Patient IDs:", patients.map((p) => p.patientId));
    });
}

export function getPatients() {
  return patients;
}
