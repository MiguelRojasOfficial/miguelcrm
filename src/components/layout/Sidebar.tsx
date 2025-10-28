"use client"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Sidebar() {
  const [open, setOpen] = useState(false)

  const handleLinkClick = () => {
    if (window.innerWidth < 768) setOpen(false)
  }

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded bg-gray-900 text-white focus:outline-none"
        >
          {open ? <X className="h6- w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      <aside 
        className={`
                    fixed top-0 h-screen w-64 bg-gray-900 text-white flex flex-col z-40 
                    transform ${open ? "translate-x-0" : "-translate-x-full"}
                    transition-transform duration-300 ease-in-out
                    md:translate-x-0 md:static md:flex
                  `}
      >
        <div className="h-16 flex items-center justify-center px-4 border-b border-gray-700">
          <h2 className="text-lg font-bold tracking-wide">MIGUEL CRM</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/dashboard" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded">Dashboard</Link>
          <Link href="/clientes" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded">Clientes</Link>
          <Link href="/ventas" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded">Ventas</Link>
          <Link href="/tareas" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded">Tareas</Link>
          <Link href="/configuracion" onClick={handleLinkClick} className="block px-3 py-2 hover:bg-gray-700 rounded">Configuración</Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <Link href="/portafolio" className="block px-3 py-2 bg-blue-600 text-center rounded hover:bg-blue-700 transition">
            Portafolio
          </Link>
        </div>
      </aside>
    </>
  )
}