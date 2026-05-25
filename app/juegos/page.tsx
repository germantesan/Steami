'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase"; 
import Link from 'next/link';

// Interfaz para que TypeScript reconozca los datos de Supabase
interface Juego {
  identificación: number; 
  titulo: string;
  descripcion: string;
  imagen_portada: string; 
}

export default function JuegosPage() {
  const [juegos, setJuegos] = useState<Juego[]>([]);
  // 1. Estado para almacenar lo que escribe el usuario en el buscador
  const [busqueda, setBusqueda] = useState("");
  
  const generos = ["Accion", "Supervivencia", "Terror", "Indie", "Infantil", "Reflejos", "Puzles", "Coleccion"];

  useEffect(() => {
    const leerJuegos = async () => {
      const { data, error } = await supabase
        .from('video_juego')
        .select('*');

      if (data) setJuegos(data);
      if (error) console.error("Error cargando juegos:", error);
    };
    leerJuegos();
  }, []);

  // 2. Filtrar los juegos en tiempo real según el título introducido
  const juegosFiltrados = juegos.filter((juego) =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-10 font-sans">
      
      <header id="catalogo" className="text-center mb-8">
        {/* TÍTULO EQUILIBRADO: Solo "Nuestro" en Blanco */}
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 italic">
            <span className="text-white">Nuestro</span> <span className="text-[#ff6600]">Catálogo de Videojuegos</span>
        </h1>
        <p className="text-gray-300 text-lg font-light italic">
            Tu enciclopedia definitiva: historia, plagios y detalles de tus títulos favoritos.
        </p>
      </header>

      {/* 3. BARRA DE BÚSQUEDA (Centrada y adaptada al diseño de STEAMIPRO) */}
      <div className="max-w-md mx-auto mb-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar videojuego por nombre..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full px-6 py-3 bg-[#162031] border border-white/10 rounded-full text-white placeholder-gray-400 text-sm focus:outline-none focus:border-[#ff6600] focus:ring-1 focus:ring-[#ff6600] transition-all shadow-md"
          />
          <span className="absolute right-5 top-3.5 text-gray-400 text-sm select-none">
            🔍
          </span>
        </div>
      </div>

      {/* Filtros de Género */}
      <nav className="flex flex-wrap justify-center gap-3 mb-16">
        {generos.map((gen) => (
          <Link key={gen} href={`/juegos/${gen.toLowerCase()}`}>
            <button className="px-5 py-2 bg-[#1a2436] border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#ff6600] hover:text-white transition-all">
              {gen}
            </button>
          </Link>
        ))}
      </nav>

      {/* Grid Dinámico de Juegos (Ahora usa 'juegosFiltrados') */}
      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {juegosFiltrados.length > 0 ? (
          juegosFiltrados.map((juego) => (
            <div key={juego.identificación} className="bg-[#162031] border border-white/5 rounded-2xl overflow-hidden group hover:border-[#ff6600]/30 transition-all shadow-xl">
              
              {/* Contenedor de Imagen con degradado */}
              <div className="h-52 bg-black overflow-hidden flex items-center justify-center relative">
                <img
                  src={juego.imagen_portada}
                  alt={juego.titulo}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => { e.currentTarget.src = 'https://placeholder.com'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162031] via-transparent to-transparent opacity-60"></div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-black text-white mb-2 uppercase tracking-tight group-hover:text-[#ff6600] transition-colors">
                  {juego.titulo}
                </h3>
                <p className="text-gray-400 text-xs mb-6 line-clamp-2 italic">
                  {juego.descripcion || "Sin descripción disponible."}
                </p>
                
                {/* Enlace dinámico a la página de detalles */}
                <Link href={`/juego/${juego.identificación}`}>
                  <button className="w-full bg-[#ff6600] hover:bg-white hover:text-black text-white font-black py-3 rounded-xl uppercase text-[10px] tracking-widest transition-all shadow-lg shadow-[#ff6600]/10">
                    Ver Detalles
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          /* Mensaje por si buscan algo que no existe */
          <div className="col-span-1 md:col-span-3 text-center py-10">
            <p className="text-gray-400 text-lg italic">
              No se ha encontrado ningún videojuego que coincida con "{busqueda}"
            </p>
          </div>
        )}
      </main>
    </div>
  );
}