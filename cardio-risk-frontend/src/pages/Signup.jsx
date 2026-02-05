import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../services/authService";
import Card from "../components/Card";
import InputField from "../components/InputField";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    specialization: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await signupUser({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role === "DOCTOR" ? "Doctor" : "Researcher",
        specialization:
          formData.role === "DOCTOR" ? formData.specialization.trim() : undefined,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      
      {/* LEFT BRAND PANEL */}
      <div className="hidden md:flex flex-col justify-center px-16 bg-gradient-to-br from-blue-600 to-teal-500 text-white">
        <h1 className="text-4xl font-bold mb-4 leading-tight">
          Cardio Risk <br /> Analyzer
        </h1>
        <p className="text-lg text-blue-100 max-w-md">
          A smart clinical decision-support platform helping doctors and researchers
          assess cardiovascular risk with confidence.
        </p>
        <div className="mt-10 text-sm text-blue-100">
          Secure • Research-driven • Healthcare-focused
        </div>
      </div>

      {/* RIGHT FORM PANEL */}
      <div className="flex items-center justify-center px-6 bg-[var(--bg)]">
        <Card className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-center mb-1">
            Create Account
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Join as a Doctor or Researcher
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Dr. John Doe"
            />

            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />

            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value, specialization: "" })
                }
                className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Role</option>
                <option value="DOCTOR">Doctor</option>
                <option value="RESEARCHER">Researcher</option>
              </select>
            </div>

            {formData.role === "DOCTOR" && (
              <InputField
                label="Specialization"
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Cardiology"
              />
            )}

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-teal-500
                         text-white font-semibold tracking-wide
                         hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
