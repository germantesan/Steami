'use client';
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const router = useRouter();

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
                
                {/* Logo unificado: STE (Blanco) AMI (Naranja) */}
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter italic">
                    <span className="text-[#ff6600]">STEAMI</span>
                </h1>
                <p className="text-gray-400 text-center mb-8 text-xs uppercase tracking-widest font-bold italic">
                    Inicia sesión para jugar
                </p>

                <form onSubmit={manejarLogin} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        className="w-full bg-[#1c293d] border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#ff6600] transition-all font-sans text-sm"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        className="w-full bg-[#1c293d] border border-white/10 p-4 rounded-xl focus:outline-none focus:border-[#ff6600] transition-all font-sans text-sm"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    <button className="bg-[#ff6600] hover:bg-[#ff8533] text-white font-black py-4 rounded-xl mt-4 shadow-lg shadow-[#ff6600]/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
                        INGRESAR
                    </button>
                </form>

                {mensaje && (
                    <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-[#ff6600] bg-[#ff6600]/5 py-3 rounded-xl border border-[#ff6600]/20 font-sans">
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}
