'use client'

import { useEffect, useState } from "react"
import { Cliente } from '@/types/cliente'
import Link from 'next/link'
import { Users, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])

  useEffect(() => {
    const data = localStorage.getItem('clientes')
    if (data) setClientes(JSON.parse(data))
  }, [])

  const totalClientes = clientes.length
  const ultimosClientes = clientes.slice(-5).reverse()

  const cards = [
    {
      title: 'Total Clientes',
      value: totalClientes,
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Nuevos este mes',
      value: clientes.filter(c => {
        const fecha = new Date(Number(c.id))
        const ahora = new Date()
        return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear()
      }).length,
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-100'
    },
    {
      title: 'Actividad',
      value: ultimosClientes.length,
      icon: <TrendingUp className="w-8 h-8 text-blue-600" />,
      color: 'bg-blue-100'
    }
  ]
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[100vw] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`p-4 md:p-6 rounded-xl shadow bg-white flex items-center justify-between ${card.color}`}
          >
            <div>
              <p className="text-sm md:text-base text-gray-600">{card.title}</p>
              <p className="text-xl md:text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>
      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
          <h3 className="text-lg font-semibold text-gray-500">Últimos clientes añadidos</h3>
          <Link
            href="/clientes"
            className="text-blue-400 font-medium hover:underline text-sm"
          >
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto bg-white shadow rounded-lg">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="p-2 md:p-3 text-gray-700">Nombre</th>
                <th className="p-2 md:p-3 text-gray-700">Email</th>
                <th className="p-2 md:p-3 text-gray-700">Teléfono</th>
                <th className="p-2 md:p-3 text-gray-700">Empresa</th>
                <th className="p-2 md:p-3 text-gray-700">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {ultimosClientes.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-2 md:p-3 text-gray-800">{c.nombre}</td>
                  <td className="p-2 md:p-3 text-gray-800">{c.email}</td>
                  <td className="p-2 md:p-3 text-gray-800">{c.telefono}</td>
                  <td className="p-2 md:p-3 text-gray-800">{c.empresa}</td>
                  <td className="p-2 md:p-3 flex gap-2">
                    <Link
                      href={`/clientes/${c.id}/editar`}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-xs sm:text-sm min-w-[80px] text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => {
                        const updated = clientes.filter(x => x.id !== c.id)
                        setClientes(updated)
                        localStorage.setItem('clientes', JSON.stringify(updated))
                      }}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-xs sm:text-sm min-w-[80px] text-center"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  )
}