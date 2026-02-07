export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-300 py-10 bg-white bg-opacity-70 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 text-gray-600 text-sm">

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          <div>
            <h3 className="font-semibold mb-3 text-black">MyProds</h3>
            <p className="text-gray-500">
              La tua piattaforma per gestire prodotti e categorie con stile.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-black">Link utili</h3>
            <ul className="space-y-2">
              <li><a className="hover:text-black transition" href="/">Prodotti</a></li>
              <li><a className="hover:text-black transition" href="/categorie">Categorie</a></li>
              <li><a className="hover:text-black transition" href="/login">Login</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 text-black">Contatti</h3>
            <p className="text-gray-500">Email: support@myprods.com</p>
            <p className="text-gray-500">Telefono: +39 000 000 0000</p>
          </div>
        </div>

        <div className="text-center text-gray-400 text-xs">
          © {new Date().getFullYear()} MyProds — Tutti i diritti riservati.
        </div>
      </div>
    </footer>
  );
}