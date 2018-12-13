import { DocumentReference } from "angularfire2/firestore";

export interface indice_actividad {
    id?: string
    actividadRef: DocumentReference
    estado: boolean
}