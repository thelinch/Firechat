import { incidencias } from "./incidencias";
import { componente } from "./componente";
import { resultado } from "./resultado";
import { estado } from "./estado";

export interface actividades {
    id?: string
    actividad: string
    fecha_inicio: Date
    fecha_fin?: Date
    componente: componente
    isResulto:boolean
    incidencias?: incidencias[]
    resultado?: resultado[]
    asignado: boolean;
    incidencia: boolean
    estado: estado
    parametro:boolean
}