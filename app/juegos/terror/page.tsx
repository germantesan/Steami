'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function TerrorPage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Cambiado a ID 3 según tu base de datos
  const CATEGORIA_ID = 3; 

  useEffect(() => {
    const fetchTerror = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id_categoria', CATEGORIA_ID);
      
      if (error) {
        console.error("Error cargando terror:", error);
      } else if (data) {
        setJuegos(data);
      }
      setLoading(false);
    };
    fetchTerror();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b121e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#ff4444]"></div>
      </div>
    );
  }

  const principal = juegos[0];
  // Si no hay 2 y 3, laterales será un array vacío y no dará error
  const laterales = juegos.slice(1, 3);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-10">
      
      <header className="mb-8">
        <h1 className="text-4xl font-black text-[#ff4444] uppercase tracking-tighter">
            CATEGORÍA: TERROR
        </h1>
        <p className="text-gray-500 mt-1 italic text-sm">
            "No mires atrás. El miedo es lo único que te mantiene vivo."
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        
        {/* JUEGO PRINCIPAL */}
        {principal ? (
          <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-black h-[600px] shadow-2xl border border-white/5">
            <img 
              src={principal.imagen_portada} 
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-[2000ms]" 
              alt={principal.titulo}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent z-10"></div>
            
            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
              <span className="text-[#ff4444] font-black text-xs uppercase tracking-widest mb-2 block">RECOMENDACIÓN DE PESADILLA</span>
              <h2 className="text-6xl font-black uppercase mb-6 leading-none">{principal.titulo}</h2>
              
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
                <button className="bg-blue-600/20 border border-blue-600/50 text-white px-6 py-3.5 rounded-xl font-black uppercase text-xs">
                  Descripción
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 h-[600px] bg-[#162031] rounded-3xl flex items-center justify-center border border-dashed border-gray-700">
            <p className="text-gray-500">Esperando al protagonista del horror...</p>
          </div>
        )}

        {/* JUEGOS LATERALES */}
        <div className="flex flex-col gap-6 h-[600px]">
          {laterales.length > 0 ? (
            laterales.map((juego) => (
              <div key={juego.id} className="relative flex-1 group overflow-hidden rounded-3xl bg-[#162031] shadow-xl border border-white/5">
                <img src={juego.imagen_portada} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                  <h3 className="text-xl font-black uppercase mb-4">{juego.titulo}</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-[#008f39] text-white py-2 rounded-lg font-black text-[9px] uppercase">Comprar</button>
                    <button className="bg-white/10 text-white py-2 rounded-lg font-bold text-[9px] uppercase">Favoritos</button>
                    <button className="bg-white/10 text-white py-2 rounded-lg font-bold text-[9px] uppercase">Deseados</button>
                    <button className="bg-blue-600/20 border border-blue-600 text-white py-2 rounded-lg font-black text-[9px] uppercase">Descripción</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex-1 bg-[#162031]/50 rounded-3xl border border-dashed border-gray-800 flex items-center justify-center italic text-gray-600">Espacio para más terror</div>
              <div className="flex-1 bg-[#162031]/50 rounded-3xl border border-dashed border-gray-800 flex items-center justify-center italic text-gray-600">Espacio para más terror</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}