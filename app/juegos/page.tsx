import Link from "next/link";

export default function JuegosPage() {
  const generos = [
    "Accion", "Supervivencia", "Terror", "Indie", 
    "Infantil", "Reflejos", "Puzles", "Coleccion"
  ];

  return (
    <div className="p-20 text-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-orange-600 uppercase tracking-tighter">
        Catálogo de Videojuegos
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Explora la colección completa de títulos de Steami.
      </p>

      {/* --- SECCIÓN DE MENÚ DE GÉNEROS --- */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Elige un género:</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {generos.map((genero) => (
            <Link 
              key={genero} 
              href={`/juegos/${genero.toLowerCase()}`}
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-600 hover:text-white transition-colors border border-orange-200"
            >
              {genero}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-10 p-10 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
        Lista de juegos próximamente...
      </div>
    </div>
  );
}
