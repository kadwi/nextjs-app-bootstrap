"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // For simplicity, password is checked on client side here.
    // In production, implement secure server-side authentication.
    if (password === "admin123") {
      router.push("/admin/dashboard");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="max-w-sm w-full bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
        >
          Login
        </button>
      </div>
    </main>
  );
}
