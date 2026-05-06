'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase"; // Importamos tu conexión
import Link from 'next/link';

interface Juego {
  id: number;
  titulo: string;
  descripcion: string;
  imagen_portada: string; // Aquí viene la URL de Supabase
}

export default function JuegosPage() {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  const generos = ["Accion", "Supervivencia", "Terror", "Indie", "Infantil", "Reflejos", "Puzles", "Coleccion"];

  useEffect(() => {
    const leerJuegos = async () => {
      // Llamamos a tu tabla 'video_juego'
      const { data, error } = await supabase
        .from('video_juego')
        .select('*');

      if (data) setJuegos(data);
      if (error) console.error("Error cargando juegos:", error);
    };
    leerJuegos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-10">
      
      <header className="text-center mb-12">
    <h1 className="text-5xl font-black text-[#ff6600] uppercase tracking-tighter mb-4">
        Catálogo de Videojuegos
    </h1>
    <p className="text-gray-300 text-lg font-light">
        Tu enciclopedia definitiva: historia, versiones y detalles de tus títulos favoritos.
    </p>
</header>

      {/* Filtros de Género */}
      <nav className="flex flex-wrap justify-center gap-3 mb-16">
        {generos.map((gen) => (
          <Link key={gen} href={`/juegos/${gen.toLowerCase()}`}>
            <button className="px-5 py-2 bg-[#1a2436] border border-gray-700 rounded-full text-sm hover:bg-[#ff6600] transition-all">
              {gen}
            </button>
          </Link>
        ))}
      </nav>

      {/* Grid Dinámico con imágenes de Supabase */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {juegos.map((juego) => (
          <div key={juego.id} className="bg-[#162031] border border-gray-800 rounded-2xl overflow-hidden group">
            <div className="h-52 bg-black overflow-hidden flex items-center justify-center">
              {/* Usamos la columna imagen_portada de tu tabla */}
              <img 
                src={juego.imagen_portada} 
                alt={juego.titulo} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400x225?text=Sin+Imagen'; }}
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">{juego.titulo}</h3>
              <p className="text-gray-400 text-sm mb-6">{juego.descripcion}</p>
              <button className="w-full bg-[#ff6600] hover:bg-[#e65c00] text-white font-bold py-3 rounded-xl uppercase text-sm">
                Ver Detalles
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}