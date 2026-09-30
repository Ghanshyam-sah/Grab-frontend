import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-6 py-20">
      <h1 className="font-display text-3xl mb-8 text-ink">Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email" placeholder="Email" required
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        <input
          type="password" placeholder="Password" required
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border border-stone/40 bg-transparent px-3 py-2"
        />
        {error && <p className="text-rust text-sm">{error}</p>}
        <button
          type="submit" disabled={loading}
          className="bg-ink text-sand py-3 text-sm tracking-wide hover:bg-olive transition-colors disabled:opacity-50"
        >
          {loading ? "Logging in…" : "Log in"}
        </button>
      </form>
      <p className="text-sm text-ink/60 mt-6">
        No account? <Link to="/register" className="text-ink underline">Register</Link>
      </p>
    </div>
  );
}
