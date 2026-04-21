export default function PuzlePage() {
    return (
    <div className="p-20 text-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-600 uppercase">
        Categoría: PUZZLES
        </h1>
        <p className="mt-4 text-gray-400">
        Solo aptos para polineuronales.
        </p>
        
        {/* Botón para volver atrás */}
        <a href="/juegos" className="inline-block mt-10 text-orange-500 hover:underline">
        ← Volver al catálogo
        </a>
    </div>
    );
}