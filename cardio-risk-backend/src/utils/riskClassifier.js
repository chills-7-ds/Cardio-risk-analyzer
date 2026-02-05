export default function classifyRisk(hasHeartDisease, riskFlags) {
  if (hasHeartDisease && riskFlags >= 2) {
    return 'HIGH';
  }
  return 'LOW';
}



