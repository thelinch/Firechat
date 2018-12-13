import { DocumentReference } from 'angularfire2/firestore';
import { resultado } from './resultado';
import { parametro } from './parametro';
export interface resultado {
    id?: string
    cumplio?: boolean
    fecha_registro?: Date
    parametroRef?: DocumentReference
    parametro: parametro
    resultado: number
    riesgo?: string
    valor?: number

}