import { Cliente } from "@/types/cliente"
import { Venta } from '@/types/venta'
import { Tarea } from "@/types/tarea"

const CLIENTES_KEY = "clientes"
const VENTAS_KEY = "ventas"
const TAREAS_KEY = "tareas"

export function getClientes(): Cliente[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(CLIENTES_KEY)
    return data ? JSON.parse(data) : []
}

export function saveClientes(clientes: Cliente[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(CLIENTES_KEY, JSON.stringify(clientes))
}

export function getVentas(): Venta[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(VENTAS_KEY)
    return data ? JSON.parse(data) : []
}

export function saveVentas(ventas: Venta[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(VENTAS_KEY, JSON.stringify(ventas))
}

export function getTareas(): Tarea[] {
    if (typeof window === "undefined") return []
    const data = localStorage.getItem(TAREAS_KEY)
    return data ? JSON.parse(data) : []
}

export function saveTareas(tareas: Tarea[]) {
    if (typeof window === "undefined") return
    localStorage.setItem(TAREAS_KEY, JSON.stringify(tareas))
}
