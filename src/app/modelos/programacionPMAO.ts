import { resultadoPMAO } from "./resultadoPMAO";

export interface programacionPMAO {
  id: string
  mes: firebase.firestore.Timestamp,
  valor: number
  resultado: resultadoPMAO,

}
