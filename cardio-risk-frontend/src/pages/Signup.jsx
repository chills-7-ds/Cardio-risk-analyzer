import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.role)
      return "All required fields must be filled.";
    if (formData.role === "DOCTOR" && !formData.specialization)
      return "Specialization is required for doctors.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
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
          formData.role === "DOCTOR"
            ? formData.specialization.trim()
            : undefined,
      });

      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div>
            <label className="block text-sm font-medium mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  role: e.target.value,
                  specialization: "",
                })
              }
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
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
            />
          )}

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md font-semibold
                       hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>
      </Card>
    </div>
  );
}
