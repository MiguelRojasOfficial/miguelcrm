export interface Venta {
    id: string
    cliente: string
    monto: number 
    fecha: string 
    estado: 'Pendiente' | 'Completada' | 'Cancelada'
}