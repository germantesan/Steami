'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const obtenerUsuario = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserEmail(user.email ?? null);
        };

        obtenerUsuario();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (session) {
                setUserEmail(session.user.email ?? null);
            } else {
                setUserEmail(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const cerrarSesion = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <nav className="bg-[#0b121e] border-b border-white/5 p-4 flex justify-between items-center shadow-md sticky top-0 z-50 font-sans">
            {/* Logo de Steami */}
            <Link href="/" className="text-2xl font-black text-[#ff6600] tracking-tighter italic cursor-pointer">
                STEAMI<span className="text-white">PRO</span>
            </Link>

            {/* Enlaces principales */}
            <div className="flex items-center gap-8">
                <Link href="/" className={`hover:text-[#ff6600] transition-colors font-black uppercase text-[11px] tracking-widest cursor-pointer ${pathname === '/' ? 'text-[#ff6600]' : 'text-white'}`}>
                    Inicio
                </Link>
                <Link href="/juegos" className={`hover:text-[#ff6600] transition-colors font-black uppercase text-[11px] tracking-widest cursor-pointer ${pathname === '/juegos' ? 'text-[#ff6600]' : 'text-white'}`}>
                    Juegos
                </Link>
                <Link href="/contacto" className={`hover:text-[#ff6600] transition-colors font-black uppercase text-[11px] tracking-widest cursor-pointer ${pathname === '/contacto' ? 'text-[#ff6600]' : 'text-white'}`}>
                    Contacto
                </Link>

                {/* BOTONES DE ACCIÓN (Favoritos, Carrito y Mis Juegos) */}
                <div className="flex items-center gap-3 ml-4">
                    
                    {/* BOTÓN MIS JUEGOS */}
                    {userEmail && (
                        <Link 
                            href="/mis-juegos" 
                            className={`px-4 py-1.5 rounded-full border transition-all font-black text-[10px] tracking-widest cursor-pointer ${
                                pathname === '/mis-juegos' 
                                ? 'bg-[#ff6600] border-[#ff6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.3)]' 
                                : 'border-[#ff6600]/40 text-[#ff6600] hover:bg-[#ff6600] hover:text-white'
                            }`}
                        >
                            🎮 MIS JUEGOS
                        </Link>
                    )}

                    {/* BOTÓN FAVORITOS */}
                    <Link 
                        href="/favoritos" 
                        className={`px-4 py-1.5 rounded-full border transition-all font-black text-[10px] tracking-widest cursor-pointer ${
                            pathname === '/favoritos' 
                            ? 'bg-[#ff6600] border-[#ff6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.3)]' 
                            : 'border-[#ff6600]/40 text-[#ff6600] hover:bg-[#ff6600] hover:text-white'
                        }`}
                    >
                        ❤️ FAVORITOS
                    </Link>

                    {/* BOTÓN CARRITO */}
                    <Link 
                        href="/carrito" 
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all font-black text-[10px] tracking-widest cursor-pointer ${
                            pathname === '/carrito' 
                            ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                            : 'border-white/20 text-white hover:bg-white hover:text-black'
                        }`}
                    >
                        🛒 CARRITO
                    </Link>

                    {/* EL BOTÓN "CUENTA" HA SIDO ELIMINADO DE AQUÍ */}
                </div>

                {/* Estado de Usuario / Login */}
                {userEmail ? (
                    <div className="flex items-center gap-4 ml-4 border-l border-white/10 pl-6">
                        <span className="text-[10px] text-[#ff6600] font-black border border-[#ff6600]/30 px-3 py-1 rounded-full bg-[#ff6600]/5 uppercase">
                            {userEmail.split('@')[0]}
                        </span>
                        <button 
                            onClick={cerrarSesion}
                            className="text-[10px] bg-red-600/10 border border-red-600/50 hover:bg-red-600 text-red-500 hover:text-white font-black px-4 py-2 rounded-lg transition-all active:scale-95 uppercase tracking-tighter cursor-pointer"
                        >
                            SALIR
                        </button>
                    </div>
                ) : (
                    <Link href="/acceso" className="bg-[#ff6600] px-5 py-2 rounded-lg text-[11px] font-black hover:bg-white hover:text-black transition-all text-white uppercase tracking-widest cursor-pointer">
                        ENTRAR
                    </Link>
                )}
            </div>
        </nav>
    );
}