import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-950 px-4">
      {/* decorative glows */}
      <div className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-500 font-serif text-2xl font-bold text-navy-900">
            GC
          </span>
          <h1 className="mt-4 font-serif text-2xl font-bold text-white">
            Grace Community Church
          </h1>
          <p className="mt-1 text-sm text-white/60">Admin Dashboard</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl bg-white p-8 shadow-2xl"
        >
          <h2 className="font-serif text-xl font-semibold text-navy-900">
            Sign In
          </h2>
          <p className="mt-1 text-sm text-navy-500">
            Enter your admin credentials to continue.
          </p>

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          )}

          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-xs font-semibold uppercase tracking-wider text-navy-500"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gracechurch.org"
              className="mt-1.5 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="text-xs font-semibold uppercase tracking-wider text-navy-500"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 w-full rounded-lg border border-navy-100 bg-navy-50 px-4 py-3 text-sm text-navy-900 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-gold-500 py-3 text-sm font-bold text-navy-900 shadow-lg transition hover:bg-gold-400 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="mt-4 text-center text-xs text-navy-400">
            Default: admin@gracechurch.org / admin123
          </p>
        </form>
      </div>
    </div>
  );
}
