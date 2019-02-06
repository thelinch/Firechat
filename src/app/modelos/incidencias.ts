import { tipoIncidencia } from "./TipoIncidencia";
import { file } from "./File";
import { persona } from "./persona";

export interface incidencias {
  id?: string
  tipoReferencia: string
  idTipoReferencia: string
  detalle: string
  fecha_realizacion?: Date
  fecha_registro: Date
  latitud: string
  longitud: string
  persona?: persona
  urlListOfPhotos: file[]
  tipoIncidencia: tipoIncidencia
}
