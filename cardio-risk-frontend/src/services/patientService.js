// src/services/patientService.js
import api from "../api/api";

export const fetchPatients = () => {
  return api.get("/");
};

export const fetchPatientById = (id) => {
  return api.get(`/${id}`);
};
