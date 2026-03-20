export default function JuegosPage() {
  return (
    <div className="p-20 text-center min-h-screen bg-white">
      <h1 className="text-4xl font-bold text-orange-600 uppercase tracking-tighter">
        Catálogo de Videojuegos
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Explora la colección completa de títulos de Steami.
      </p>
      <div className="mt-10 p-10 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
        Lista de juegos próximamente...
      </div>
    </div>
  );
}