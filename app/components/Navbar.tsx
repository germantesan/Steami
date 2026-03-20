import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-black text-orange-500 tracking-tighter">
          STEAMI<span className="text-white">PRO</span>
        </h1>
        <div className="space-x-6 font-medium">
          <Link href="/" className="hover:text-orange-400 transition">Inicio</Link>
          <Link href="/juegos" className="hover:text-orange-400 transition">Juegos</Link>
          <Link href="/contacto" className="hover:text-orange-400 transition">Contacto</Link>
        </div>
      </div>
    </nav>
  );
}