'use client';

export default function Home() {
    return (
        /* CONTENEDOR PRINCIPAL */
        <div className="relative min-h-screen flex flex-col items-center justify-center font-sans overflow-hidden">
            
            {/* IMAGEN DE PORTADA ACLARADA */}
            <div 
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/imagenes/portada.png')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Overlay muy suave (10%) solo para dar contraste al texto blanco, sin oscurecer la imagen */}
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            {/* CONTENIDO (Solo el Logo) */}
            <div className="relative z-10 flex flex-col items-center w-full">
                
                {/* TÍTULO PRINCIPAL STEAMI - Con sombra fuerte para que se lea bien sobre la imagen clara */}
                <h1 className="text-9xl font-black tracking-tighter italic drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                    <span className="text-white">STE</span><span className="text-[#ff6600]">AMI</span>
                </h1>
                
            </div>
        </div>
    );
}

