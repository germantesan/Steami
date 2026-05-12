'use client';
import { useState } from 'react';
import { supabase } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function RegistroPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [mensaje, setMensaje] = useState('');
    const router = useRouter();

    const manejarRegistro = async (e: React.FormEvent) => {
        e.preventDefault();
        setMensaje("Procesando...");

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMensaje("Error: " + error.message);
        } else {
            setMensaje("¡Cuenta creada con éxito! Redirigiendo...");
            setTimeout(() => router.push('/juegos'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b121e] text-white flex items-center justify-center p-6">
            <div className="bg-[#162031] p-8 rounded-2xl shadow-2xl border border-white/5 w-full max-w-md">
                {/* Título unificado: Blanco y Naranja */}
                <h1 className="text-4xl font-black text-center mb-2 tracking-tighter italic">
                    <span className="text-white">STE</span><span className="text-[#ff6600]">AMI</span>
                </h1>
                <p className="text-gray-400 text-center mb-8 text-xs uppercase tracking-widest font-bold">
                    Crea tu cuenta de gamer
                </p>

                <form onSubmit={manejarRegistro} className="flex flex-col gap-4">
                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#ff6600] font-black ml-1">
                            Email
                        </label>
                        <input 
                            type="email" 
                            placeholder="nombre@ejemplo.com"
                            className="w-full bg-[#1c293d] border border-white/10 p-3 rounded-xl mt-1 focus:outline-none focus:border-[#ff6600] transition-all text-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-[10px] uppercase tracking-widest text-[#ff6600] font-black ml-1">
                            Contraseña
                        </label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full bg-[#1c293d] border border-white/10 p-3 rounded-xl mt-1 focus:outline-none focus:border-[#ff6600] transition-all text-sm"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="bg-[#ff6600] hover:bg-[#ff8533] text-white font-black py-4 rounded-xl mt-4 shadow-lg shadow-[#ff6600]/20 transition-all active:scale-95 uppercase tracking-widest text-xs">
                        Unirse a la comunidad
                    </button>
                </form>

                {mensaje && (
                    <p className="mt-6 text-center text-[10px] font-black uppercase tracking-widest text-[#ff6600] bg-[#ff6600]/5 py-3 rounded-xl border border-[#ff6600]/20">
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}
