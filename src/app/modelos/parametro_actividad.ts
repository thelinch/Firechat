import { DocumentReference } from "angularfire2/firestore";

export interface parametro_actividad {
    id?: string
    actividadRef: DocumentReference
    estado: boolean
}