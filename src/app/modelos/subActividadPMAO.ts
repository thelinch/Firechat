export class subActividadPMAO {
  id?: string
  actividad: string
  fecha_inicio: Date;
  fecha_fin: Date;
  periodo: number;
  tipoPeriodo: string
  unidad: string
  total: number
  estadoActividad: boolean;
  observaciones?: Array<{ mensaje: string, estado: boolean, isVisto: boolean, fecha_regitro: firebase.firestore.Timestamp, fecha_visto: firebase.firestore.Timestamp }>
}
