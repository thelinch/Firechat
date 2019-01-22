import { file } from "./File";

export interface executionActivityPMAO {
    id?: string
    executionComentary: string
    denomination: string
    unity: string
    current: string
    total: string
    calculation: number
    registrationDate: Date
    UrlListOfPhotos: file[]
}