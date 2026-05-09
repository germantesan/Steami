'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CarritoPage() {
  const [items, setItems] = useState<any[]>([]);
  const [montado, setMontado] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMontado(true);
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) setItems(JSON.parse(carritoGuardado));
  }, []);

  const eliminarItem = (id: number) => {
    const nuevaLista = items.filter(item => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(nuevaLista));
    setItems(nuevaLista);
  };

  const total = items.reduce((acc, item) => acc + (Number(item.precio) || 0), 0);

  if (!montado) return null;

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-12">
      <header className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter">
            TU <span className="text-[#ff6600]">CARRITO</span>
          </h1>
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
            REVISA TUS ARTÍCULOS ANTES DEL PAGO
          </p>
        </div>
        
        <button 
          onClick={() => router.back()}
          className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-[#ff6600] transition-all border-b border-white/5 pb-1"
        >
          ← CONTINUAR COMPRANDO
        </button>
      </header>

      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.length > 0 ? (
            items.map((juego) => (
              <div key={juego.id} className="bg-[#162031] p-6 rounded-2xl border border-white/5 flex items-center gap-6 shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#ff6600] opacity-0 group-hover:opacity-100 transition-all"></div>
                
                <img src={juego.imagen_portada} alt={juego.titulo} className="w-24 h-24 rounded-xl object-cover border border-white/10" />
                
                <div className="flex-1">
                  <h3 className="font-black uppercase text-base tracking-tight mb-1">{juego.titulo}</h3>
                  <p className="text-[#ff6600] font-bold text-[10px] uppercase tracking-widest">Digital Edition</p>
                </div>
                
                <div className="text-right">
                  <p className="font-black text-xl mb-2">
                    {Number(juego.precio || 0).toFixed(2)}€
                  </p>
                  <button 
                    onClick={() => eliminarItem(juego.id)} 
                    className="text-[10px] text-gray-500 hover:text-red-500 font-bold uppercase tracking-tighter transition-colors"
                  >
                    ELIMINAR
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 bg-[#162031]/30 border-2 border-dashed border-white/5 rounded-[2.5rem]">
              <p className="text-gray-500 font-black uppercase text-xs tracking-widest">El carrito está vacío</p>
            </div>
          )}
        </div>

        <div className="bg-[#162031] p-8 rounded-[2.5rem] border border-white/10 h-fit sticky top-24 shadow-2xl">
          <h4 className="font-black uppercase text-[10px] text-gray-500 mb-8 tracking-[0.3em]">Resumen de pedido</h4>
          
          <div className="flex flex-col gap-2 mb-10">
            <span className="font-black uppercase text-[10px] text-gray-400">Total a pagar</span>
            <span className="text-4xl font-black text-[#ff6600] tracking-tighter leading-none">
              {total.toFixed(2)}€
            </span>
          </div>
          
          <button 
            onClick={() => router.push('/checkout')}
            disabled={items.length === 0}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg active:scale-95 ${
              items.length === 0 
              ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
              : 'bg-white text-black hover:bg-[#ff6600] hover:text-white'
            }`}
          >
            Finalizar Compra
          </button>

          <p className="text-[9px] text-center text-gray-600 font-bold uppercase mt-6 tracking-tight px-4">
            Impuestos incluidos. Transacción segura procesada por SteamI Cloud.
          </p>
        </div>
      </div>
    </div>
  );
}