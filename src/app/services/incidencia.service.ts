import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { incidencias } from '../modelos/incidencias';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { actividades } from '../modelos/actividades';
import { area_indice } from '../modelos/area_indice';
import { indice } from '../modelos/indice';
import { indice_actividad } from '../modelos/indice_actividad';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  latitud: string;
  logitud: string

  constructor(private afs: AngularFirestore) {
    navigator.geolocation.getCurrentPosition(position => {
      this.latitud = position.coords.latitude.toString()
      this.logitud = position.coords.longitude.toString()
    })
  }
  setIncidenciaFindIdActividad(actividad: actividades, incidencias: incidencias): Promise<DocumentReference> {
    actividad.incidencia = true

    this.afs.collection("actividad").doc(actividad.id).update(actividad)
    incidencias.latitud = this.latitud;
    incidencias.longitud = this.logitud
    console.log(incidencias)
    return this.afs.collection<incidencias>("actividad").doc(actividad.id).collection("incidencias").add(incidencias);
  }
  getAllIncidenciaFinIdArea(idArea: string) {
    console.log(idArea + "area ID")
    this.afs.collection("area").doc(idArea).collection("indice").snapshotChanges().pipe(map(actions => actions.map(documentoIndiceArea => {
      const dataAreaIndice = documentoIndiceArea.payload.doc.data() as area_indice
      dataAreaIndice.id = documentoIndiceArea.payload.doc.id
      return dataAreaIndice
    }))).pipe(map(listaAreaIndice => listaAreaIndice.map(areaIndice => {

    })))
  }
  getAllIncidencia(): Observable<incidencias[]> {
    let listaIncidencia = new Array<incidencias>()
    return Observable.create(observer => {
      this.afs.collection("actividad").snapshotChanges().pipe(map(actions => actions.map(c => {
        const dataActividad = c.payload.doc.data() as actividades
        dataActividad.id = c.payload.doc.id
        return dataActividad;
      }))).subscribe(listaActividades => listaActividades.map(actividad => {
        this.afs.collection("actividad").doc(actividad.id).collection("incidencias").valueChanges().subscribe(listaIncidencias => {
          if (listaIncidencias.length > 0) {
            listaIncidencias.forEach(e => {
              listaIncidencia.push(e as incidencias)

            })
          }
        })
      }))
      observer.next(listaIncidencia)
    })


  }
  update(idActividad: string, incidencia: incidencias) {
    this.afs.collection("actividades").doc(idActividad).collection("incidencias").doc(incidencia.id).update(incidencia)
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
