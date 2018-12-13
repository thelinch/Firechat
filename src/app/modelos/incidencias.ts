import { tipoIncidencia } from "./TipoIncidencia";

export interface incidencias {
    id?: string
    detalle: string
    fecha_realizacion?: Date
    fecha_registro: Date
    latitud: string
    longitud: string
    tipoIncidencia: tipoIncidencia
}