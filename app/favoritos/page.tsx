'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<any[]>([]);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    // 1. Marcamos que el componente ya está en el navegador
    setMontado(true);
    
    // 2. Leemos del localStorage
    const listaGuardada = localStorage.getItem('favoritos');
    if (listaGuardada) {
      setFavoritos(JSON.parse(listaGuardada));
    }
  }, []);

  const eliminarFavorito = (id: number) => {
    const nuevaLista = favoritos.filter(j => j.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(nuevaLista));
    setFavoritos(nuevaLista);
  };

  // Si no está montado, no renderizamos nada para evitar errores de Next.js
  if (!montado) return null;

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-12">
      <header className="max-w-7xl mx-auto mb-16">
        <h1 className="text-5xl font-black uppercase tracking-tighter">
          MIS <span className="text-[#ff4b2b]">FAVORITOS</span>
        </h1>
        <div className="h-1.5 w-24 bg-[#ff4b2b] mt-4 rounded-full"></div>
      </header>

      {favoritos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {favoritos.map((juego) => (
            <div key={juego.id} className="group relative bg-[#162031] rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl">
              <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={juego.imagen_portada} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  alt={juego.titulo} 
                />
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
              
              <div className="absolute bottom-0 left-0 p-6 w-full text-center">
                <h3 className="font-black uppercase text-lg mb-4">{juego.titulo}</h3>
                <div className="flex gap-2">
                  <Link href={`/juego/${juego.id}`} className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-lg text-[10px] font-black uppercase transition-all">
                    Ver
                  </Link>
                  <button 
                    onClick={() => eliminarFavorito(juego.id)} 
                    className="flex-1 bg-[#ff4b2b]/20 hover:bg-[#ff4b2b] text-[#ff4b2b] hover:text-white py-2 rounded-lg text-[10px] font-black uppercase transition-all"
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 border-2 border-dashed border-white/10 rounded-[3rem] max-w-4xl mx-auto">
          <p className="text-gray-500 font-black uppercase tracking-widest">Tu lista está vacía</p>
          <Link href="/juegos" className="inline-block mt-6 text-[#ff4b2b] font-bold hover:underline">
            Explorar Catálogo →
          </Link>
        </div>
      )}
    </div>
  );
}