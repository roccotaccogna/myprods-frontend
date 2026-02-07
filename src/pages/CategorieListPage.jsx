import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../hooks/useAuth";

export default function CategorieListPage() {
  const [categorie, setCategorie] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  const fetchCategorie = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categorie");
      setCategorie(res.data);
    } catch (err) {
      console.error("Errore caricamento categorie", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorie();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Eliminare questa categoria?")) return;
    try {
      await api.delete(`/categorie/${id}`);
      fetchCategorie();
    } catch (err) {
      console.error("Errore eliminazione categoria", err);
    }
  };

  if (loading) return <div className="text-gray-600">Caricamento categorie...</div>;

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Categorie</h1>

      {/* GRID DI CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categorie.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-6 fadeIn"
          >
            <h2 className="text-xl font-semibold">{c.nome}</h2>

            {isAdmin && (
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/categorie/${c.id}`}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                  Modifica
                </Link>

                <button
                  onClick={() => handleDelete(c.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Elimina
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isAdmin && (
        <div className="mt-8">
          <Link
            to="/categorie/nuova"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            + Aggiungi categoria
          </Link>
        </div>
      )}
    </div>
  );
}
