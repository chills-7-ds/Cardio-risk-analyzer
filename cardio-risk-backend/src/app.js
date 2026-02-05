import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import { protect } from "./middleware/authMiddleware.js";
import patientRoutes from "./routes/patientRoutes.js";
import { loadPatientData } from "./config/patientDataLoader.js";

const app = express();

app.use(cors());
app.use(express.json());

// auth routes
app.use("/api/auth", authRoutes);

// health check
app.get("/api/health", (req, res) => {
  res.send("Server running");
});

// 🔐 protected test route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user,
  });
});

// load static patient dataset ONCE
loadPatientData();

// read-only patient routes
app.use("/api/patients", patientRoutes);

export default app;
