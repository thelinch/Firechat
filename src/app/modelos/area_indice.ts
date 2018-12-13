import { DocumentReference } from "angularfire2/firestore";

export interface area_indice {
    id?: string
    indiceRef: DocumentReference
    estado: boolean
}