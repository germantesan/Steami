'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import Link from 'next/link';

export default function ReflejosPage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // CAMBIO AQUÍ: ID 6 para Supervivencia
  const CATEGORIA_ID = 6; 

  useEffect(() => {
    const fetchJuegos = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id_categoria', CATEGORIA_ID)
        .order('id', { ascending: true });
      if (data) setJuegos(data);
      setLoading(false);
    };
    fetchJuegos();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-10">
      <header className="mb-10">
        <h1 className="text-4xl font-black text-[#ff4b2b] uppercase tracking-tight">CATEGORÍA: REFLEJOS</h1>
        <p className="text-gray-400 mt-2 italic text-sm">"No solo se trata de jugar, se trata de resistir."</p>
      </header>

      {loading ? (
        <div className="text-center p-20 animate-pulse font-black text-[#ff4b2b]">CARGANDO REFLEJOS...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1400px] mx-auto">
          {juegos.map((juego, index) => {
            const isTop1 = index === 0;
            return (
              <Link 
                href={`/juego/${juego.id}`} 
                key={juego.id} 
                className={`${isTop1 ? 'md:col-span-2 md:row-span-2 h-[600px]' : 'h-[290px]'} relative group overflow-hidden rounded-3xl bg-black border border-white/5 block`}
              >
                <div className="absolute top-5 left-5 z-30 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                  <span className="text-[10px] font-black italic text-[#ff4b2b] uppercase">TOP {index + 1}</span>
                </div>
                <img src={juego.imagen_portada} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" alt={juego.titulo} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b121e] via-transparent to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                  <h2 className={`${isTop1 ? 'text-6xl' : 'text-2xl'} font-black uppercase tracking-tighter`}>{juego.titulo}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}