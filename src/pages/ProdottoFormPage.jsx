// src/pages/ProdottoFormPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/client";

export default function ProdottoFormPage() {
  const { id } = useParams(); // se c'è, è edit
  const navigate = useNavigate();

  const [titolo, setTitolo] = useState("");
  const [prezzo, setPrezzo] = useState("");
  const [quantita, setQuantita] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [immagine, setImmagine] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [error, setError] = useState(null);

  const [categorie, setCategorie] = useState([]);
  const [uploading, setUploading] = useState(false);

  const isEdit = !!id;

  // Cloudinary config
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  // Carica categorie dal backend
  const fetchCategorie = async () => {
    try {
      const res = await api.get("/categorie");
      setCategorie(res.data);
    } catch (err) {
      console.error("Errore caricamento categorie", err);
    }
  };

  useEffect(() => {
    fetchCategorie();

    if (isEdit) {
      api
        .get(`/prodotti/${id}`)
        .then((res) => {
          const p = res.data;
          setTitolo(p.titolo);
          setPrezzo(p.prezzo);
          setQuantita(p.quantita);
          setCategoriaId(p.categoria_id || "");
          setImmagine(p.immagine || "");
          setDescrizione(p.descrizione || "");
        })
        .catch((err) => {
          console.error("Errore caricamento prodotto", err);
        });
    }
  }, [id, isEdit]);

  // Upload immagine su Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (data.secure_url) {
        setImmagine(data.secure_url);
      } else {
        setError("Errore Cloudinary: " + data.error?.message);
      }
    } catch (err) {
      console.error("Errore upload Cloudinary", err);
      setError("Errore durante il caricamento dell'immagine");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = {
      titolo,
      prezzo: parseFloat(prezzo),
      quantita: parseInt(quantita, 10),
      categoria_id: categoriaId ? parseInt(categoriaId, 10) : null,
      immagine: immagine || null,
      descrizione: descrizione || null,
    };

    try {
      if (isEdit) {
        await api.put(`/prodotti/${id}`, payload);
      } else {
        await api.post("/prodotti", payload);
      }
      navigate("/");
    } catch (err) {
      console.error("Errore salvataggio prodotto", err);
      setError("Errore nel salvataggio del prodotto");
    }
  };

  return (
    <div className="max-w-xl mx-auto animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6">
        {isEdit ? "Modifica prodotto" : "Nuovo prodotto"}
      </h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* TITOLO */}
        <div>
          <label className="block mb-1 font-medium">Titolo</label>
          <input
            value={titolo}
            onChange={(e) => setTitolo(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
          />
        </div>

        {/* PREZZO */}
        <div>
          <label className="block mb-1 font-medium">Prezzo</label>
          <input
            type="number"
            step="0.01"
            value={prezzo}
            onChange={(e) => setPrezzo(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
          />
        </div>

        {/* QUANTITA */}
        <div>
          <label className="block mb-1 font-medium">Quantità</label>
          <input
            type="number"
            value={quantita}
            onChange={(e) => setQuantita(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
          />
        </div>

        {/* SELECT CATEGORIA */}
        <div>
          <label className="block mb-1 font-medium">Categoria</label>
          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-black"
          >
            <option value="">Seleziona categoria</option>
            {categorie.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </select>
        </div>

        {/* UPLOAD IMMAGINE */}
        <div>
          <label className="block mb-1 font-medium">Immagine prodotto</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg"
          />

          {uploading && (
            <p className="text-gray-500 text-sm mt-2">Caricamento immagine...</p>
          )}

          {immagine && (
            <div className="mt-3">
              <img
                src={immagine}
                alt="Anteprima"
                className="w-32 h-32 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>

        {/* DESCRIZIONE */}
        <div>
          <label className="block mb-1 font-medium">Descrizione</label>
          <textarea
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
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
