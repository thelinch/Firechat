import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { incidencias } from '../modelos/incidencias';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { actividades } from '../modelos/actividades';
import { Colecciones } from '../HelperClass/Colecciones';
import * as firebase from "firebase/app";

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {


  constructor(private afs: AngularFirestore) {

  }
  setIncidenciaFindIdActividad(actividad: actividades, incidencias: incidencias): Promise<DocumentReference> {
    this.afs.collection(Colecciones.actividades).doc(actividad.id).update(actividad)
    return this.afs.collection(Colecciones.incidencias).add(incidencias);
  }
  setIncidenciaFindIA(idIa: string, incidencias: incidencias) {

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
  getAllIncidenciasFindDate(fecha) {
    return this.afs.collection(Colecciones.incidencias, ref => ref.orderBy("fecha_registro").startAt(firebase.firestore.Timestamp.fromDate(new Date(fecha))).where("estado", "==", true)).snapshotChanges().pipe(map(listIncidenciasDoc => listIncidenciasDoc.map(incidenciaDoc => {
      const incidencia = incidenciaDoc.payload.doc.data() as incidencias;
      incidencia.id = incidenciaDoc.payload.doc.id
      return incidencia;
    })))
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
  getAllIncidenciafindIdtipoReferencia(idObjeto: string): Observable<incidencias[]> {
    return this.afs.collection(Colecciones.incidencias, ref => ref.where("idTipoReferencia", "==", idObjeto).where("estado", "==", true)).snapshotChanges().pipe(map(actions => actions.map(a => {
      const incidencia = a.payload.doc.data() as incidencias;
      incidencia.id = a.payload.doc.id
      return incidencia
    })));
  }

}
