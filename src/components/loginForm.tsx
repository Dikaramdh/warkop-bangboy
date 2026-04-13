"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || "Login gagal");
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1.5">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2.5 border border-amber-200 rounded-xl bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          placeholder="admin@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-amber-900 mb-1.5">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2.5 border border-amber-200 rounded-xl bg-amber-50/40 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
          placeholder="********"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 rounded-xl text-sm font-semibold text-amber-50 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 transition-colors"
      >
        {loading ? "Memproses..." : "Masuk"}
      </button>
    </form>
  );
};
