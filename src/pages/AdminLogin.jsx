import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminApi } from "../api/adminApi";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      await adminApi.login(username, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#080808] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold">
            Pro<span className="text-purple-500">Tip</span>
          </h1>

          <p className="text-gray-500 mt-2">
            Admin Dashboard
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#111] border border-white/10 rounded-2xl p-7 shadow-2xl"
        >
          <h2 className="text-xl font-semibold mb-6">
            Admin Login
          </h2>

          {error && (
            <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded-lg bg-[#181818] border border-white/10 px-4 py-3 outline-none focus:border-purple-500"
              placeholder="admin"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-[#181818] border border-white/10 px-4 py-3 outline-none focus:border-purple-500"
              placeholder="••••••••"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-lg bg-purple-600 hover:bg-purple-500 disabled:opacity-50 py-3 font-medium transition"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}