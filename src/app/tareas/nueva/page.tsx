'use client'

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Tarea } from "@/types/tarea"
import { getTareas, saveTareas } from "@/lib/localStorage"
import FormCard from "@/components/ui/FormCard"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function NuevaTareaPage() {
    const router = useRouter()
    const [titulo, setTitulo] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [estado, setEstado] = useState("")
    const [errors, setErrors] = useState<{ [k: string]: string | null }>({})
    const [toast,setToast] = useState<string | null>(null)

    function validate() {
        const e: any = {}
        e.titulo = titulo.trim() ? null : "El título es requerido"
        e.descripcion = descripcion.trim() ? null : "La descripcion es requerida"
        e.estado = estado ? null : "Selecciona un estado"
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

        const nueva: Tarea = {
            id: Date.now().toString(),
            titulo: titulo.trim(),
            descripcion: descripcion.trim(),
            estado: estado as any,
        }

        const updated = [...getTareas(), nueva]
        saveTareas(updated)

        setToast("Tarea creada correctamente")
        setTimeout(() => {
            router.push("/tareas")
        }, 800)
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen"  style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
            <FormCard title="Nueva Tarea">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input 
                        label="Título"
                        value={titulo}
                        onChange={(e) => {
                            setTitulo(e.target.value)
                            setErrors((prev) => ({ ...prev, titulo: e.target.value ? null : "El título es requerido" }))
                        }}
                        placeholder="Ej: Llamar al cliente"
                    />
                    {errors.titulo && <p className="text-sm text-red-600">{errors.titulo}</p>}

                    <Input 
                        label="Descripción"
                        value={descripcion}
                        onChange={(e) => {
                            setDescripcion(e.target.value)
                            setErrors((prev) => ({ ...prev, descripcion: e.target.value ? null : "La descripción es requerida" }))
                        }}
                        placeholder="Detalles de la tarea"
                    />
                    {errors.descripcion && <p className="text-sm text-red-600">{errors.descripcion}</p>}

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Estado</label>
                        <select
                            value={estado}
                            onChange={(e) => {
                                setEstado(e.target.value)
                                setErrors((prev) => ({ ...prev, estado: e.target.value ? null : "Selecciona un estado"}))
                            }}
                            className={`w-full border px-3 py-2 rounded-lg text-gray-800 ${errors.estado ? "border-red-500" : "border-gray-300"}`}
                        >
                            <option value="">Seleccionar</option>
                            <option value="pendiente">Pendiente</option>
                            <option value="en progreso">En progreso</option>
                            <option value="completada">Completada</option>
                        </select>
                        {errors.estado && <p className="text-sm text-red-600">{errors.estado}</p>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={() => router.back()}>Cancelar</Button>
                        <Button type="submit">Guardar Tarea</Button>
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

