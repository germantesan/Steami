# Contexto del Proyecto: STEAMI

Este archivo define las reglas de desarrollo y la estructura para el proyecto STEAMI.

## Tecnologías Principales
- **Framework**: Next.js 14+ (App Router)
- **Lenguaje**: TypeScript / JavaScript
- **Estilos**: Tailwind CSS (Tema oscuro y naranja)
- **Backend/Auth**: Supabase

## Estructura de Rutas (`/app`)
- `/`: Página principal de inicio.
- `/api`: Endpoints y lógica de servidor.
- `/carrito`: Gestión de productos seleccionados.
- `/checkout`: Proceso de finalización de compra.
- `/contacto`: Página de atención al cliente.
- `/favoritos`: Lista de deseos guardados.
- `/juego`: Vista detallada de un título.
- `/juegos`: Catálogo general de Steami.
- `/login`: Inicio de sesión (Email y Google).
- `/mis-juegos`: Biblioteca del usuario.
- `/registro`: Formulario de alta de nuevos usuarios.

## Reglas de Estilo Visual
- **Fondo**: `#0b121e`
- **Tarjetas/Paneles**: `#162031`
- **Color de Acento**: `#ff6600` (Naranja corporativo)
- **Botones**: Texto en mayúsculas, fuente gruesa (bold/black) y espaciado de letras ancho.

## Configuración y Libs
- `/lib/supabase.js`: Configuración del cliente de Supabase.
- `.env.local`: Variables de entorno para las claves de API.Llll