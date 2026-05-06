'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function SupervivenciaPage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ID exacto para Supervivencia según tu base de datos
  const CATEGORIA_ID = 2; 

  useEffect(() => {
    const fetchSupervivencia = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id_categoria', CATEGORIA_ID);
      
      if (data) setJuegos(data);
      setLoading(false);
    };
    fetchSupervivencia();
  }, []);

  const principal = juegos[0];
  const laterales = juegos.slice(1, 3);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-10 font-sans">
      
      {/* Encabezado Estilo Supervivencia */}
      <header className="mb-10">
        <h1 className="text-4xl font-black text-[#a3e635] uppercase tracking-tight">
            CATEGORÍA: SUPERVIVENCIA
        </h1>
        <p className="text-gray-400 mt-2 italic text-sm">
            "Si te gusta sufrir donde TODO te mata, disfruta."
        </p>
      </header>

      {loading ? (
        <div className="text-center p-20 text-[#a3e635] animate-pulse font-black">
          CARGANDO JUEGOS...
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px]">
          
          {/* JUEGO PRINCIPAL CON TODOS LOS BOTONES */}
          {principal ? (
            <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-black h-[600px] shadow-2xl border border-white/5">
              <img 
                src={principal.imagen_portada} 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000" 
                alt={principal.titulo}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent z-10"></div>
              
              <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                <span className="text-[#ff6600] font-bold text-xs uppercase tracking-widest mb-1 block drop-shadow-md">TOP VENTAS</span>
                <h2 className="text-7xl font-black uppercase mb-8 leading-none tracking-tighter drop-shadow-lg">{principal.titulo}</h2>
                
                {/* Botonera Completa */}
                <div className="flex flex-wrap gap-3">
                  <button className="bg-[#ff6600] hover:bg-[#ff8533] text-white px-10 py-4 rounded-xl font-black uppercase text-sm shadow-lg transition-transform hover:scale-105 active:scale-95">
                    COMPRAR
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl font-bold uppercase text-xs border border-white/10 transition-colors">
                    Favoritos
                  </button>
                  <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-6 py-4 rounded-xl font-bold uppercase text-xs border border-white/10 transition-colors">
                    Deseados
                  </button>
                  <button className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-white px-8 py-4 rounded-xl font-black uppercase text-sm transition-colors">
                    Descripción
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-2 h-[600px] bg-[#162031] rounded-3xl flex items-center justify-center border border-dashed border-gray-700">
              <p className="text-gray-500 italic">No hay juegos en la base de datos para esta categoría.</p>
            </div>
          )}

          {/* JUEGOS LATERALES CON BOTONES REDUCIDOS */}
          <div className="flex flex-col gap-6 h-[600px]">
            {laterales.length > 0 ? (
              laterales.map((juego) => (
                <div key={juego.id} className="relative flex-1 group overflow-hidden rounded-3xl bg-[#162031] border border-white/5 shadow-xl">
                  <img src={juego.imagen_portada} className="w-full h-full object-cover opacity-60" alt={juego.titulo} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent z-10"></div>
                  <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                    <h3 className="text-2xl font-black uppercase mb-0.5">{juego.titulo}</h3>
                    <span className="text-[#a3e635] text-[10px] font-bold uppercase tracking-widest block mb-4">DISPONIBLE</span>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <button className="bg-[#008f39] text-white py-2 rounded-lg font-black uppercase text-[9px] hover:bg-[#00a843]">Comprar</button>
                        <button className="bg-white/10 text-white py-2 rounded-lg font-bold uppercase text-[9px] hover:bg-white/20">Favoritos</button>
                        <button className="bg-white/10 text-white py-2 rounded-lg font-bold uppercase text-[9px] hover:bg-white/20">Deseados</button>
                        <button className="bg-blue-600/20 border border-blue-600/50 text-white py-2 rounded-lg font-black uppercase text-[9px]">Info</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex-1 bg-[#162031]/50 rounded-3xl border border-dashed border-gray-800 flex items-center justify-center text-xs text-gray-600 italic">
                Espacio para otro desafío
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
