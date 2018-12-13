import { DocumentReference } from "angularfire2/firestore";

export interface estadoActividad {
    id?: string
    estadoRef: DocumentReference
    activo: boolean



}