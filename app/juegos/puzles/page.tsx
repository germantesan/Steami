import Image from "next/image";
import Link from "next/link";

export default function PuzzlePage() {
  // Datos de ejemplo para los 4 juegos extra
    const otrosJuegos = [1, 2, 3, 4];

    return (
    <div className="p-20 min-h-screen bg-gray-900 text-white text-center">
        <h1 className="text-4xl font-bold text-red-600 uppercase tracking-tighter">
        Categoría: Puzles
        </h1>
        <p className="mt-2 text-gray-400 italic">
        &quot;Solo aptos para polineuronales.&quot;
        </p>

      {/* --- SECCIÓN JUEGO TOP VENTAS --- */}
        <div className="mt-12 max-w-md mx-auto bg-gradient-to-b from-red-900/20 to-gray-800 p-6 rounded-2xl border border-red-900/50 shadow-2xl">
        <h2 className="text-xl font-bold text-orange-500 mb-4 uppercase">
            Juego número 1 en ventas
        </h2>
        
        {/* Imagen optimizada */}
        <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg border-2 border-orange-500">
            <Image 
            src="/terror-top.jpg" 
            alt="Top Ventas puzles" 
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            />
        </div>

        <div className="flex flex-col gap-2">
            <button className="bg-orange-600 hover:bg-orange-700 py-2 rounded font-bold transition uppercase text-sm">Comprar ahora</button>
            <div className="flex gap-2">
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-xs transition">Deseados</button>
            <button className="flex-1 bg-gray-700 hover:bg-gray-600 py-2 rounded text-xs transition">Favorito</button>
            </div>
        </div>
        </div>

      {/* --- OTROS JUEGOS DEL GÉNERO --- */}
        <h2 className="text-3xl font-bold mt-20 mb-10 text-left border-b border-gray-700 pb-2">
        Otros juegos del género
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {otrosJuegos.map((id) => (
            <div key={id} className="bg-gray-800 p-4 rounded-xl flex flex-col shadow-lg border border-gray-700 hover:border-red-900/50 transition">
            <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md">
                <Image 
                src={`/terror-${id}.jpg`} 
                alt={`Juego de calidad ${id}`} 
                fill
                className="object-cover"
                />
            </div>
            
            
            <div className="flex flex-col gap-2 mt-auto">
                <button className="bg-green-700 hover:bg-green-600 py-1.5 rounded text-sm font-semibold transition">Comprar</button>
                <button className="bg-gray-700 hover:bg-gray-600 py-1.5 rounded text-xs text-gray-300 transition">Deseados</button>
                <button className="bg-gray-700 hover:bg-gray-600 py-1.5 rounded text-xs text-gray-300 transition">Favoritos</button>
            </div>
            </div>
        ))}
        </div>

        <Link href="/juegos" className="inline-block mt-20 text-orange-500 hover:underline">
        ← Volver al catálogo
        </Link>
    </div>
    );
}