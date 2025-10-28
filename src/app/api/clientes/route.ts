import { NextResponse } from "next/server"
import { getClientes, saveClientes } from "@/lib/localStorage"
import { Cliente } from "@/types/cliente"

export async function GET() {
  return NextResponse.json(getClientes())
}

export async function POST(req: Request) {
  const body: Cliente = await req.json()
  const clientes = getClientes()
  clientes.push(body)
  saveClientes(clientes)
  return NextResponse.json(body, { status: 201 })
}

export async function PUT(req: Request) {
  const body: Cliente = await req.json()
  let clientes = getClientes()
  clientes = clientes.map(c => (c.id === body.id ? body : c))
  saveClientes(clientes)
  return NextResponse.json(body)
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const clientes = getClientes().filter(c => c.id !== id)
  saveClientes(clientes)
  return NextResponse.json({ ok: true })
}
