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
            // Redirigimos a la sección de juegos
            setTimeout(() => router.push('/juegos/supervivencia'), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-[#0b121e] text-white flex items-center justify-center p-6">
            <div className="bg-[#162031] p-8 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-2 text-blue-400">STEAMI</h1>
                <p className="text-gray-400 text-center mb-8 text-sm italic">Inicia sesión para jugar</p>

                <form onSubmit={manejarLogin} className="flex flex-col gap-4">
                    <input 
                        type="email" 
                        placeholder="Correo electrónico"
                        className="w-full bg-[#1c293d] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all font-sans"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input 
                        type="password" 
                        placeholder="Contraseña"
                        className="w-full bg-[#1c293d] border border-gray-700 p-3 rounded-lg focus:outline-none focus:border-blue-500 transition-all font-sans"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg mt-4 shadow-lg shadow-blue-900/20 transition-all active:scale-95 font-sans">
                        INGRESAR
                    </button>
                </form>

                {mensaje && (
                    <p className="mt-6 text-center text-sm font-medium text-orange-400 bg-orange-400/10 py-2 rounded-md font-sans">
                        {mensaje}
                    </p>
                )}
            </div>
        </div>
    );
}