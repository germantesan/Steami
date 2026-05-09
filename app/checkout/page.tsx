'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [pagoExitoso, setPagoExitoso] = useState(false);

  useEffect(() => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    setItems(carrito);
    const suma = carrito.reduce((acc: number, item: any) => acc + (Number(item.precio) || 0), 0);
    setTotal(suma);
  }, []);

  const manejarPago = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulamos el proceso de pago y mostramos la pantalla de éxito
    setPagoExitoso(true);
    localStorage.removeItem('carrito'); // Limpiamos el carrito
  };

  // PANTALLA DE ÉXITO
  if (pagoExitoso) {
    return (
      <div className="min-h-screen bg-[#0b121e] text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
        <div className="w-full max-w-2xl bg-[#162031] p-12 rounded-[3rem] border border-[#ff6600]/30 shadow-[0_20px_50px_rgba(255,102,0,0.1)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-[#ff6600]"></div>
          
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 bg-[#ff6600] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,102,0,0.4)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-5xl font-black uppercase tracking-tighter mb-2 italic">¡COMPRA <span className="text-[#ff6600]">EXITOSA!</span></h2>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em] mb-10">Tu pedido ha sido procesado correctamente</p>

          <div className="bg-[#0b121e]/50 rounded-2xl p-6 mb-10 border border-white/5">
            <div className="flex justify-center -space-x-4 mb-6">
              {items.map((juego, index) => (
                <img 
                  key={index} 
                  src={juego.imagen_portada} 
                  className="w-16 h-16 rounded-xl object-cover border-2 border-[#162031] shadow-xl" 
                  alt="juego"
                />
              ))}
            </div>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Total pagado</p>
            <p className="text-3xl font-black text-white mt-1">{total.toFixed(2)}€</p>
          </div>

          <button 
            onClick={() => router.push('/')}
            className="bg-white text-black px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#ff6600] hover:text-white transition-all active:scale-95"
          >
            VOLVER A LA TIENDA
          </button>
        </div>
      </div>
    );
  }

  // PANTALLA DE FORMULARIO DE PAGO
  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-12 flex flex-col items-center">
      
      <div className="w-full max-w-4xl mb-8">
        <button 
          onClick={() => router.push('/carrito')}
          className="text-xs font-black uppercase tracking-[0.2em] text-gray-500 hover:text-[#ff6600] transition-all flex items-center gap-2"
        >
          ← REGRESAR AL CARRITO
        </button>
      </div>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">
        FORMA DE <span className="text-[#ff6600]">PAGO</span>
      </h1>

      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        
        <form onSubmit={manejarPago} className="space-y-6 bg-[#162031] p-10 rounded-[2.5rem] border border-white/5 shadow-2xl flex flex-col justify-center">
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 mb-6">Detalles de Facturación</h3>
            
            <input 
              required 
              type="text" 
              placeholder="NOMBRE EN LA TARJETA" 
              className="w-full bg-[#0b121e] border border-white/5 p-4 rounded-xl text-xs font-bold uppercase placeholder:text-gray-700 focus:border-[#ff6600] outline-none transition-all"
            />

            <input 
              required 
              type="text" 
              maxLength={16}
              placeholder="NÚMERO DE TARJETA" 
              className="w-full bg-[#0b121e] border border-white/5 p-4 rounded-xl text-xs font-bold uppercase placeholder:text-gray-700 focus:border-[#ff6600] outline-none transition-all"
            />

            <div className="grid grid-cols-2 gap-4">
              <input required type="text" placeholder="MM/AA" className="bg-[#0b121e] border border-white/5 p-4 rounded-xl text-xs font-bold uppercase placeholder:text-gray-700 focus:border-[#ff6600] outline-none transition-all" />
              <input required type="password" maxLength={3} placeholder="CVC" className="bg-[#0b121e] border border-white/5 p-4 rounded-xl text-xs font-bold uppercase placeholder:text-gray-700 focus:border-[#ff6600] outline-none transition-all" />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#ff6600] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#ff8533] transition-all shadow-lg active:scale-95 mt-4"
          >
            CONFIRMAR PAGO DE {total.toFixed(2)}€
          </button>
        </form>

        <div className="bg-[#162031] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center items-center relative overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-t from-[#ff6600]/5 to-transparent"></div>
          
          <div className="relative z-10 space-y-3">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Total a debitar</span>
            <div className="text-5xl font-black tracking-tighter text-white">
              {total.toFixed(2)}€
            </div>
            
            <div className="pt-6">
              <p className="text-[#ff6600] text-[9px] font-black uppercase tracking-[0.2em] mb-2">Transacción Protegida</p>
              <p className="text-gray-600 text-[10px] font-bold uppercase tracking-widest px-6 leading-relaxed">
                Encriptación de 256 bits bajo el protocolo SteamI Secure
              </p>
            </div>
          </div>
        </div>
      </div>

      <button 
        onClick={() => router.push('/')}
        className="mt-12 text-gray-600 hover:text-white font-black uppercase text-[9px] tracking-[0.3em] transition-all underline underline-offset-4"
      >
        CANCELAR Y VOLVER A LA TIENDA
      </button>
    </div>
  );
}