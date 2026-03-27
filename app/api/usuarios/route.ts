import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const data = await request.json(); // Aquí recibes el JSON
    return NextResponse.json({ 
    recibido: data,
    status: "Usuario creado con éxito" 
    });
}
