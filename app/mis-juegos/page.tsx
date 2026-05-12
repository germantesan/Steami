'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import Link from 'next/link';

export default function MisJuegosPage() {
  const [juegos, setJuegos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBiblioteca = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from('biblioteca')
          .select(`
            identificación,
            video_juego:identificación (
              titulo,
              imagen_portada,
              identificación
            )
          `)
          .eq('usuario_email', user.email);

        if (data) {
          const listaJuegos = data.map(item => item.video_juego);
          setJuegos(listaJuegos);
        }
      }
      setLoading(false);
    };

    fetchBiblioteca();
  }, []);

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-10 font-sans">
      
      {/* Título actualizado: "Mis" en Blanco, "Juegos" en Naranja */}
      <h1 className="text-4xl font-black uppercase mb-8 italic tracking-tighter">
        <span className="text-white">Mis</span> <span className="text-[#ff6600]">Juegos</span>
      </h1>

      {loading ? (
        <div className="text-[#ff6600] animate-pulse font-black uppercase tracking-widest text-sm">
          CARGANDO TU BIBLIOTECA...
        </div>
      ) : juegos.length === 0 ? (
        <div className="bg-[#162031] p-10 rounded-2xl border border-white/5 text-center shadow-2xl">
          <p className="text-gray-400 mb-6 font-medium italic">Aún no has pirateado ningún juego.</p>
          <Link href="/juegos" className="bg-[#ff6600] text-white px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-white hover:text-black transition-all inline-block">
            Ir a la tienda →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {juegos.map((juego) => (
            <div key={juego.identificación} className="bg-[#162031] rounded-2xl overflow-hidden border border-white/5 group hover:border-[#ff6600]/30 transition-all shadow-xl">
              <div className="relative h-44 overflow-hidden">
                <img 
                  src={juego.imagen_portada} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  alt={juego.titulo} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#162031] via-transparent to-transparent opacity-80"></div>
              </div>
              <div className="p-5">
                <h3 className="font-black uppercase truncate text-sm tracking-tight mb-4 text-white group-hover:text-[#ff6600] transition-colors">
                  {juego.titulo}
                </h3>
                
                <button className="w-full bg-[#ff6600] py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-white hover:bg-white hover:text-[#0b121e] transition-all">
                  INSTALAR AHORA
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

