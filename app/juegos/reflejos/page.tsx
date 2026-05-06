import Image from "next/image";
import Link from "next/link";

export default function ReflejosPage() {
    // --- CONFIGURACIÓN DEL JUEGO TOP (REFLEJOS) ---
    const juegoTop = {
        nombre: "EldenRun",
        foto: "/imagenes/eldenrun.jpg"
    };

    // --- CONFIGURACIÓN DE TUS OTROS JUEGOS DE REFLEJOS ---
    const otrosJuegos = [
        { id: 1, nombre: "TRENECITO y explosiones SIMULATOR", foto: "/imagenes/trenecitobum.jpg" },
        { id: 2, nombre: "PIANO TILES PIRATA", foto: "/imagenes/reflejos-2.jpg" },
        { id: 3, nombre: "REACCIÓN BINARIA", foto: "/imagenes/reflejos-3.jpg" },
    ];

    return (
        <div className="p-20 min-h-screen bg-gray-900 text-white text-center">
            <h1 className="text-4xl font-bold text-fuchsia-600 uppercase tracking-tighter">
                Categoría: Reflejos
            </h1>
            <p className="mt-2 text-gray-400 italic">
                &quot;Juegos tan difíciles que no se los han pasado ni los desarroyadores con chetos. No aseguramos que el final del gameplay compile correctamnete.&quot;
            </p>

            {/* --- SECCIÓN JUEGO TOP VENTAS --- */}
            <div className="mt-12 max-w-md mx-auto bg-gradient-to-b from-fuchsia-900/20 to-gray-800 p-6 rounded-2xl border border-fuchsia-900/50 shadow-2xl">
                <h2 className="text-xl font-bold text-orange-500 mb-2 uppercase">
                    TOP VENTAS REFLEJOS
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

                <div className="flex flex-col gap-2">
                    <button className="bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold transition uppercase text-sm">
                        Comprar ahora
                    </button>
                    <div className="flex gap-2">
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-xs transition">Deseados</button>
                        <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-xs transition">Favorito</button>
                    </div>
                </div>
            </div>

            {/* --- OTROS JUEGOS DEL GÉNERO --- */}
            <h2 className="text-3xl font-bold mt-20 mb-10 text-left border-b border-gray-700 pb-2 uppercase tracking-widest text-fuchsia-400">
                Retos para la vista
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {otrosJuegos.map((juego) => (
                    <div key={juego.id} className="bg-gray-800 p-4 rounded-xl flex flex-col shadow-lg border border-gray-700 hover:border-fuchsia-900/50 transition">
                        
                        <h3 className="text-lg font-bold mb-4 text-orange-400 min-h-[3.5rem] flex items-center justify-center">
                            {juego.nombre}
                        </h3>
                        
                        <div className="relative w-full h-80 mb-4 overflow-hidden rounded-md bg-black/40">
                            <Image 
                                src={juego.foto} 
                                alt={juego.nombre} 
                                fill
                                className="object-contain" 
                            />
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-auto">
                            <button className="bg-green-700 hover:bg-green-600 py-2 rounded text-sm font-semibold transition uppercase">
                                Comprar
                            </button>
                            <div className="grid grid-cols-2 gap-2">
                                <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-[10px] text-gray-300 transition">
                                    Deseados
                                </button>
                                <button className="bg-gray-700 hover:bg-gray-600 py-2 rounded text-[10px] text-gray-300 transition">
                                    Favoritos
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* ESPACIO PARA "PRÓXIMAMENTE" */}
                <div className="bg-gray-800/30 h-80 lg:h-auto min-h-[300px] p-6 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-700">
                    <p className="text-gray-600 font-bold italic text-xs uppercase tracking-[0.3em] text-center leading-loose">
                        Más lag <br/> próximamente...
                    </p>
                </div>
            </div>

            <Link href="/juegos" className="inline-block mt-20 text-orange-500 hover:underline">
                ← Volver al catálogo
            </Link>
        </div>
    );
}
