'use client';
import { useState, useEffect } from 'react';
import { supabase } from "@/lib/supabase";
import { useParams, useRouter } from 'next/navigation';

export default function DetalleJuegoPage() {
  const { id } = useParams();
  const router = useRouter();
  const [juego, setJuego] = useState<any>(null);
  const [esFavorito, setEsFavorito] = useState(false);
  const [enCarrito, setEnCarrito] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJuego = async () => {
      // Obtenemos los datos incluyendo la nueva columna 'precio'
      const { data } = await supabase
        .from('video_juego')
        .select('*')
        .eq('id', id)
        .single();
      
      if (data) {
        setJuego(data);
        
        const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
        setEsFavorito(favoritos.some((fav: any) => fav.id === data.id));

        const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
        setEnCarrito(carrito.some((item: any) => item.id === data.id));
      }
      setLoading(false);
    };
    if (id) fetchJuego();
  }, [id]);

  const agregarAlCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    if (!enCarrito) {
      carrito.push({
        id: juego.id,
        titulo: juego.titulo,
        imagen_portada: juego.imagen_portada,
        precio: juego.precio || 0 // Guardamos el precio real
      });
      localStorage.setItem('carrito', JSON.stringify(carrito));
      setEnCarrito(true);
    }
  };

  const toggleFavorito = () => {
    let favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (esFavorito) {
      favoritos = favoritos.filter((fav: any) => fav.id !== juego.id);
    } else {
      favoritos.push({ id: juego.id, titulo: juego.titulo, imagen_portada: juego.imagen_portada });
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    setEsFavorito(!esFavorito);
  };

  if (loading) return <div className="min-h-screen bg-[#0b121e] flex items-center justify-center text-[#ff6600] font-black uppercase tracking-widest text-xl">Cargando...</div>;
  if (!juego) return <div className="min-h-screen bg-[#0b121e] flex items-center justify-center text-white text-xl">Juego no encontrado</div>;

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-12">
      <button 
        onClick={() => router.back()} 
        className="text-[10px] font-black text-gray-500 hover:text-[#ff6600] mb-8 inline-block uppercase tracking-[0.3em] transition-all"
      >
        ← Volver a la categoría
      </button>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <img src={juego.imagen_portada} alt={juego.titulo} className="w-full object-contain aspect-square" />
          </div>
          
          <button 
            onClick={agregarAlCarrito}
            disabled={enCarrito}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-lg transition-all shadow-2xl active:scale-95 ${
              enCarrito 
              ? 'bg-green-600/20 border border-green-500/50 text-green-500 cursor-default' 
              : 'bg-[#ff6600] hover:bg-[#ff8533] text-white shadow-[0_10px_30px_rgba(255,102,0,0.3)]'
            }`}
          >
            {enCarrito ? '✓ Añadido al Carrito' : 'Añadir al Carrito'}
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={toggleFavorito}
              className={`py-4 rounded-xl font-bold uppercase text-xs transition-all border ${
                esFavorito ? 'bg-[#ff6600] border-[#ff6600] text-white' : 'bg-[#162031] border-white/10 text-gray-400 hover:border-white/30'
              }`}
            >
              {esFavorito ? '❤️ En Favoritos' : 'Añadir a Favoritos'}
            </button>
            
            {/* VISOR DE PRECIO CON DECIMALES */}
            <div className="bg-[#162031] border border-white/10 py-4 rounded-xl font-black uppercase text-sm text-[#ff6600] flex items-center justify-center shadow-inner">
              {juego.precio !== null ? `${Number(juego.precio).toFixed(2)} €` : '0.00 €'}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <span className="text-[#ff6600] font-black uppercase tracking-[0.3em] text-[10px]">Información Oficial</span>
          <h1 className="text-7xl font-black uppercase tracking-tighter mb-8 leading-none italic">{juego.titulo}</h1>
          <p className="text-xl text-gray-300 leading-relaxed font-light">{juego.descripcion || "Descripción no disponible."}</p>
        </div>
      </div>
    </div>
  );
}