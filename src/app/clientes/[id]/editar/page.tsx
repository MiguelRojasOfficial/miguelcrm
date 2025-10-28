'use client'

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import FormCard from "@/components/ui/FormCard"

export default function EditarClientePage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [empresa, setEmpresa] = useState('')
  const router = useRouter()
  const params = useParams()

  useEffect(() => {
    const data = localStorage.getItem('clientes')
    if (data) {
      const clientes = JSON.parse(data)
      const cliente = clientes.find((c: any) => c.id === Number(params?.id))
      if (cliente) {
        setNombre(cliente.nombre)
        setEmail(cliente.email)
        setTelefono(cliente.telefono)
        setEmpresa(cliente.empresa)
      }
    }
  }, [params?.id])

  const actualizarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
    const index = clientes.findIndex((c: any) => c.id === Number(params?.id))
    if (index !== -1) {
      clientes[index] = { id: Number(params?.id), nombre, email, telefono, empresa }
      localStorage.setItem('clientes', JSON.stringify(clientes))
    }
    router.push('/clientes')
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen"  style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <FormCard title="Editar Cliente">
        <form onSubmit={actualizarCliente} className="space-y-5">
          <Input
            label="Nombre"
            placeholder="Escribe el nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="text-blue-700 placeholder-blue-400"
          />
          <Input
            label="Correo"
            type="email"
            placeholder="ejemplo@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="text-green-700 placeholder-green-400"
          />
          <Input
            label="Teléfono"
            placeholder="999-999-999"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="text-purple-700 placeholder-purple-400"
          />
          <Input
            label="Empresa"
            placeholder="Nombre de la empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
            className="text-purple-700 placeholder-purple-400"
          />
          <Button type="submit">Actualizar Cliente</Button>
        </form>
      </FormCard>
    </div>
  )
}
