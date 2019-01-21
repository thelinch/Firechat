export interface actividadPMAO {
    id?: string
    nombre: string
    condicion: any
    impacto: any
    severidad: any
    frecuencia: any
    significancia: any
    clasificacion: string
    comentario: string
    valoracion?: { nombre: string, valor: number }

    isEjecuciones: boolean

}