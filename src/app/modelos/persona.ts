import { area } from "./area";
import { actividad_persona } from "./actividad_persona";
import { DocumentReference } from "angularfire2/firestore";
import { tipoPersona } from "./tipoPersona";
import { gerencia } from "./gerencia";

export interface persona {
    id?: string
    nombre: string
    apellidos: string
    area: area
    UserName: string
    password: string
    tipoPersona: tipoPersona
    gerencia: gerencia
    actividad_persona: actividad_persona[]
} 