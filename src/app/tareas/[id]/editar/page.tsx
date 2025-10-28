'use client'

import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Tarea } from "@/types/tarea"
import { getTareas, saveTareas } from "@/lib/localStorage"
import FormCard from "@/components/ui/FormCard"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function EditarTareaPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [tarea, setTarea] = useState<Tarea | null>(null)
  const [errors, setErrors] = useState<{ [k: string]: string | null }>({})
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const data = getTareas().find((t) => t.id === id)
    if (data) setTarea(data)
  }, [id])

  if (!tarea) return <p className="p-8 text-gray-500">Cargando...</p>

  function validate() {
    const e: any = {}
    e.titulo = tarea.titulo.trim() ? null : "El título es requerido"
    e.descripcion = tarea.descripcion.trim() ? null : "La descripción es requerida"
    e.estado = tarea.estado ? null : "Selecciona un estado"
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) {
      setToast("Corrige los errores del formulario")
      setTimeout(() => setToast(null), 2000)
      return
    }

    const todas = getTareas()
    const actualizadas = todas.map((t) => (t.id === tarea.id ? tarea : t))
    saveTareas(actualizadas)
    setToast("Tarea actualizada correctamente")
    setTimeout(() => router.push("/tareas"), 800)
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen"  style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <FormCard title="Editar Tarea">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título"
            value={tarea.titulo}
            onChange={(e) => setTarea({ ...tarea, titulo: e.target.value })}
          />
          <Input
            label="Descripción"
            value={tarea.descripcion}
            onChange={(e) => setTarea({ ...tarea, descripcion: e.target.value })}
          />
          <div>
            <label className="block text-gray-700 font-medium mb-1">Estado</label>
            <select
              value={tarea.estado}
              onChange={(e) => setTarea({ ...tarea, estado: e.target.value as any })}
              className="w-full border px-3 py-2 rounded-lg text-gray-800"
            >
              <option value="pendiente">Pendiente</option>
              <option value="en progreso">En progreso</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={() => router.back()}>Cancelar</Button>
            <Button type="submit">Actualizar Tarea</Button>
          </div>
        </form>

        {toast && (
          <div className="fixed bottom-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow">
            {toast}
          </div>
        )}
      </FormCard>
    </div>
  )
}
