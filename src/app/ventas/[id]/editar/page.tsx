'use client'

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Venta } from "@/types/ventas"
import { getVentas, saveVentas } from "@/lib/localStorage"
import FormCard from "@/components/ui/FormCard"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function EditarVentaPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [venta, setVenta] = useState<Venta | null>(null)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const data = getVentas()
    const found = data.find((v) => v.id === id)
    if (found) setVenta(found)
  }, [id])

  function validateField(name: string, value: any) {
    switch (name) {
      case "cliente":
        return value.trim() ? "" : "El cliente es obligatorio"
      case "monto":
        return value > 0 ? "" : "El monto debe ser mayor que 0"
      case "fecha":
        return value ? "" : "La fecha es obligatoria"
      case "estado":
        return value ? "" : "Seleccione un estado"
      default:
        return ""
    }
  }

  function handleChange(name: string, value: any) {
    if (!venta) return
    setVenta({ ...venta, [name]: value })
    setErrors({ ...errors, [name]: validateField(name, value) })
  }

  function validateAll() {
    if (!venta) return false
    const newErrors: any = {}
    Object.keys(venta).forEach((key) => {
      newErrors[key] = validateField(key, (venta as any)[key])
    })
    setErrors(newErrors)
    return !Object.values(newErrors).some((e) => e)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!venta) return
    if (!validateAll()) return

    const ventas = getVentas().map((v) => (v.id === venta.id ? venta : v))
    saveVentas(ventas)

    setToast("Venta actualizada correctamente")
    setTimeout(() => router.push("/ventas"), 1000)
  }

  if (!venta) {
    return (
      <div className="p-8 text-center text-gray-600">
        Cargando venta...
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen"  style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <FormCard title="Editar Venta">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Cliente"
            value={venta.cliente}
            onChange={(e) => handleChange("cliente", e.target.value)}
            className={errors.cliente ? "border-red-500" : ""}
          />
          {errors.cliente && <p className="text-red-600 text-sm">{errors.cliente}</p>}

          <Input
            label="Monto (S/)"
            type="number"
            value={venta.monto}
            onChange={(e) => handleChange("monto", parseFloat(e.target.value))}
            className={errors.monto ? "border-red-500" : ""}
          />
          {errors.monto && <p className="text-red-600 text-sm">{errors.monto}</p>}

          <Input
            label="Fecha"
            type="date"
            value={venta.fecha}
            onChange={(e) => handleChange("fecha", e.target.value)}
            className={errors.fecha ? "border-red-500" : ""}
          />
          {errors.fecha && <p className="text-red-600 text-sm">{errors.fecha}</p>}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Estado</label>
            <select
              value={venta.estado}
              onChange={(e) => handleChange("estado", e.target.value)}
              className={`w-full border border-gray-800 text-gray-800 px-3 py-2 rounded-lg ${
                errors.estado ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione un estado</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Completada">Completada</option>
              <option value="Cancelada">Cancelada</option>
            </select>
            {errors.estado && <p className="text-red-600 text-sm">{errors.estado}</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button type="submit">Actualizar Venta</Button>
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