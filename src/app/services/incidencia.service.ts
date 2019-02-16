import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { incidencias } from '../modelos/incidencias';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { actividades } from '../modelos/actividades';
import { area_indice } from '../modelos/area_indice';
import { indice } from '../modelos/indice';
import { indice_actividad } from '../modelos/indice_actividad';
import { Colecciones } from '../HelperClass/Colecciones';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {


  constructor(private afs: AngularFirestore) {

  }
  setIncidenciaFindIdActividad(actividad: actividades, incidencias: incidencias): Promise<DocumentReference> {
    actividad.incidencia = true
    this.afs.collection("actividad").doc(actividad.id).update(actividad)
    incidencias.idTipoReferencia = actividad.id
    incidencias.tipoReferencia = "actividad"
    incidencias.persona = JSON.parse(sessionStorage.getItem("personaLoged"))
    incidencias.latitud = sessionStorage.getItem("latitud");
    incidencias.longitud = sessionStorage.getItem("longitud");
    return this.afs.collection(Colecciones.incidencias).add(incidencias);
  }
  setIncidenciaFindIA(idIa: string, incidencias: incidencias) {
    incidencias.latitud = sessionStorage.getItem("latitud");
    incidencias.persona = JSON.parse(sessionStorage.getItem("personaLoged"))
    incidencias.idTipoReferencia = idIa;
    incidencias.tipoReferencia = "indice";;
    incidencias.longitud = sessionStorage.getItem("longitud");
    incidencias.fecha_realizacion = new Date()
    incidencias.fecha_registro = new Date();
    return this.afs.collection(Colecciones.incidencias).add(incidencias);
  }


  getAllIncidencias(): Observable<incidencias[]> {
    return this.afs.collection(Colecciones.incidencias, ref => ref.where("estado", "==", true)).snapshotChanges().pipe(map(listIncidenciasDoc => listIncidenciasDoc.map(incidenciaDoc => {
      const incidencia = incidenciaDoc.payload.doc.data() as incidencias;
      incidencia.id = incidenciaDoc.payload.doc.id
      return incidencia;
    })))
  }
  updateEstadoIncidencia(incidencia: incidencias) {
    this.afs.collection(Colecciones.incidencias).doc(incidencia.id).update({ estado: incidencia.estado })
  }
  updateIncidencia(incidencia: incidencias): Observable<boolean> {
    return Observable.create(observer => {
      this.afs.collection(Colecciones.incidencias).doc(incidencia.id).update(incidencia).then(() => {
        observer.next(true)
      })
    })
  }
  updateFotoIncidencia(incidencia: incidencias) {
    this.afs.collection(Colecciones.incidencias).doc(incidencia.id).update({ urlListOfPhotos: incidencia.urlListOfPhotos })
  }
  getAllIncidenciafindIdtipoReferencia(idIndice: string): Observable<incidencias[]> {
    return this.afs.collection(Colecciones.incidencias, ref => ref.where("idTipoReferencia", "==", idIndice).where("estado", "==", true)).snapshotChanges().pipe(map(actions => actions.map(a => {
      const incidencia = a.payload.doc.data() as incidencias;
      incidencia.id = a.payload.doc.id
      return incidencia
    })));
  }
  getIncidenciaFindIdActividad(idActividad: string): Observable<incidencias[]> {
    return this.afs.collection<incidencias>("actividad").doc(idActividad).collection("incidencias")
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as incidencias;
        const id = a.payload.doc.id;
        return { id, ...data }
      })))
  }
}
