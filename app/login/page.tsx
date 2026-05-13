'use client';
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const router = useRouter();

    const manejarLoginGoogle = async () => {
        setMensaje("Conectando con Google...");
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/juegos',
            },
        });

        if (error) {
            setMensaje("Error al conectar con Google: " + error.message);
        }
    };

    const manejarLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje("Verificando credenciales...");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMensaje("Error: Usuario o contraseña incorrectos");
        } else {
            setMensaje("¡Bienvenido! Entrando a Steami...");
            setTimeout(() => router.push('/juegos'), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b121e] text-white flex items-center justify-center p-6">
            <div className="bg-[#162031] p-8 rounded-2xl shadow-2xl border border-white/5 w-full max-w-md">
                
                {/* Logo unificado */}
                <h1 className="text-4xl font-black text-center mb-1 tracking-tighter italic">
                    <span className="text-[#ff6600]">STEAMI</span>
                </h1>
                <p className="text-gray-400 text-center mb-8 text-[10px] uppercase tracking-[0.2em] font-bold italic opacity-70">
                    Inicia sesión para jugar
                </p>

                <form onSubmit={manejarLogin} className="flex flex-col gap-3">
                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        className="w-full bg-[#1c293d] border border-white/5 p-4 rounded-xl focus:outline-none focus:border-[#ff6600]/50 transition-all font-sans text-sm"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        className="w-full bg-[#1c293d] border border-white/5 p-4 rounded-xl focus:outline-none focus:border-[#ff6600]/50 transition-all font-sans text-sm"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button className="bg-[#ff6600] hover:bg-[#ff8533] text-white font-black py-4 rounded-xl mt-2 shadow-lg shadow-[#ff6600]/10 transition-all active:scale-95 uppercase tracking-widest text-xs">
                        INGRESAR
                    </button>
                </form>

                {/* SEPARADOR MÁS FINO */}
                <div className="flex items-center my-5 gap-3 opacity-30">
                    <div className="h-[1px] bg-white flex-grow"></div>
                    <span className="text-[9px] font-bold">O</span>
                    <div className="h-[1px] bg-white flex-grow"></div>
                </div>

                {/* BOTÓN DE GOOGLE REDUCIDO */}
                <div className="px-8"> 
                    <button 
                        onClick={manejarLoginGoogle}
                        type="button"
                        className="w-full bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 py-2.5 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold"
                    >
                        <img 
                            src="https://www.google.com/favicon.ico" 
                            alt="Google" 
                            className="w-3.5 h-3.5 grayscale opacity-70 group-hover:grayscale-0" 
                        />
                        Iniciar sesión con Google
                    </button>
                </div>

                {mensaje && (
                    <p className="mt-6 text-center text-[9px] font-black uppercase tracking-widest text-[#ff6600] py-2">
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}