"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // Ruta ajustada según tu carpeta lib

export default function SupervivenciaPage() {
    const [juegos, setJuegos] = useState<any[]>([]);

    useEffect(() => {
        const fetchJuegos = async () => {
            const { data, error } = await supabase
                .from('video_juego')
                .select('*')
                .eq('id_categoria', 2);

            if (data) {
                setJuegos(data);
            }
        };

        fetchJuegos();
    }, []);

    const juegoTop = {
        nombre: "Follin New Benidorm",
        foto: "/imagenes/newBenidorm.jpg"
    };

    return (
        <div className="p-20 min-h-screen bg-gray-900 text-white text-center">
            <h1 className="text-4xl font-bold text-lime-600 uppercase tracking-tighter">
                Categoría: Supervivencia
            </h1>
            <p className="mt-2 text-gray-400 italic">
                &quot;Si te gusta sufrir donde TODO te mata, disfruta.&quot;
            </p>

            {/* SECCIÓN JUEGO TOP */}
            <div className="mt-12 max-w-md mx-auto bg-gradient-to-b from-lime-900/20 to-gray-800 p-6 rounded-2xl border border-lime-900/50 shadow-2xl">
                <h2 className="text-xl font-bold text-orange-500 mb-2 uppercase">
                    TOP VENTAS SUPERVIVENCIA
                </h2>
                <h3 className="text-2xl font-extrabold text-white mb-4 uppercase tracking-tight">
                    {juegoTop.nombre}
                </h3>
                <div className="relative w-full h-96 mb-4 overflow-hidden rounded-lg border-2 border-orange-500 bg-black/50">
                    <Image 
                        src={juegoTop.foto} 
                        alt={juegoTop.nombre} 
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            <h2 className="text-3xl font-bold mt-20 mb-10 text-left border-b border-gray-700 pb-2 uppercase tracking-widest text-lime-400">
                Resiste si puedes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {juegos.map((juego, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-xl flex flex-col shadow-lg border border-gray-700 hover:border-lime-900/50 transition">
                        <h3 className="text-lg font-bold mb-4 text-orange-400 min-h-[3.5rem] flex items-center justify-center">
                            {juego.título}
                        </h3>
                        <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md bg-black/40">
                            <Image 
                                src={juego.imagen_portada} 
                                alt={juego.título || "Juego"} 
                                fill
                                className="object-contain" 
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-auto">
                            <button className="bg-green-700 hover:bg-green-600 py-2 rounded text-sm font-semibold transition uppercase">
                                Comprar
                            </button>
                        </div>
                    </div>
                ))}

                <div className="bg-gray-800/30 h-80 lg:h-auto min-h-[300px] p-6 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-700">
                    <p className="text-gray-600 font-bold italic text-xs uppercase tracking-[0.3em] text-center leading-loose">
                        Más suministros <br/> próximamente...
                    </p>
                </div>
            </div>

            <Link href="/juegos" className="inline-block mt-20 text-orange-500 hover:underline">
                ← Volver al catálogo
            </Link>
        </div>
    );
}