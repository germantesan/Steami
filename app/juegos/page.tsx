import Link from "next/link";
import { supabase } from '@/lib/supabase'; // Importamos la conexión

// Definimos la estructura del juego para TypeScript
interface Juego {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_portada: string;
  id_categoria: number;
}

// Cambiamos la función a 'async' para poder pedir los datos
export default async function JuegosPage() {
  const generos = [
    "Accion", "Supervivencia", "Terror", "Indie",
    "Infantil", "Reflejos", "Puzles", "Coleccion"
  ];

  // Llamamos a Supabase para traer los juegos
  const { data: juegos, error } = await supabase
    .from('video_juego')
    .select('*');

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
              className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-600 hover:text-white transition-colors"
            >
              {genero}
            </Link>
          ))}
        </div>
      </div>

      {/* --- SECCIÓN DINÁMICA DE JUEGOS --- */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {juegos && juegos.length > 0 ? (
          juegos.map((juego: Juego) => (
            <div key={juego.id} className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-200">
                <img 
                  src={juego.imagen_portada || 'https://via.placeholder.com/400x225?text=Sin+Imagen'} 
                  alt={juego.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{juego.titulo}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {juego.descripcion}
              </p>
              <button className="w-full py-2 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors uppercase text-sm tracking-wider">
                Comprar Ahora
              </button>
            </div>
          ))
        ) : (
          <div className="col-span-full p-10 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            {error ? `Error al conectar: ${error.message}` : "No se encontraron juegos en la base de datos."}
          </div>
        )}
      </div>
    </div>
  );
}