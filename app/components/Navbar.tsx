'use client';
import { useEffect, useState } from 'react';
import { supabase } from "@/lib/supabase";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // 1. Verificar si hay un usuario al cargar la página
        const obtenerUsuario = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) setUserEmail(user.email ?? null);
        };

        obtenerUsuario();

        // 2. Escuchar cambios en la sesión (Login/Logout)
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
        router.push('/'); // Al cerrar sesión, volvemos al inicio
    };

    // ... (mismo código de arriba hasta el return)

    return (
        <nav className="bg-[#0b121e] border-b border-gray-800 p-4 flex justify-between items-center shadow-md">
            {/* Logo de Steami */}
            <Link href="/" className="text-2xl font-bold text-[#ff6600] tracking-tighter">
                STEAMI<span className="text-white">PRO</span>
            </Link>

            {/* Enlaces y Estado de Usuario */}
            <div className="flex items-center gap-8">
                {/* Cambiamos text-white para que se vea siempre */}
                <Link href="/" className="text-white hover:text-[#ff6600] transition-colors font-medium">
                    Inicio
                </Link>
                <Link href="/juegos" className="text-white hover:text-[#ff6600] transition-colors font-medium">
                    Juegos
                </Link>
                <Link href="/contacto" className="text-white hover:text-[#ff6600] transition-colors font-medium">
                    Contacto
                </Link>

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