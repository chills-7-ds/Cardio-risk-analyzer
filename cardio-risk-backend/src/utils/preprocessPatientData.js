export default function preprocessPatient(patient) {
  return {
    ...patient,
    cholesterol: patient.cholesterol || 200,
    bloodPressure: patient.bloodPressure || 120,
    heartRate: patient.heartRate || 70
  };
}


