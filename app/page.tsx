'use client';
import { useState } from 'react';

export default function PaginaSteami() {
  const [nombre, setNombre] = useState('');
  const [mensajeServidor, setMensajeServidor] = useState('');

  const crearUsuarioWeb = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombre, rol: 'estudiante' }),
    });
    const data = await res.json();
    setMensajeServidor(data.status);
    setNombre('');
  };

  return (
    <div style={{ 
      backgroundColor: '#1b2838', 
      color: '#c7d5e0', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif' 
    }}>
      <h1 style={{ color: '#66c0f4', fontSize: '3rem' }}>STEAMI</h1>
      <p>Panel de Administración de Usuarios</p>

      <form onSubmit={crearUsuarioWeb} style={{ 
        backgroundColor: '#2a475e', 
        padding: '30px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)' 
      }}>
        <input
  type="text"
  placeholder="Nombre del nuevo gamer..."
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
  spellCheck="false" // Desactiva la línea roja
  style={{ 
    padding: '12px', 
    borderRadius: '4px', 
    border: 'none', 
    marginRight: '10px', 
    width: '250px',
    backgroundColor: '#c7d5e0', // Fondo gris claro
    color: '#000000',           // LETRA NEGRA (para que se vea al escribir)
    outline: 'none'             // Quita el borde feo al hacer clic
  }}
  required
/>
        <button type="submit" style={{ 
          padding: '12px 20px', 
          backgroundColor: '#4caf50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Añadir Usuario
        </button>
      </form>

      {mensajeServidor && (
        <div style={{ 
          marginTop: '20px', 
          padding: '10px', 
          backgroundColor: 'rgba(76, 175, 80, 0.2)', 
          border: '1px solid #4caf50',
          borderRadius: '5px' 
        }}>
          {mensajeServidor}
        </div>
      )}

      <button 
        onClick={async () => {
          const res = await fetch('/api/saludo');
          const data = await res.json();
          alert("Respuesta del servidor: " + data.mensaje);
        }}
        style={{ marginTop: '40px', background: 'none', border: '1px solid #66c0f4', color: '#66c0f4', cursor: 'pointer', padding: '5px 10px' }}
      >
        Probar conexión GET
      </button>
    </div>
  );
}