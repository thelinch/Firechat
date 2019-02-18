import { incidencias } from "./incidencias";
import { componente } from "./componente";
import { resultado } from "./resultadoICA";
import { estado } from "./estado";
import { persona } from "./persona";
import * as firebase from "firebase/app";
export interface actividades {
  id?: string
  idIndice: string
  actividad: string
  fecha_inicio: firebase.firestore.Timestamp
  fecha_fin?: firebase.firestore.Timestamp
  componente: componente
  isParametro: boolean
  isResultado: boolean
  incidencias?: incidencias[]
  resultado?: resultado[]
  asignado: boolean;
  incidencia: boolean
  estadoObjeto: estado
  estado: boolean
  parametro: boolean
  persona: persona
  lng: string
  lat: string
}
