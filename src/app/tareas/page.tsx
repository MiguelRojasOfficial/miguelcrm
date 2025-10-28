'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { Tarea } from "@/types/tarea"
import { getTareas, saveTareas } from "@/lib/localStorage"

export default function TareasPage() {
  const [tareas, setTareas] = useState<Tarea[]>([])
  const [busqueda, setBusqueda] = useState("")
  const [filtro, setFiltro] = useState<string>("")
  const [pagina, setPagina] = useState(1)
  const porPagina = 5
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    setTareas(getTareas())
  }, [])

  function handleDelete(id: string) {
    if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return
    const updated = tareas.filter((t) => t.id !== id)
    setTareas(updated)
    saveTareas(updated)
    setToast("Tarea eliminada correctamente")
    setTimeout(() => setToast(null), 2000)
  }

  const tareasFiltradas = tareas.filter(t =>
    (t.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      t.descripcion.toLowerCase().includes(busqueda.toLowerCase())) &&
    (filtro ? t.estado === filtro : true)
  )

  const totalPaginas = Math.ceil(tareasFiltradas.length / porPagina)
  const inicio = (pagina - 1) * porPagina
  const tareasPagina = tareasFiltradas.slice(inicio, inicio + porPagina)

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-[100vw] overflow-hidden">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-500 font-bold">Tareas</h2>
        <Link
          href="/tareas/nueva"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base"
        >
          + Nueva Tarea
        </Link>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-strech md:items-center gap-3 mb-8">
        <input
          className="flex-1 border text-gray-500 px-3 py-2 rounded-lg shadow-sm min-w-[200px]"
          placeholder="Buscar por título o descripción..."
          value={busqueda}
          onChange={(e) => { setBusqueda(e.target.value); setPagina(1) }}
        />

        <select
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setPagina(1) }}
          className="border px-3 py-2 rounded-lg text-gray-500"
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
              <th className="p-3">Título</th>
              <th className="p-3">Descripción</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {tareasPagina.length > 0 ? (
              tareasPagina.map((t) => (
                <tr key={t.id} className="border-t text-gray-600 hover:bg-gray-50">
                  <td className="p-3">{t.titulo}</td>
                  <td className="p-3">{t.descripcion}</td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${
                        t.estado === "completada"
                          ? "bg-green-100 text-green-700"
                          : t.estado === "en progreso"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {t.estado}
                    </span>
                  </td>
                  <td className="p-3 flex flex-wrap gap-2">
                    <Link
                      href={`/tareas/${t.id}/editar`}
                      className="bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-xs sm:text-sm min-w-[80px] text-center"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(t.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-xs sm:text-sm min-w-[80px] text-center"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-gray-500 py-6">
                  No hay tareas registradas
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

      {toast && (
        <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
          {toast}
        </div>
      )}
    </div>
  )
}