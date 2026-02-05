// src/routes/patientRoutes.js

import express from "express";
import { protect, allowRoles } from "../middleware/authMiddleware.js";
import {
  getAllPatients,
  getPatientReport,
  getPatientSummary,
} from "../controllers/patientController.js";

const router = express.Router();

/**
 * Researcher summary (MUST BE FIRST)
 */
router.get(
  "/summary",
  protect,
  allowRoles("Researcher"),
  getPatientSummary
);

/**
 * All patients (Doctor + Researcher)
 */
router.get(
  "/",
  protect,
  allowRoles("Doctor", "Researcher"),
  getAllPatients
);

/**
 * Single patient report (Doctor only)
 */
router.get(
  "/:id",
  protect,
  allowRoles("Doctor"),
  getPatientReport
);

export default router;
