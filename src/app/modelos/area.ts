import { parametro } from "./parametro";
import { LatLng, LatLngLiteral } from "@agm/core";

export interface area {
    id?: string
    color: string
    area: string
    paths: Array<any>
    parametros?: parametro[]
}