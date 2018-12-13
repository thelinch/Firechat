import { actividades } from "./actividades";
import { persona } from "./persona";
import { DocumentReference } from "angularfire2/firestore";

export interface actividad_persona {
    id?: string
    actividadRef:DocumentReference
    estado:boolean
    
}