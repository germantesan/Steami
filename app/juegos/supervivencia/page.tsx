'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";

export default function SupervivenciaPage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // ID 2 para Supervivencia según tu base de datos
  const CATEGORIA_ID = 2; 

  useEffect(() => {
    const fetchSupervivencia = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id_categoria', CATEGORIA_ID)
        .order('id', { ascending: true });
      
      if (data) setJuegos(data);
      setLoading(false);
    };
    fetchSupervivencia();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-10 font-sans">
      
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
          CARGANDO BASE DE DATOS...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          
          {juegos.map((juego, index) => {
            // JUEGO PRINCIPAL (El primero de la lista)
            if (index === 0) {
              return (
                <div key={juego.id} className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl bg-black h-[600px] shadow-2xl border border-white/5">
                  <img src={juego.imagen_portada} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-all duration-700" alt={juego.titulo} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent z-10"></div>
                  
                  <div className="absolute bottom-0 left-0 p-10 z-20 w-full">
                    <span className="text-[#ff6600] font-bold text-xs uppercase mb-1 block">TOP VENTAS</span>
                    <h2 className="text-6xl font-black uppercase mb-6 tracking-tighter">{juego.titulo}</h2>
                    
                    {/* LOS 4 BOTONES DEL PRINCIPAL */}
                    <div className="flex flex-wrap gap-3">
                        <button className="bg-[#ff6600] hover:bg-[#ff8533] px-8 py-3 rounded-xl font-black uppercase text-xs transition-transform active:scale-95">VER AHORA</button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/10">Favoritos</button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/10">Deseados</button>
                        <button className="bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 px-6 py-3 rounded-xl font-black uppercase text-xs transition-colors">Descripción</button>
                    </div>
                  </div>
                </div>
              );
            }

            // RESTO DE JUEGOS (Laterales y filas de abajo)
            return (
              <div key={juego.id} className="relative group overflow-hidden rounded-3xl bg-[#162031] h-[290px] shadow-xl border border-white/5">
                <img src={juego.imagen_portada} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" alt={juego.titulo} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-transparent z-10"></div>
                
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                  <h3 className="text-xl font-black uppercase mb-0.5">{juego.titulo}</h3>
                  <span className="text-[#a3e635] text-[9px] font-bold uppercase tracking-widest block mb-4">DISPONIBLE</span>
                  
                  {/* LOS 4 BOTONES DE LOS JUEGOS SECUNDARIOS */}
                  <div className="grid grid-cols-2 gap-2">
                    <button className="bg-[#008f39] hover:bg-[#00a843] text-white py-2 rounded-lg font-black uppercase text-[8px]">Comprar</button>
                    <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-bold uppercase text-[8px]">Favoritos</button>
                    <button className="bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg font-bold uppercase text-[8px]">Deseados</button>
                    <button className="bg-blue-600/20 border border-blue-600/50 hover:bg-blue-600/40 text-white py-2 rounded-lg font-black uppercase text-[8px]">Info</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}