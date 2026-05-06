'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function IndiePage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Ajusta este ID según lo que diga tu tabla 'categoria' en Supabase
  const CATEGORIA_ID = 4; 

  useEffect(() => {
    const fetchIndie = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id_categoria', CATEGORIA_ID);
      
      if (data) setJuegos(data);
      setLoading(false);
    };
    fetchIndie();
  }, []);

  const principal = juegos[0];
  const laterales = juegos.slice(1, 3);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-10">
      
      {/* Título Estilo Indie con la frase solicitada */}
      <header className="mb-8 text-center lg:text-left">
        <h1 className="text-4xl font-black text-[#a855f7] uppercase tracking-tighter">
            CATEGORÍA: INDIE
        </h1>
        <p className="text-gray-400 mt-2 italic text-sm max-w-2xl">
            "Si por indie comprendes juegos de coste bien reducido, ajenos a cualquier influencia de grandes compañías, este es tu sitio."
        </p>
      </header>

      {/* Grid con estructura 1 (grande) + 2 (laterales) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
        
        {/* JUEGO PRINCIPAL (IZQUIERDA) */}
        {principal ? (
          <div className="lg:col-span-2 relative group overflow-hidden rounded-3xl bg-black h-[600px] shadow-2xl border border-purple-500/20">
            <img 
              src={principal.imagen_portada} 
              className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700" 
              alt={principal.titulo}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent z-10"></div>
            
            <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
              <span className="text-[#ff6600] font-black text-xs uppercase tracking-widest mb-2 block">TOP VENTAS INDIE</span>
              <h2 className="text-6xl font-black uppercase mb-6 leading-none drop-shadow-2xl">{principal.titulo}</h2>
              
              <div className="flex flex-wrap gap-3">
                <button className="bg-[#ff6600] hover:bg-[#e65c00] text-white px-8 py-3.5 rounded-xl font-black uppercase text-xs transition-transform hover:scale-105">
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
          <div className="lg:col-span-2 h-[600px] bg-[#162031] rounded-3xl flex items-center justify-center border border-dashed border-purple-500/30">
            <p className="text-gray-500">Cargando tesoros independientes...</p>
          </div>
        )}

        {/* LATERALES (DERECHA) */}
        <div className="flex flex-col gap-6 h-[600px]">
          {laterales.length > 0 ? (
            laterales.map((juego) => (
              <div key={juego.id} className="relative flex-1 group overflow-hidden rounded-3xl bg-[#162031] shadow-xl border border-white/5">
                <img src={juego.imagen_portada} className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 p-5 z-20 w-full">
                  <h3 className="text-xl font-black uppercase mb-0.5">{juego.titulo}</h3>
                  <span className="text-[#a855f7] text-[9px] font-bold uppercase tracking-widest block mb-4">DISPONIBLE</span>
                  
                  {/* Los 4 botones solicitados */}
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-[#008f39] text-white py-2 rounded-lg font-black uppercase text-[9px]">Comprar</button>
                    <button className="bg-white/10 text-white py-2 rounded-lg font-bold uppercase text-[9px]">Favoritos</button>
                    <button className="bg-white/10 text-white py-2 rounded-lg font-bold uppercase text-[9px]">Deseados</button>
                    <button className="bg-blue-600/20 border border-blue-600 text-white py-2 rounded-lg font-black uppercase text-[9px]">Info</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="flex-1 bg-[#162031]/50 rounded-3xl border border-dashed border-gray-800 flex items-center justify-center italic text-gray-600 text-xs p-4 text-center">Próximamente más juegos indie</div>
              <div className="flex-1 bg-[#162031]/50 rounded-3xl border border-dashed border-gray-800 flex items-center justify-center italic text-gray-600 text-xs p-4 text-center">Próximamente más juegos indie</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}