🫀 Cardio Risk Analyzer
A role‑based full‑stack web application that analyzes patient health data to assess cardiovascular risk, enabling doctors to view individual reports and researchers to access aggregated risk insights.

🚀 Features
👨‍⚕️ Doctor Module
Secure login & role-based access

View all assigned patients

Access detailed patient risk reports

Individual cardiovascular risk analysis

🔬 Researcher Module
Secure login

Dashboard with:

Total patients count

High-risk patients

Low-risk patients

Aggregated, privacy-safe insights (no individual patient data)

🧠 Risk Analysis Engine
Preprocesses patient health data

Applies rule-based risk classification

Categorizes patients into High Risk and Low Risk

Built for clarity, transparency, and extensibility

🛠️ Tech Stack
Frontend
React

React Router

Tailwind CSS

Axios

Backend
Node.js

Express.js

JWT Authentication

Role-Based Access Control (RBAC)

Data & Analysis
CSV-based patient dataset

Custom risk analysis logic

Data preprocessing & classification

📂 Project Structure
Cardio-Risk-Analyzer/
├── cardio-risk-frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── services/
├── cardio-risk-backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   └── utils/
├── heart.csv
├── LICENSE
└── README.md
🔐 Authentication & Security
JWT-based authentication

Protected API routes

Strict role-based authorization

Separate access levels for Doctors and Researchers

▶️ Getting Started
Backend
cd cardio-risk-backend
npm install
npm run dev
Frontend
cd cardio-risk-frontend
npm install
npm run dev
📊 Use Case
This project is ideal for:

Academic projects

Health-tech prototypes

Demonstrating full-stack & RBAC concepts

Data-driven healthcare dashboards

📜 License
This project is licensed under the MIT License.

✨ Built with a focus on clarity, security, and real-world healthcare workflows.
