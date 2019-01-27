import { tipoIncidencia } from "./TipoIncidencia";
import { file } from "./File";

export interface incidencias {
    id?: string
    detalle: string
    fecha_realizacion?: Date
    fecha_registro: Date
    latitud: string
    longitud: string
    urlListOfPhotos: file[]
    tipoIncidencia: tipoIncidencia
}