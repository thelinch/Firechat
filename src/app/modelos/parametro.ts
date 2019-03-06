import { categoria } from "./categoria";
import { DocumentReference } from "angularfire2/firestore";

export interface parametro {
  id?: string
  nombre: string
  nombreCorto: string
  valor_maximo: number
  valor_minimo?: number
  unidadMedida: string
  descripcion: string
  resultado: number
  tipo: { nombre: string ,id:string}
  categoria: categoria
  estado: boolean
}
