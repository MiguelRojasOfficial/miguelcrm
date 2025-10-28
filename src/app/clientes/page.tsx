'use client'

import { useEffect, useState } from "react"
import { Cliente } from "@/types/cliente"
import Link from "next/link"

type Order = "asc" | "desc"

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [pagina, setPagina] = useState(1)
  const porPagina = 5
  const [filtroDominio, setFiltroDominio] = useState("todos")
  const [filtroEmpresa, setFiltroEmpresa] = useState("todos")
  const [ordenCampo, setOrdenCampo] = useState<keyof Cliente>("nombre")
  const [orden, setOrden] = useState<Order>("asc")

  useEffect(() => {
    const data = localStorage.getItem("clientes")
    if (data) setClientes(JSON.parse(data))
  }, [])

  const empresas = Array.from(new Set(clientes.map(c => c.empresa)))

  const clientesFiltrados = clientes.filter((c) => {
    const coincideBusqueda = 
    c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.telefono.includes(busqueda) ||
    c.empresa?.toLowerCase().includes(busqueda.toLowerCase())

    const coincideDominio = filtroDominio === "todos" ? true: (c.email || "").endsWith(filtroDominio)
    const coincideEmpresa = filtroEmpresa === "todos" ? true: c.empresa === filtroEmpresa

    return coincideBusqueda && coincideDominio && coincideEmpresa
  })
  .sort((a, b) => {
      const valA = a[ordenCampo]
      const valB = b[ordenCampo]

      if (typeof valA === "string" && typeof valB === "string") {
        if (orden === "asc") return valA.localeCompare(valB)
        else return valB.localeCompare(valA)
      } else if (typeof valA === "number" && typeof valB === "number") {
        return orden === "asc" ? valA - valB : valB - valA
      }
      return 0
    })

  const totalPaginas = Math.ceil(clientesFiltrados.length / porPagina)
  const inicio = (pagina - 1) * porPagina
  const clientesPagina = clientesFiltrados.slice(inicio, inicio + porPagina)

  function handleDelete(id: string) {
    if (!confirm("¿Seguro que desea eliminar este cliente?")) return
    const updated = clientes.filter(c => c.id !== id)
    setClientes(updated)
    localStorage.setItem("clientes", JSON.stringify(updated))
  }

  const toggleOrden = (campo: keyof Cliente) => {
    if (ordenCampo === campo) {
      setOrden(orden === "asc" ? "desc" : "asc")
    } else {
      setOrdenCampo(campo)
      setOrden("asc")
    }
  }

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[100vw] overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 font-bold">Clientes</h2>
        <Link
          href="/clientes/nuevo"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          + Nuevo Cliente
        </Link>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-strech md:items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre, email, teléfono o empresa..."
          value={busqueda}
          onChange={(e) => {
            setBusqueda(e.target.value)
            setPagina(1)
          }}
          className="flex-1 text-gray-500 border px-3 py-2 rounded-lg shadow-sm min-w-[200px]" 
        />
        <select
          value={filtroDominio}
          onChange={(e) => {
            setFiltroDominio(e.target.value)
            setPagina(1)
          }}
          className="border px-3 py-2 rounded-lg text-gray-500"
        >
          <option value="todos">Todos</option>
          <option value="@gmail.com">@gmail.com</option>
          <option value="@empresa.com">@empresa.com</option>
        </select>

        <select
          value={filtroEmpresa}
          onChange={(e) => {
            setFiltroEmpresa(e.target.value)
            setPagina(1)
          }}
          className="border px-3 py-2 rounded-lg text-gray-500"
        >
          <option value="todos">Todas las empresas</option>
          {empresas.map((emp, i) => (
            <option key={i} value={emp}>{emp}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full min-w-[700px] text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 cursor-pointer" onClick={() => toggleOrden("nombre")}>Nombre {ordenCampo === "nombre" ? (orden === "asc" ? "▲" : "▼") : ""}</th>
              <th className="p-3 cursor-pointer" onClick={() => toggleOrden("email")}>Email {ordenCampo === "email" ? (orden === "asc" ? "▲" : "▼") : ""}</th>
              <th className="p-3 cursor-pointer" onClick={() => toggleOrden("telefono")}>Teléfono {ordenCampo === "telefono" ? (orden === "asc" ? "▲" : "▼") : ""}</th>
              <th className="p-3 cursor-pointer" onClick={() => toggleOrden("empresa")}>Empresa {ordenCampo === "empresa" ? (orden === "asc" ? "▲" : "▼") : ""}</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientesPagina.length > 0 ? (
              clientesPagina.map((c) => (
                <tr key={c.id} className="text-gray-600 border-t hover:bg-gray-50">
                  <td className="p-3">{c.nombre}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.telefono}</td>
                  <td className="p-3">{c.empresa}</td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <Link
                      href={`/clientes/${c.id}/editar`}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-xs sm:text-sm min-w-[80px] text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-xs sm:text-sm min-w-[80px] text-center"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No se encontraron clientes
                </td>
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
    </div>
  )
}