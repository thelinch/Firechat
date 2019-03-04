import { programacionPMAO } from "./programacionPMAO";
import { resultadoPMAO } from "./resultadoPMAO";
export class subActividadPMAO {
  id?: string
  actividad: string
  fecha_inicio: firebase.firestore.Timestamp;
  fecha_fin: firebase.firestore.Timestamp;
  periodo: number;
  tipoPeriodo: string
  unidad: string
  tipoTrabajo: { id: number, valor: string }
  total: number
  estadoActividad: boolean;
  programacion: programacionPMAO[]
  observaciones?: Array<{ mensaje: string, estado: boolean, isVisto: boolean, fecha_regitro: firebase.firestore.Timestamp, fecha_visto: firebase.firestore.Timestamp }>
}
