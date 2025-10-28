'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"
import FormCard from "@/components/ui/FormCard"

export default function NuevoClientePage() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [empresa, setEmpresa] = useState('')
  const router = useRouter()

  const guardarCliente = (e: React.FormEvent) => {
    e.preventDefault()
    const clientes = JSON.parse(localStorage.getItem('clientes') || '[]')
    const nuevo = { id: Date.now(), nombre, email, telefono, empresa }
    clientes.push(nuevo)
    localStorage.setItem('clientes', JSON.stringify(clientes))
    router.push('/clientes')
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <FormCard title="Nuevo Cliente">
        <form onSubmit={guardarCliente} className="space-y-5">
          <Input
            label="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
          <Input
            label="Empresa"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            required
          />
        <Button type="submit">Guardar Cliente</Button>
      </form>
    </FormCard>
    </div>
  )
}