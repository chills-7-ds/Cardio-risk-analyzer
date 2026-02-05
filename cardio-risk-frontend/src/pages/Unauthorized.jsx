import React from "react";
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403</h1>
      <h2 className="text-xl font-semibold mb-2">Unauthorized Access</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        You do not have permission to access this page. If you believe this is a
        mistake, please contact the administrator.
      </p>

      <Link
        to="/login"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go to Login
      </Link>
    </div>
  );
}
