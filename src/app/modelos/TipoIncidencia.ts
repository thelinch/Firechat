import { incidencias } from "./incidencias";

export interface tipoIncidencia {
    id?: string;
    tipo: string;
    estado:boolean
    color:string;
    incidencias?: incidencias[]
}
