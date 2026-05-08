'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";

export default function DetalleJuego() {
  const params = useParams();
  const id = params?.id; 
  const router = useRouter();
  const [juego, setJuego] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJuego = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('video_juego')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (data) {
          setJuego(data);
        }
      } catch (err) {
        console.error("Error de conexión:", err);
      }
      setLoading(false);
    };

    fetchJuego();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0b121e] flex items-center justify-center text-white font-black uppercase tracking-widest">
      Cargando en SteamI Pro...
    </div>
  );

  if (!juego) return (
    <div className="min-h-screen bg-[#0b121e] flex flex-col items-center justify-center text-white p-10 text-center">
      <h1 className="text-4xl font-black mb-6 uppercase">Juego no encontrado</h1>
      <button 
        onClick={() => router.back()} 
        className="bg-[#ff4b2b] px-8 py-3 rounded-2xl font-bold uppercase hover:scale-105 transition-transform"
      >
        Volver a la tienda
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b121e] text-white font-sans">
      
      {/* HEADER SUPERIOR */}
      <header className="border-b border-white/5 bg-[#080d14] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button 
                onClick={() => router.back()}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 font-bold text-sm"
            >
                <span className="text-lg">←</span> VOLVER A LA BIBLIOTECA
            </button>
            <span className="text-xs font-black text-[#ff4b2b] uppercase tracking-widest">SteamI Pro Detail</span>
        </div>
      </header>

      {/* CONTENIDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* COLUMNA IZQUIERDA: IMAGEN Y BOTONES */}
          <div className="md:col-span-5 space-y-6">
            
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
              <img 
                src={juego.imagen_portada} 
                className="w-full h-auto object-cover aspect-[3/4]" 
                alt={juego.titulo} 
              />
            </div>

            {/* BOTONERA DEBAJO DE LA IMAGEN */}
            <div className="flex flex-col gap-3">
              <button className="w-full bg-[#ff4b2b] hover:bg-[#ff6a4d] text-white py-4 rounded-xl font-black uppercase text-center transition-all active:scale-[0.98]">
                COMPRAR AHORA
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#162031] hover:bg-[#1f293a] px-4 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/5 text-center">
                  Favoritos
                </button>
                <button className="bg-[#162031] hover:bg-[#1f293a] px-4 py-3 rounded-xl font-bold uppercase text-[10px] border border-white/5 text-center">
                  Lista de Deseos
                </button>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: TEXTOS */}
          <div className="md:col-span-7 space-y-8 pt-2">
            
            <div>
              <span className="text-[#ff4b2b] font-black uppercase tracking-[0.3em] text-xs block mb-2 italic">
                Título Oficial
              </span>
              <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-tight text-white">
                {juego.titulo}
              </h1>
              <div className="h-1 w-20 bg-[#ff4b2b] mt-4 rounded-full"></div>
            </div>

            <div className="space-y-4">
              <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Sinopsis del Juego</h3>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-medium bg-[#0f172a] p-6 rounded-2xl border border-white/5">
                {juego.descripcion || "Este increíble título te espera en SteamI Pro. Vive una aventura única con gráficos espectaculares y una jugabilidad adictiva."}
              </p>
            </div>
            
          </div>

        </div>
      </main>
    </div>
  );
}