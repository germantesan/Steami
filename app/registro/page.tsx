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
            // Esperamos 2 segundos y lo mandamos a los juegos
            setTimeout(() => router.push('/juegos/supervivencia'), 2000);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b121e] text-white flex items-center justify-center p-6">
            <div className="bg-[#162031] p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2 text-blue-400">STEAMI</h1>
                <p className="text-gray-400 text-center mb-8 text-sm">Crea tu cuenta de gamer</p>

                <form onSubmit={manejarRegistro} className="flex flex-col gap-4">
                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Email</label>
                        <input 
                            type="email" 
                            placeholder="nombre@ejemplo.com"
                            className="w-full bg-[#1c293d] border border-gray-700 p-3 rounded-lg mt-1 focus:outline-none focus:border-blue-500 transition"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="text-xs uppercase tracking-widest text-gray-500 font-bold ml-1">Contraseña</label>
                        <input 
                            type="password" 
                            placeholder="••••••••"
                            className="w-full bg-[#1c293d] border border-gray-700 p-3 rounded-lg mt-1 focus:outline-none focus:border-blue-500 transition"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-blue-900/20 transition-all active:scale-95">
                        Unirse a la comunidad
                    </button>
                </form>

                {mensaje && (
                    <p className="mt-6 text-center text-sm font-medium text-orange-400 bg-orange-400/10 py-2 rounded-md">
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}