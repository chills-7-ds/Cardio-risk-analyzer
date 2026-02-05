import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePatientPDF = (report) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(18);
  doc.text("Cardio Risk Analyzer – Patient Report", 14, 20);

  doc.setFontSize(11);
  doc.text(`Patient ID: ${report.patientId}`, 14, 30);
  doc.text(`Generated At: ${new Date(report.generatedAt).toLocaleString()}`, 14, 36);

  // Demographics
  doc.setFontSize(14);
  doc.text("Demographics", 14, 50);

  doc.autoTable({
    startY: 55,
    head: [["Age", "Gender"]],
    body: [[
      report.demographics.age,
      report.demographics.gender
    ]]
  });

  // Vitals
  doc.text("Vital Parameters", 14, doc.lastAutoTable.finalY + 15);

  doc.autoTable({
    startY: doc.lastAutoTable.finalY + 20,
    head: [["Cholesterol", "Blood Pressure", "Heart Rate"]],
    body: [[
      report.vitals.cholesterol,
      report.vitals.bloodPressure,
      `${report.vitals.heartRate} bpm`
    ]]
  });

  // Risk
  doc.text("Risk Assessment", 14, doc.lastAutoTable.finalY + 15);

  const riskColor =
    report.analysis.riskLevel === "HIGH"
      ? [255, 0, 0]
      : report.analysis.riskLevel === "MEDIUM"
      ? [255, 165, 0]
      : [0, 128, 0];

  doc.setTextColor(...riskColor);
  doc.setFontSize(16);
  doc.text(`${report.analysis.riskLevel} RISK`, 14, doc.lastAutoTable.finalY + 30);

  doc.setTextColor(0, 0, 0);

  // Footer
  doc.setFontSize(10);
  doc.text(
    "This report is generated automatically by Cardio Risk Analyzer.",
    14,
    285
  );

  doc.save(`Patient_${report.patientId}_Report.pdf`);
};
