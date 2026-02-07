import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../hooks/useAuth";

export default function ProdottoDettaglioPage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();

  const [prodotto, setProdotto] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProdotto = async () => {
    try {
      const res = await api.get(`/prodotti/${id}`);
      setProdotto(res.data);
    } catch (err) {
      console.error("Errore caricamento prodotto", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdotto();
  }, [id]);

  if (loading) return <div className="text-gray-600">Caricamento...</div>;
  if (!prodotto) return <div>Prodotto non trovato.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fadeIn">
      
      {/* IMMAGINE GRANDE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {prodotto.immagine ? (
          <img
            src={prodotto.immagine}
            alt={prodotto.titolo}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-96 text-gray-400">
            Nessuna immagine
          </div>
        )}
      </div>

      {/* INFO PRODOTTO */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">{prodotto.titolo}</h1>

        <p className="text-gray-600 text-lg mb-4">{prodotto.descrizione}</p>

        <p className="text-3xl font-bold mb-2">{prodotto.prezzo} €</p>

        <p className="text-gray-700 mb-6">
          Quantità disponibile: <strong>{prodotto.quantita}</strong>
        </p>

        <p className="text-gray-600 mb-6">
          Categoria: <strong>{prodotto.categoria_nome || "-"}</strong>
        </p>

        {/* PULSANTI ADMIN */}
        {isAdmin && (
          <div className="flex gap-4 mt-4">
            <Link
              to={`/prodotti/${prodotto.id}`}
              className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Modifica
            </Link>

            <Link
              to="/prodotti"
              className="px-6 py-3 bg-gray-200 text-black rounded-lg font-semibold hover:bg-gray-300 transition"
            >
              Torna ai prodotti
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}