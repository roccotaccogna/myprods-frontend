// src/pages/CategorieFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";

export default function CategorieFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [error, setError] = useState(null);

  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      api
        .get(`/categorie/${id}`)
        .then((res) => {
          const c = res.data;
          setNome(c.nome);
        })
        .catch((err) => {
          console.error("Errore caricamento categoria", err);
        });
    }
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      nome
    };

    try {
      if (isEdit) {
        await api.put(`/categorie/${id}`, payload);
      } else {
        await api.post("/categorie", payload);
      }
      navigate("/categorie");
    } catch (err) {
      console.error("Errore salvataggio categoria", err);
      setError("Errore nel salvataggio della categoria");
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Modifica categoria" : "Nuova categoria"}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* NOME */}
        <div>
          <label className="block mb-1 font-medium">Nome categoria</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
          />
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Salva
        </button>
      </form>
    </div>
  );
}