import { tipoIncidencia } from "./TipoIncidencia";
import { file } from "./File";
import { persona } from "./persona";
import * as firebase from "firebase/app";

export interface incidencias {
  id?: string
  tipoReferencia: string
  idTipoReferencia: string
  detalle: string
  fecha_realizacion?:firebase.firestore.Timestamp
  fecha_registro: firebase.firestore.Timestamp
  latitud: string
  longitud: string
  estado: boolean;
  persona?: persona
  urlListOfPhotos: file[]
  tipoIncidencia: tipoIncidencia
}
