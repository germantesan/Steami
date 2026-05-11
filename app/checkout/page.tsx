'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from "@/lib/supabase"; 

export default function CheckoutPage() {
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [pagoExitoso, setPagoExitoso] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // 1. Cargar carrito
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    setItems(carrito);
    const suma = carrito.reduce((acc: number, item: any) => acc + (Number(item.precio) || 0), 0);
    setTotal(suma);

    // 2. Obtener usuario para el resumen
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    };
    checkUser();
  }, []);

  const manejarPago = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        alert("Debes iniciar sesión para realizar la compra.");
        router.push('/login');
        return;
      }

      // Mapeo para evitar el error de NULL en 'identificación'
      const juegosAInsertar = items.map(juego => {
        const idEncontrado = juego.identificación || juego.id || juego.identificacion;
        return {
          usuario_email: user.email,
          identificación: idEncontrado 
        };
      });

      if (juegosAInsertar.some(j => !j.identificación)) {
        throw new Error("Error: Algunos juegos en el carrito no tienen un ID válido.");
      }

      const { error } = await supabase
        .from('biblioteca')
        .insert(juegosAInsertar);

      if (error) throw new Error(error.message);

      localStorage.removeItem('carrito');
      setPagoExitoso(true);

    } catch (err: any) {
      alert(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (pagoExitoso) {
    return (
      <div className="min-h-screen bg-[#0b121e] text-white flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-[#162031] p-12 rounded-[3rem] border border-[#ff6600]/30 text-center shadow-2xl">
          <h2 className="text-5xl font-black uppercase italic mb-4">¡PAGO <span className="text-[#ff6600]">CONFIRMADO!</span></h2>
          <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em] mb-10">Tu colección se ha actualizado correctamente</p>
          <button 
            onClick={() => router.push('/mis-juegos')}
            className="bg-[#ff6600] text-white px-12 py-4 rounded-xl font-black uppercase text-xs hover:bg-white hover:text-black transition-all"
          >
            VER MI BIBLIOTECA
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b121e] text-white p-6 md:p-12 flex flex-col items-center">
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-12">FINALIZAR <span className="text-[#ff6600]">COMPRA</span></h1>
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form onSubmit={manejarPago} className="bg-[#162031] p-10 rounded-[2.5rem] border border-white/5 space-y-5">
          <input required type="text" placeholder="TITULAR DE LA TARJETA" className="w-full bg-[#0b121e] border border-white/10 p-4 rounded-xl text-xs font-bold uppercase focus:border-[#ff6600] outline-none" />
          <input required type="text" maxLength={16} placeholder="NÚMERO DE TARJETA" className="w-full bg-[#0b121e] border border-white/10 p-4 rounded-xl text-xs font-bold uppercase focus:border-[#ff6600] outline-none" />
          <div className="grid grid-cols-2 gap-4">
            <input required type="text" placeholder="MM/AA" className="bg-[#0b121e] border border-white/10 p-4 rounded-xl text-xs font-bold uppercase focus:border-[#ff6600] outline-none" />
            <input required type="password" maxLength={3} placeholder="CVC" className="bg-[#0b121e] border border-white/10 p-4 rounded-xl text-xs font-bold uppercase focus:border-[#ff6600] outline-none" />
          </div>
          <button 
            type="submit"
            disabled={cargando || items.length === 0}
            className="w-full py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest bg-[#ff6600] hover:bg-[#ff8533] transition-all"
          >
            {cargando ? 'PROCESANDO...' : `PAGAR ${total.toFixed(2)}€`}
          </button>
        </form>
        <div className="bg-[#162031] p-10 rounded-[2.5rem] border border-white/5 flex flex-col justify-center">
              <p className="text-gray-500 text-[10px] font-black uppercase mb-2">Resumen del pedido</p>
              <div className="text-6xl font-black italic">{total.toFixed(2)}€</div>
              <p className="mt-4 text-[9px] text-gray-400 font-bold uppercase">Usuario: {userEmail || 'Cargando...'}</p>
        </div>
      </div>
    </div>
  );
}