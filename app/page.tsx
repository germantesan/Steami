'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
    const [isReady, setIsReady] = useState(false);

    // Espera de 1.5 segundos antes de mostrar el contenido
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsReady(true);
        }, 1500); // 1.5 segundos
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-start font-sans overflow-hidden">
            
            {/* 1. FONDO: IMAGEN DE PORTADA */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/imagenes/portada.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay mínimo */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* 2. CONTENIDO ANIMADO */}
            <div className={`
                relative z-10 flex flex-col items-center w-full h-full pt-10 px-6
                transition-all duration-[1000ms] ease-in-out
                ${isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}>
                
                {/* LOGO STEAMI (STEAM Naranja, I Blanco) */}
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-[10rem] md:text-[14rem] font-black tracking-tighter italic drop-shadow-[0_10px_30px_rgba(0,0,0,1)] leading-none text-center">
                        <span className="text-[#ff6600]">STEAM</span><span className="text-white">I</span>
                    </h1>
                    
                    {/* FRASE DE BIENVENIDA EN BLANCO Y GRUESA */}
                    <p className="text-white text-xl md:text-3xl font-black uppercase tracking-[0.4em] italic drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] mt-2 text-center">
                        Bienvenido a una nueva aventura
                    </p>
                    
                    {/* Barra decorativa naranja */}
                    <div className="w-40 h-2 bg-[#ff6600] mt-6 shadow-[0_0_20px_rgba(255,102,0,0.5)]"></div>
                </div>

                {/* MENÚ DE ACCESO */}
                <div className="bg-[#162031]/95 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-white/10 w-full max-w-sm flex flex-col gap-6 mt-4">
                    
                    <h2 className="text-white font-black text-center uppercase tracking-widest text-xs border-b border-white/10 pb-4 opacity-80">
                        Acceso a la plataforma
                    </h2>

                    <Link href="/acceso">
                        <button className="w-full bg-[#ff6600] hover:bg-[#ff8533] text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-[#ff6600]/30 active:scale-95 uppercase tracking-widest text-sm cursor-pointer">
                            Iniciar Sesión / Registro
                        </button>
                    </Link>

                    <p className="text-[9px] text-gray-500 text-center uppercase tracking-[0.3em] font-bold">
                        Steami Systems • 2026
                    </p>
                </div>
            </div>
        </div>
    );
}

