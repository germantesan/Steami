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
      
      // 1. Obtenemos el usuario actual
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // 2. Buscamos en la tabla 'biblioteca' los juegos de este usuario
        // Hacemos un JOIN con 'video_juego' para traer los detalles (portada, titulo)
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
          // Limpiamos el array para quedarnos solo con la info del juego
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
      <h1 className="text-4xl font-black text-[#ff4b2b] uppercase mb-8 italic">Mis Juegos</h1>

      {loading ? (
        <div className="text-[#ff4b2b] animate-pulse font-bold">CARGANDO TU BIBLIOTECA...</div>
      ) : juegos.length === 0 ? (
        <div className="bg-[#162031] p-10 rounded-2xl border border-white/5 text-center">
          <p className="text-gray-400 mb-4">Aún no has comprado ningún juego.</p>
          <Link href="/juegos" className="text-[#ff4b2b] font-bold hover:underline">Ir a la tienda →</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {juegos.map((juego) => (
            <div key={juego.identificación} className="bg-[#162031] rounded-xl overflow-hidden border border-white/5 group">
              <img src={juego.imagen_portada} className="w-full h-40 object-cover" alt={juego.titulo} />
              <div className="p-4">
                <h3 className="font-bold uppercase truncate">{juego.titulo}</h3>
                <button className="w-full mt-4 bg-[#ff4b2b] py-2 rounded font-black text-xs uppercase hover:bg-white hover:text-black transition-colors">
                  Jugar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}