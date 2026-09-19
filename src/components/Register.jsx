import { useState } from "react";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registered, setRegistered] = useState(false);

  const register = async (event) => {
    event.preventDefault();

    if (!email.trim() || !username.trim() || !password) {
      setError("Email, username, and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${backendUrl}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          username,
          password,
          displayName,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Could not create account");
      }

      // Registration successful
      setRegistered(true);
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

          {!registered && (
            <Link
              to="/login"
              className="px-5 py-2 text-sm border border-white/15 rounded-md font-medium hover:bg-white/5 transition"
            >
              LogIn
            </Link>
          )}
        </div>
      </nav>

      <div className="max-w-md mx-auto px-6 py-24">
        {registered ? (
          <div className="text-center">
            <div className="text-5xl mb-6">✉️</div>

            <h1 className="text-4xl font-semibold tracking-tighter mb-4">
              Verify your email
            </h1>

            <p className="text-white/50 leading-relaxed mb-3">
              We've sent a verification link to:
            </p>

            <p className="text-white font-medium mb-8 break-all">
              {email}
            </p>

            <p className="text-sm text-white/40 leading-relaxed mb-8">
              Check your inbox and click the verification link to activate
              your ProTip account. The link will expire in 30 minutes.
            </p>

            <Link
              to="/login"
              className="inline-block px-6 py-3 rounded-md bg-white text-black font-medium hover:bg-white/90 transition"
            >
              Go to Login
            </Link>

            <p className="mt-6 text-xs text-white/30">
              Don't see the email? Check your spam or junk folder.
            </p>
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-semibold tracking-tighter mb-3">
              Create your dashboard
            </h1>

            <p className="text-white/50 mb-10 tracking-tight">
              Register as a streamer to receive tips and manage overlays.
            </p>

            <form onSubmit={register} className="space-y-4">
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:border-white/40"
              />

              <input
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Username (your channel name)"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:border-white/40"
              />

              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Display name (optional)"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:border-white/40"
              />

              <input
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Password (min 8 characters)"
                className="w-full px-4 py-3 rounded-md bg-white/5 border border-white/10 text-white outline-none focus:border-white/40"
              />

              {error && (
                <p className="text-sm text-red-400">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-md bg-white text-black font-medium disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Get started"}
              </button>
            </form>

            <p className="mt-8 text-sm text-white/40">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-white hover:underline"
              >
                Login
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}