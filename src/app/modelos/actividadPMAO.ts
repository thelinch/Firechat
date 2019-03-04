import { subActividadPMAO } from "./subActividadPMAO";
import { persona } from "./persona";

export interface actividadPMAO {
  id?: string
  nombre: string
  condicion: any
  impacto: any
  severidad: any
  frecuencia: any
  significancia: any
  comentario: string,
  clasificacion: string
  valoracion?: { nombre: string, valor: number }
  isEjecuciones: boolean
  estadoActividad: boolean;
  personaRegistro: persona
  estadoLectura: boolean;
  personaRegistroMensaje: persona;
  subActividades: subActividadPMAO[]
  porcentageOfImplementation: number

}
