export default function TerrorPage() {
    return (
    <div className="p-20 text-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-600 uppercase">
        Categoría: Reflejos
        </h1>
        <p className="mt-4 text-gray-400">
        Juegos tan difíciles que no se los han pasado ni los desarroyadores con chetos. No aseguramos que el final del gameplay compile correctamnete.
        </p>
        
        {/* Botón para volver atrás */}
        <a href="/juegos" className="inline-block mt-10 text-orange-500 hover:underline">
        ← Volver al catálogo
        </a>
    </div>
    );
}