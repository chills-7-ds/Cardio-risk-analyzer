import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import InputField from "../components/InputField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const isValid = email.includes("@") && password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setError("");

    try {
      const data = await loginUser({ email, password });
      login({
        token: data.token,
        role: data.role,
        userInfo: data.user,
      });

      navigate(
        data.role === "Doctor"
          ? "/doctor-dashboard"
          : "/researcher-dashboard"
      );
    } catch (err) {
      setPassword("");
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-1">
          Cardio Risk Analyzer
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Secure access for doctors & researchers
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            placeholder="doctor@example.com"
          />

          <InputField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            placeholder="••••••••"
          />

          {error && (
            <p className="text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!isValid || loading}
            className="w-full py-2.5 rounded-md bg-blue-600 text-white font-semibold
                       hover:bg-blue-700 disabled:opacity-60 transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </Card>
    </div>
  );
}
