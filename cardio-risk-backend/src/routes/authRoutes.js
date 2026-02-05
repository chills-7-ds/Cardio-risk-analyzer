import express from "express";
import { signup, login } from "../controllers/authController.js";
import { protect, allowRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/login", login);

// Protected test route (any authenticated user)
router.get("/protected-test", protect, (req, res) => {
  res.json({
    message: "Access granted",
    user: req.user
  });
});

// Role-based routes
router.get("/doctor-only", protect, allowRoles("Doctor"), (req, res) => {
  res.json({ message: "Doctor access granted" });
});

router.get(
  "/researcher-only",
  protect,
  allowRoles("Researcher"),
  (req, res) => {
    res.json({ message: "Researcher access granted" });
  }
);

export default router;
