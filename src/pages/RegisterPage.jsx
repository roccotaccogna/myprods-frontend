import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) return setError("Email non valida");
    if (password.length < 6) return setError("Minimo 6 caratteri");
    if (password !== confirm) return setError("Le password non coincidono");

    try {
      setLoading(true);
      await signup(email, password);
      navigate("/");
    } catch {
      setError("Registrazione fallita");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Crea un account</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Conferma password"
          className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:ring-2 focus:ring-black"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          {loading ? "Registrazione..." : "Registrati"}
        </button>
      </form>

      <p className="mt-4 text-gray-600">
        Hai già un account?{" "}
        <Link to="/login" className="text-black underline">
          Accedi
        </Link>
      </p>
    </div>
  );
}
