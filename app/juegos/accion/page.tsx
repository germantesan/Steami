'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function AccionPage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const CATEGORIA_ID = 1; 

  useEffect(() => {
    const fetchAccion = async () => {
      const { data } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id_categoria', CATEGORIA_ID);
      if (data) setJuegos(data);
    };
    fetchAccion();
  }, []);

  const principal = juegos[0];
  const laterales = juegos.slice(1, 3);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-10">
      
      <header className="mb-8">
        <h1 className="text-4xl font-black text-[#a3cf33] uppercase tracking-tighter">
            CATEGORÍA: ACCIÓN
        </h1>
        <p className="text-gray-400 mt-1 italic text-sm">
            "BOOM, BOOM, PEW, PEW"
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px]">
        
        {/* JUEGO IZQUIERDA (DESTACADO) */}
        {principal && (
          <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-black h-[600px] shadow-2xl border border-white/5">
            <img 
              src={principal.imagen_portada} 
              className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
              alt={principal.titulo}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent z-10"></div>
            
            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
              <span className="text-[#ff6600] font-black text-xs uppercase tracking-widest mb-2 block">TOP VENTAS</span>
              <h2 className="text-6xl font-black uppercase mb-6 leading-none drop-shadow-2xl">
                {principal.titulo}
              </h2>
              
              {/* Botones del juego principal */}
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#ff6600] hover:bg-[#e65c00] text-white px-8 py-3.5 rounded-xl font-black uppercase text-xs shadow-lg transition-transform hover:scale-105">
                  COMPRAR
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3.5 rounded-xl font-bold uppercase text-[10px] border border-white/5">
                  Favoritos
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3.5 rounded-xl font-bold uppercase text-[10px] border border-white/5">
                  Deseados
                </button>
                <button className="bg-blue-600/20 border border-blue-600/50 text-white px-6 py-3.5 rounded-xl font-black uppercase text-xs hover:bg-blue-600/40 transition-colors">
                  Descripción
                </button>
              </div>
            </div>
          </div>
        )}

        {/* COLUMNA DERECHA (2 IMÁGENES CON 4 BOTONES CADA UNA) */}
        <div className="flex flex-col gap-6 h-[600px]">
          {laterales.map((juego) => (
            <div key={juego.id} className="relative flex-1 group overflow-hidden rounded-3xl bg-[#162031] shadow-xl border border-white/5">
              <img 
                src={juego.imagen_portada} 
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>
              
              <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                <h3 className="text-xl font-black uppercase text-white mb-0.5">{juego.titulo}</h3>
                <span className="text-[#a3cf33] text-[9px] font-bold uppercase tracking-widest block mb-4">DISPONIBLE</span>
                
                {/* Cuadrícula de 4 botones para los laterales */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-[#008f39] hover:bg-[#007a31] text-white py-2 rounded-lg font-black uppercase text-[9px] transition-colors">
                    Comprar
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-bold uppercase text-[9px] border border-white/5">
                    Favoritos
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-bold uppercase text-[9px] border border-white/5">
                    Deseados
                  </button>
                  <button className="bg-blue-600/20 border border-blue-600 text-white py-2 rounded-lg font-black uppercase text-[9px]">
                    Descripción
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}