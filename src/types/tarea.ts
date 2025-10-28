export interface Tarea {
    id: string
    titulo: string
    descripcion: string
    estado: "pendiente" | "en progreso" | "completada" 
}