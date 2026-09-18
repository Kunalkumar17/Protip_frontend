import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (event) => {
    event.preventDefault();

    if (!identifier.trim() || !password) {
      setError("Enter your email/username and password");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-16 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold tracking-tight">
            ProTip
          </Link>
          <Link
            to="/register"
            className="px-5 py-2 text-sm bg-white text-black rounded-md font-medium hover:shadow-lg hover:shadow-white/20 transition"
          >
            Create account
          </Link>
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 py-24">
        <h1 className="text-4xl font-semibold tracking-tighter mb-3">
          Streamer login
        </h1>
        <p className="text-white/50 mb-10 tracking-tight">
          Login to manage tips, goals, and overlays.
        </p>

        <form onSubmit={login} className="space-y-4">
          <input
            autoComplete="username"
            value={identifier}
            onChange={(e) => {
              setIdentifier(e.target.value);
              setError("");
            }}
            placeholder="Email or username"
            className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:border-white/40"
          />

          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:border-white/40"
          />

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-md bg-white text-black font-medium disabled:opacity-50"
          >
            {loading ? "Logging in..." : "LogIn"}
          </button>
        </form>

        <p className="mt-8 text-sm text-white/40">
          New here?{" "}
          <Link to="/register" className="text-white hover:underline">
            Create a streamer account
          </Link>
        </p>
      </div>
    </div>
  );
}
