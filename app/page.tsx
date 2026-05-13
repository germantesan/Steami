'use client';
import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-[#0b121e] text-white flex flex-col items-center justify-center p-6 font-sans">
            
            {/* TÍTULO PRINCIPAL EN BLANCO Y NARANJA */}
            <h1 className="text-6xl font-black mb-2 tracking-tighter italic">
                <span className="text-white">STE</span><span className="text-[#ff6600]">AMI</span>
            </h1>
            <p className="text-gray-400 mb-12 text-sm uppercase tracking-widest font-bold">
                Menú de Navegación Inicial
            </p>

            {/* CONTENEDOR DEL MENÚ PRINCIPAL */}
            <div className="bg-[#162031] p-10 rounded-2xl shadow-2xl border border-white/5 w-full max-w-md flex flex-col gap-4">
                
                {/* 1. Acceso al Panel que me acabas de pasar */}
                <Link href="/acceso">
                    <button className="w-full bg-[#ff6600] hover:bg-[#ff8533] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-[#ff6600]/20 active:scale-95 uppercase tracking-widest text-xs cursor-pointer">
                        Ir al Panel de Acceso (Login / Registro)
                    </button>
                </Link>

                {/* 2. Acceso directo al Catálogo General */}
                <Link href="/juegos">
                    <button className="w-full bg-transparent border-2 border-[#ff6600] hover:bg-[#ff6600]/10 text-[#ff6600] font-black py-4 rounded-xl transition-all active:scale-95 uppercase tracking-widest text-xs cursor-pointer">
                        Ver Catálogo de Videojuegos
                    </button>
                </Link>

                {/* 3. Acceso a Mis Juegos (Biblioteca) */}
                <Link href="/mis-juegos">
                    <button className="w-full bg-transparent border-2 border-white/20 hover:bg-white/5 text-white font-black py-4 rounded-xl transition-all active:scale-95 uppercase tracking-widest text-xs cursor-pointer">
                        Ver Mis Juegos Guardados
                    </button>
                </Link>

                <p className="text-[10px] text-gray-500 text-center mt-6 uppercase tracking-widest font-sans">
                    Plataforma de Desarrollo de Aplicaciones
                </p>
            </div>

        </div>
    );
}

