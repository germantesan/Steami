export default function ColeccionPage() {
    return (
    <div className="p-20 text-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-4xl font-bold text-red-600 uppercase">
        Categoría: Coleccion
        </h1>
        <p className="mt-4 text-gray-400">
        Nuestros juegos no violan ninguna propiedad intelectual. Si piensas que nuestros juegos violan alguna propiedad intelectual, llama al teléfono de contacto de la página de contacto para que comprendas las razones por las que nuestros juegos no violan ninguna propiedad intelectual. Si sigues pensando que nuestros juegos violan alguna propiedad intelectual está usted equivocado, pues le recordamos que nuestros juegos no violan ninguna propiedad intelectual. Todos los derechos reservados.
        </p>
        
        {/* Botón para volver atrás */}
        <a href="/juegos" className="inline-block mt-10 text-orange-500 hover:underline">
        ← Volver al catálogo
        </a>
    </div>
    );
}