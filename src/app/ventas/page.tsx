'use client'

import { useEffect, useState } from "react"
import Link from "next/link"
import { Venta } from "@/types/ventas"

export default function VentasPage() {
    const [ventas, setVentas] = useState<Venta[]>([])
    const [busqueda, setBusqueda] = useState('')
    const [filtro, setFiltro] = useState<string>("")
    const [pagina, setPagina] = useState(1)
    const porPagina = 5
    const [toast, setToast] =  useState<string | null>(null)

    useEffect(() => {
        const data = localStorage.getItem('ventas')
        if (data) setVentas(JSON.parse(data))
    }, [])

    const ventasFiltradas = ventas.filter((v) => {
        const cliente = v.cliente?.toLowerCase() || ''
        const estado = v.estado?.toLowerCase() || ''
        const fecha = v.fecha || ''
        const q = busqueda.toLowerCase()

        const coincideBusqueda = 
            cliente.includes(q) || estado.includes(q) || fecha.includes(q)
        const coincideFiltro = filtro ? v.estado.toLowerCase() === filtro.toLowerCase() : true

        return coincideBusqueda && coincideFiltro
    })

    const totalPaginas = Math.ceil(ventasFiltradas.length / porPagina)
    const inicio = (pagina -1) * porPagina
    const ventasPagina = ventasFiltradas.slice(inicio, inicio + porPagina)

    function handleDelete(id: string) {
        if (!confirm('¿Seguro que desea eliminar esta venta?')) return
        const updated = ventas.filter((v) => v.id !== id)
        setVentas(updated)
        localStorage.setItem('ventas', JSON.stringify(updated))
    }

    return (
        <div className="p-4 md:p-8 space-y-6 max-w-[100vw] overflow-hidden">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-500">Ventas</h2>
                <Link
                    href="/ventas/nueva"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
                >
                    + Nueva Venta
                </Link>
            </div>

            <div className="flex flex-col md:flex-row flex-wrap items-strech md:items-center gap-3 mb-8">
                <input
                    type="text"
                    placeholder="Buscar por cliente, estado o fecha..."
                    value={busqueda}
                    onChange={(e) => {
                        setBusqueda(e.target.value)
                        setPagina(1)
                    }}
                    className="flex-1 text-gray-500 border px-3 py-2 rounded-lg shadow-sm min-w-[200px]"
                />

                <select
                    value={filtro}
                    onChange={(e) => { setFiltro(e.target.value); setPagina(1) }}
                    className="border rounded-lg px-3 py-2 text-gray-500"
                >
                    <option value="">Todas</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="en progreso">En progreso</option>
                    <option value="completada">Completada</option>
                </select>
            </div>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full min-w-[700px] text-left">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">Cliente</th>
                            <th className="p-3">Monto</th>
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Estado</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ventasPagina.length > 0 ? (
                            ventasPagina.map((v) => (
                                <tr key={v.id} className="border-t hover:bg-gray-50 transition text-gray-600">
                                    <td  className="p-3">{v.cliente}</td>
                                    <td  className="p-3 font-medium">S/ {v.monto.toFixed(2)}</td>
                                    <td  className="p-3">{v.fecha}</td>
                                    <td>
                                        <span
                                            className={`px-3 py-1 rounded text-xs font-semibold ${
                                                v.estado === 'Completada'
                                                ? 'bg-green-100 text-green-700'
                                                : v.estado === 'Pendiente'
                                                ? 'bg-yellow-100 text-yellow-700'
                                                : 'bg-red-100 text-red-700'
                                            }`}
                                            >
                                                {v.estado}
                                        </span>
                                    </td>
                                    <td className="p-3 flex flex-wrap gap-2">
                                        <Link
                                            href={`/ventas/${v.id}/editar`}
                                            className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-xs sm:text-sm min-w-[80px] text-center"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(v.id)}
                                            className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-xs sm:text-sm min-w-[80px] text-center"
                                        >
                                            Elimninar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="text-center text-gray-500 px-4 py-6"
                                >No se encontraron ventas registradas</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-2 mt-4">
                <button
                    onClick={() => setPagina(p => Math.max(1, p - 1))}
                    className="px-3 py-1 rounded text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                    ←
                </button>
                <div className="text-sm text-gray-500">
                    Página {pagina} de {totalPaginas}
                </div>
                <button
                    onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}
                    className="px-3 py-1 rounded text-gray-600 bg-gray-100 hover:bg-gray-200"
                >
                    →
                </button>
                </div>
            )}

            {toast && (
                <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                {toast}
                </div>
            )}
        </div>
    )
}
