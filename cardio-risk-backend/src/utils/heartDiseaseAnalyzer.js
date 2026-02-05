export default function detectHeartDisease(patient) {
  let riskFlags = 0;

  if (patient.cholesterol > 240) riskFlags++;
  if (patient.bloodPressure > 140) riskFlags++;
  if (patient.heartRate < 60 || patient.heartRate > 100) riskFlags++;
  if (patient.diabetes) riskFlags++;

  return {
    hasHeartDisease: riskFlags >= 2,
    riskFlags
  };
}


