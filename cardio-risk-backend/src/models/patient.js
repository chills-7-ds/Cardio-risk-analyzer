// Read-only logical model (NOT a Mongoose schema)
export default class Patient {
  constructor(data) {
    this.patientId = data.patientId;
    this.age = data.age;
    this.gender = data.gender;
    this.cholesterol = data.cholesterol;
    this.bloodPressure = data.bloodPressure;
    this.heartRate = data.heartRate;
    this.diabetes = data.diabetes;
    this.ecg = data.ecg;
  }
}

