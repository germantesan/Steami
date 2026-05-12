'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b121e] text-white flex flex-col items-center justify-center p-6">
      
      {/* Título Principal - Ahora en Naranja Steami */}
      <h1 className="text-6xl font-bold mb-2 text-[#ff6600] tracking-tighter">STEAMI</h1>
      <p className="text-gray-400 mb-10 text-lg">Tu enciclopedia de videojuegos definitiva</p>

      {/* Contenedor de Botones */}
      <div className="bg-[#162031] p-10 rounded-2xl shadow-2xl border border-white/5 w-full max-w-md flex flex-col gap-6">
        <h2 className="text-xl font-semibold text-center mb-2 text-gray-200 font-sans">Panel de Acceso</h2>
        
        {/* Botón Registro - Naranja Sólido */}
        <Link href="/registro">
          <button className="w-full bg-[#ff6600] hover:bg-[#ff8533] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-[#ff6600]/20 active:scale-95 font-sans uppercase tracking-widest text-sm">
            CREAR NUEVA CUENTA
          </button>
        </Link>

        {/* Botón Login - Borde Naranja */}
        <Link href="/login">
          <button className="w-full bg-transparent border-2 border-[#ff6600] hover:bg-[#ff6600]/10 text-[#ff6600] font-black py-4 rounded-xl transition-all active:scale-95 font-sans uppercase tracking-widest text-sm">
            INICIAR SESIÓN
          </button>
        </Link>

        <p className="text-[10px] text-gray-500 text-center mt-4 uppercase tracking-widest font-sans">
          Plataforma de Desarrollo de Aplicaciones
        </p>
      </div>

      {/* Botón de ayuda - Naranja sutil */}
      <div className="mt-12">
        <button className="text-xs text-[#ff6600]/50 border border-[#ff6600]/20 px-4 py-2 rounded hover:bg-[#ff6600]/5 transition font-sans">
          Probar conexión GET
        </button>
      </div>
    </div>
  );
}
