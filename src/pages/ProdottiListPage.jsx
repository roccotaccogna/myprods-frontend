import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../hooks/useAuth";

export default function ProdottiListPage() {
  const [prodotti, setProdotti] = useState([]);
  const [loading, setLoading] = useState(true);

  const [prezzoMin, setPrezzoMin] = useState("");
  const [prezzoMax, setPrezzoMax] = useState("");

  const { isAdmin } = useAuth();

  const fetchProdotti = async () => {
    setLoading(true);
    try {
      const params = {};
      if (prezzoMin) params.prezzo_min = prezzoMin;
      if (prezzoMax) params.prezzo_max = prezzoMax;

      const res = await api.get("/prodotti", { params });
      setProdotti(res.data);
    } catch (err) {
      console.error("Errore nel caricamento prodotti", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdotti();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Sei sicuro di voler eliminare questo prodotto?")) return;
    try {
      await api.delete(`/prodotti/${id}`);
      fetchProdotti();
    } catch (err) {
      console.error("Errore eliminazione prodotto", err);
    }
  };

  const handleFilter = (e) => {
    e.preventDefault();
    fetchProdotti();
  };

  if (loading) return <div className="text-gray-600">Caricamento prodotti...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Prodotti</h1>

      {/* FILTRI SENZA ID */}
      <form
        onSubmit={handleFilter}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 bg-white p-4 rounded-xl shadow-sm border border-gray-200"
      >
        <input
          type="number"
          placeholder="Prezzo minimo"
          value={prezzoMin}
          onChange={(e) => setPrezzoMin(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
        />

        <input
          type="number"
          placeholder="Prezzo massimo"
          value={prezzoMax}
          onChange={(e) => setPrezzoMax(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-black"
        />

        <button
          type="submit"
          className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-gray-800 transition"
        >
          Filtra
        </button>
      </form>

      {/* GRID DI CARD PRODOTTI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {prodotti.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition animate-scaleIn"
          >
            {/* IMMAGINE */}
            <div className="aspect-square bg-gray-100 rounded-t-xl overflow-hidden">
              {p.immagine ? (
                <img
                  src={p.immagine}
                  alt={p.titolo}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Nessuna immagine
                </div>
              )}
            </div>

            {/* INFO */}
            <div className="p-4">
              <h2 className="text-xl font-semibold">{p.titolo}</h2>
              <p className="text-gray-600 mt-1">{p.categoria_nome || "-"}</p>

              <p className="text-black font-bold mt-2">{p.prezzo} €</p>
              <p className="text-gray-600 text-sm">Quantità: {p.quantita}</p>

              {/* AZIONI ADMIN */}
              {isAdmin && (
                <div className="mt-4 flex gap-3">
                  <Link
                    to={`/prodotti/dettaglio/${p.id}`}
                    className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                  >
                    Modifica
                  </Link>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Elimina
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* PULSANTE AGGIUNGI PRODOTTO */}
      {isAdmin && (
        <div className="mt-8">
          <Link
            to="/prodotti/nuovo"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            + Aggiungi prodotto
          </Link>
        </div>
      )}
    </div>
  );
}
