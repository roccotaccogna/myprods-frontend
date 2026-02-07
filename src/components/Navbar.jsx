// src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className='max-w-6xl mx-auto px-4 py-4 flex items-center justify-between'>

        <Link 
          to="/" 
          className='text-2xl font-bold tracking-tight'
        >
          MyProds
        </Link>
        <div className='flex items-center gap-6 text-sm font-medium'>
          <Link 
            to="/" 
            className="hover:text-gray-600"
          >
            Prodotti
          </Link>
          <Link 
            to="/categorie"
            className='hover:text-gray-600'
          >
            Categorie
          </Link>

          {!isAuthenticated && (
            <>
              <Link 
                to="/login"
                className='hover:text-gray-600'
              > 
                Login 
              </Link>
              <Link 
                to="/register"
                className='hover:text-gray-600'
              > 
                Registrati 
              </Link>
            </>
          )}
        </div>
      {isAuthenticated && (
        <>
          <span className="text-gray-600">
            {user.email} ({user.ruolo})
          </span>
          <button onClick={logout} className="hover:text-gray-600" >
            Logout
          </button>
        </>
      )}
      {isAdmin && (
        <>
          <Link 
            to="/prodotti/nuovo"
            className='hover:text-gray-600'
          >
            Nuovo prodotto
          </Link>
          <Link 
            to="/categorie/nuova"
            className='hover:text-gray-600'
          >
            Nuova categoria
          </Link>
        </>
      )}
      </div>
    </nav>
  );
}
