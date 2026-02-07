// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from "./components/AdminRoute.jsx";

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProdottiListPage from './pages/ProdottiListPage';
import ProdottoFormPage from './pages/ProdottoFormPage';
import CategorieListPage from './pages/CategorieListPage';
import CategorieFormPage from './pages/CategorieFormPage';
import ProdottoDettaglioPage from "./pages/ProdottoDettaglioPage";


export default function App() {
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-500 text-black font-sans">
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8 animate-fadeInSlow">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ProdottiListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prodotti/dettaglio/:id"
            element={
              <ProtectedRoute>
                <ProdottoDettaglioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/prodotti/nuovo"
            element={
              <AdminRoute>
                <ProdottoFormPage />
              </AdminRoute>
            }
          />
          <Route
            path="/prodotti/:id"
            element={
              <AdminRoute>
                <ProdottoFormPage />
              </AdminRoute>
            }
          />

          <Route
            path="/categorie"
            element={
              <ProtectedRoute>
                <CategorieListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/categorie/nuova"
            element={
              <AdminRoute>
                <CategorieFormPage />
              </AdminRoute>
            }
          />
          <Route
            path="/categorie/:id"
            element={
              <AdminRoute>
                <CategorieFormPage />
              </AdminRoute>
            }
          />

          <Route 
            path="/login" 
            element={<LoginPage />} 
          />
          <Route 
            path="/register" 
            element={<RegisterPage />} 
          />

        </Routes>
      </main>
    </div>
    <Footer />
    </>
  );
}
