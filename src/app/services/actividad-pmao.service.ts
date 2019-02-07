import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Colecciones } from '../HelperClass/Colecciones';
import { actividadPMAO } from '../modelos/actividadPMAO';
import { executionActivityPMAO } from '../modelos/executionActivityPMAO';

@Injectable({
  providedIn: 'root'
})
export class ActividadPmaoService {
  collectionActvidadPMAO: AngularFirestoreCollection<actividadPMAO>
  constructor(private afs: AngularFirestore) {
  }

  saveActividadPMAO(idIndice: string, actividad: actividadPMAO): Observable<boolean> {
    return Observable.create(obsever => {
      actividad.personaRegistro=JSON.parse(sessionStorage.getItem("personaLoged"))
      this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").add(actividad)
      obsever.next(true)
    })
  }
  saveActividadEjecucionPMAOFindIdActividad(actividad: actividadPMAO, idIndice: string, execution: executionActivityPMAO): Observable<boolean> {
    return Observable.create(observer => {
      this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").doc(actividad.id).collection(Colecciones.ejecuciones).add(execution).then(respuest => {
        this.updateActividadPMAO(actividad, idIndice)
        observer.next(true)

      })

    })
  }
  getAllActividadPMAO(idIndice: string): Observable<actividadPMAO[]> {
    return this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").snapshotChanges().pipe(map(actions => actions.map(documentoActividad => {
      const data = documentoActividad.payload.doc.data() as actividadPMAO
      data.id = documentoActividad.payload.doc.id
      return data
    })))
  }
  getAllEjecutionsFindIdActividad(idIndice: string, idActivity: string): Observable<executionActivityPMAO[]> {
    return this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").doc(idActivity).collection(Colecciones.ejecuciones).snapshotChanges().pipe(map(actions => actions.map(documentoActividad => {
      const data = documentoActividad.payload.doc.data() as executionActivityPMAO
      data.id = documentoActividad.payload.doc.id
      return data
    })))
  }

  getAllActividadFromName(idIndice: string, nombre: string): Observable<actividadPMAO[]> {
    return this.afs.collection("indice").doc(idIndice).collection("actividadPMAO", f => f.where("nombre", "==", nombre)).snapshotChanges().pipe(map(actions => actions.map(documentoActividad => {
      const data = documentoActividad.payload.doc.data() as actividadPMAO
      data.id = documentoActividad.payload.doc.id
      return data;
    })))
  }
  updateActividadPMAO(actividad: actividadPMAO, idIndice: string) {
    this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").doc(actividad.id).update(actividad)
  }
  setValoracionFindIdActividad(idIndice: string, actividad: actividadPMAO): Observable<boolean> {
    return Observable.create(observer => {
      this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").doc(actividad.id).update({ valoracion: actividad.valoracion })
      observer.next(true)
    })
  }
}
