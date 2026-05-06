'use client';

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-[#0b121e] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-[#0b121e] to-[#0b121e] text-white flex flex-col items-center justify-center p-6">
      
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Título con resplandor */}
        <div className="space-y-2">
          <h1 className="text-6xl font-black text-[#ff6600] uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(255,102,0,0.4)]">
            Contacto
          </h1>
          <p className="text-gray-400 text-lg font-medium">
            ¿Alguna duda sobre la enciclopedia? Estamos a un clic de distancia.
          </p>
        </div>

        {/* Tarjeta Estilo Gaming */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ff6600] to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-[#162031] border border-gray-800 rounded-2xl p-10 space-y-8">
            
            {/* Sección Email */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-orange-500/10 p-3 rounded-xl mb-2">
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest">Correo Electrónico</h3>
              <p className="text-2xl font-bold hover:text-[#ff6600] transition-colors cursor-pointer">
                contacto@steami.pro
              </p>
            </div>

            <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent w-full"></div>

            {/* Sección Soporte */}
            <div className="flex flex-col items-center space-y-2">
              <div className="bg-blue-500/10 p-3 rounded-xl mb-2">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-gray-400 uppercase text-xs font-bold tracking-widest">Estado del Soporte</h3>
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-2xl font-bold">Disponible 24/7</p>
              </div>
            </div>
          </div>
        </div>

        {/* Botón de acción opcional */}
        <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-3 rounded-full text-sm font-bold transition-all active:scale-95">
          Volver al Inicio
        </button>
      </div>
    </div>
  );
}