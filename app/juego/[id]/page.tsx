'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase";

export default function DetalleJuego() {
  const params = useParams();
  const id = params?.id; // Captura el ID de la URL automáticamente
  const router = useRouter();
  const [juego, setJuego] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchJuego = async () => {
      setLoading(true);
      try {
        // Buscamos el juego específico por su ID en Supabase
        const { data, error } = await supabase
          .from('video_juego')
          .select('*')
          .eq('id', id)
          .maybeSingle();
        
        if (data) {
          setJuego(data);
        }
      } catch (err) {
        console.error("Error al conectar con la base de datos:", err);
      }
      setLoading(false);
    };

    fetchJuego();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-[#0b121e] flex items-center justify-center text-white font-black uppercase tracking-widest">
      Cargando detalles en SteamI Pro...
    </div>
  );

  if (!juego) return (
    <div className="min-h-screen bg-[#0b121e] flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-black mb-6 uppercase">Juego no encontrado</h1>
      <button 
        onClick={() => router.back()} 
        className="bg-[#ff4b2b] px-8 py-3 rounded-2xl font-bold uppercase hover:scale-105 transition-transform"
      >
        Volver atrás
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b121e] text-white">
      
      {/* BOTÓN REGRESAR */}
      <button 
        onClick={() => router.back()}
        className="fixed top-8 left-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/10 font-black flex items-center gap-2 transition-all active:scale-95 text-xs tracking-widest"
      >
        <span>←</span> REGRESAR
      </button>

      <div className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-20 overflow-hidden">
        
        {/* FONDO DECORATIVO DIFUMINADO */}
        <div className="absolute inset-0 z-0">
          <img src={juego.imagen_portada} className="w-full h-full object-cover blur-[100px] opacity-20 scale-110" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b121e] to-[#0b121e]"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16 max-w-[1400px] w-full">
          
          {/* LADO IZQUIERDO: IMAGEN GIGANTE Y COMPLETA */}
          <div className="w-full lg:w-1/2">
            <div className="rounded-[40px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/10">
              <img 
                src={juego.imagen_portada} 
                className="w-full h-auto object-contain bg-black/20" 
                alt={juego.titulo} 
              />
            </div>
          </div>

          {/* LADO DERECHO: TÍTULO, DESCRIPCIÓN Y BOTONES */}
          <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
            <h1 className="text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-none drop-shadow-2xl">
              {juego.titulo}
            </h1>
            
            <div className="space-y-4">
              <h3 className="text-[#ff4b2b] font-black uppercase tracking-widest text-sm italic">Descripción del juego</h3>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                {juego.descripcion || "Explora este increíble título en SteamI Pro. Vive la mejor experiencia de juego con gráficos de última generación."}
              </p>
            </div>

            {/* BOTONERA DE ACCIÓN */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
              <button className="bg-[#ff4b2b] hover:bg-[#ff6a4d] text-white px-12 py-5 rounded-3xl font-black uppercase text-lg transition-all hover:-translate-y-1 shadow-lg shadow-red-500/20">
                COMPRAR AHORA
              </button>
              <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl font-black uppercase text-xs border border-white/10 transition-all">
                Favoritos
              </button>
              <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md px-8 py-5 rounded-3xl font-black uppercase text-xs border border-white/10 transition-all">
                Deseados
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}3