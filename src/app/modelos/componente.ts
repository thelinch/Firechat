import { actividades } from "./actividades";

export interface componente {
    id?: string
    nombre: string
    descripcion: string
    estado: boolean
    actividades: actividades[]
}