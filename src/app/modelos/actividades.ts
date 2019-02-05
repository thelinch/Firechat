import { incidencias } from "./incidencias";
import { componente } from "./componente";
import { resultado } from "./resultadoICA";
import { estado } from "./estado";
import { persona } from "./persona";

export interface actividades {
  id?: string
  actividad: string
  fecha_inicio: Date
  fecha_fin?: Date
  componente: componente
  isParametro: boolean
  isResultado: boolean
  incidencias?: incidencias[]
  resultado?: resultado[]
  asignado: boolean;
  incidencia: boolean
  estado: estado
  parametro: boolean
  persona: persona
  lng: string
  lat: string
}
