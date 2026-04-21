export default function InfantilPage() {
    return (
    <div className="p-20 text-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-600 uppercase">
        Categoría: Infantil
        </h1>
        <p className="mt-4 text-gray-400">
        Pegi 18
        </p>
        
        {/* Botón para volver atrás */}
        <a href="/juegos" className="inline-block mt-10 text-orange-500 hover:underline">
        ← Volver al catálogo
        </a>
    </div>
    );
}