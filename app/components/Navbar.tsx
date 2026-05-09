'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import Link from 'next/link'; // <--- ESTA ES LA LÍNEA QUE FALTA
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
        <nav className="bg-[#0b121e] border-b border-gray-800 p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
            {/* Logo de Steami */}
            <Link href="/" className="text-2xl font-bold text-[#ff6600] tracking-tighter">
                STEAMI<span className="text-white">PRO</span>
            </Link>

            {/* Enlaces y Estado de Usuario */}
            <div className="flex items-center gap-8">
                <Link href="/" className={`hover:text-[#ff6600] transition-colors font-medium ${pathname === '/' ? 'text-[#ff6600]' : 'text-white'}`}>
                    Inicio
                </Link>
                <Link href="/juegos" className={`hover:text-[#ff6600] transition-colors font-medium ${pathname === '/juegos' ? 'text-[#ff6600]' : 'text-white'}`}>
                    Juegos
                </Link>
                <Link href="/contacto" className={`hover:text-[#ff6600] transition-colors font-medium ${pathname === '/contacto' ? 'text-[#ff6600]' : 'text-white'}`}>
                    Contacto
                </Link>

                {/* BOTONES DE FAVORITOS Y CARRITO */}
                <div className="flex items-center gap-3">
                    <Link 
                        href="/favoritos" 
                        className={`px-4 py-1.5 rounded-full border transition-all font-bold text-[10px] tracking-widest ${
                            pathname === '/favoritos' 
                            ? 'bg-[#ff6600] border-[#ff6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.3)]' 
                            : 'border-[#ff6600]/40 text-[#ff6600] hover:bg-[#ff6600] hover:text-white'
                        }`}
                    >
                        ❤️ FAVORITOS
                    </Link>

                    <Link 
                        href="/carrito" 
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full border transition-all font-bold text-[10px] tracking-widest ${
                            pathname === '/carrito' 
                            ? 'bg-white border-white text-black shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                            : 'border-white/20 text-white hover:bg-white hover:text-black'
                        }`}
                    >
                        🛒 CARRITO
                    </Link>
                </div>

                {userEmail ? (
                    <div className="flex items-center gap-4 ml-4 border-l border-gray-700 pl-6">
                        <span className="text-sm text-blue-400 font-medium border border-blue-400/30 px-3 py-1 rounded-full bg-blue-400/5">
                            {userEmail}
                        </span>
                        <button 
                            onClick={cerrarSesion}
                            className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-md active:scale-95"
                        >
                            SALIR
                        </button>
                    </div>
                ) : (
                    <Link href="/login" className="bg-blue-600 px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-500 transition-all text-white">
                        ENTRAR
                    </Link>
                )}
            </div>
        </nav>
    );
}