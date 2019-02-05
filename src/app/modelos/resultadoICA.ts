import { DocumentReference } from 'angularfire2/firestore';
import { parametro } from './parametro';
import { actividades } from './actividades';
import { persona } from './persona';
export interface resultado {
  id?: string
  cumplio?: boolean
  fecha_registro?: Date
  parametroRef?: DocumentReference
  parametro: parametro
  resultado: number
  riesgo?: string
  valor?: number
  persona?: persona
  actividad?: actividades
  lat?: string
  lng?: string
}
