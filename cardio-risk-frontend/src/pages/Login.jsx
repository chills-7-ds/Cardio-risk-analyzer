import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import Card from "../components/Card";
import InputField from "../components/InputField";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT BRAND PANEL */}
      <div className="hidden lg:flex flex-col justify-center px-16
                      bg-gradient-to-br from-blue-600 via-blue-500 to-teal-500
                      text-white">
        <h1 className="text-4xl font-bold mb-6 leading-tight">
          Cardio Risk<br />Analyzer
        </h1>

        <p className="text-lg text-blue-100 max-w-md">
          An intelligent clinical decision‑support platform empowering
          healthcare professionals to assess cardiovascular risk with clarity
          and confidence.
        </p>

        <div className="mt-10 text-sm text-blue-200">
          Trusted by clinicians • Research‑driven • Secure by design
        </div>
      </div>

      {/* RIGHT LOGIN CARD */}
      <div className="flex items-center justify-center bg-[var(--bg)] px-4">
        <Card className="w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-center mb-2">
            Welcome Back
          </h2>

          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to Cardio Risk Analyzer
          </p>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@hospital.com"
              disabled={loading}
            />

            <InputField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading}
            />

            {error && (
              <p className="text-sm text-red-600 text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={!isValid || loading}
              className="w-full py-3 rounded-lg font-semibold text-white
                         bg-gradient-to-r from-blue-600 to-teal-500
                         hover:opacity-95 transition
                         disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-6">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Create one
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
