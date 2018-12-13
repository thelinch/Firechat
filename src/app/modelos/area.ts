import { parametro } from "./parametro";

export interface area {
    id?: string
    area: string
    longitud: string
    latitud: string
    parametros?: parametro[]
}