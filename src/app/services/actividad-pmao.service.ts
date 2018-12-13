import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActividadPmaoService {
  s: AngularFirestoreCollection
  constructor(private afs: AngularFirestore) { }
  saveActividadPMAO(idIndice: string, actividad) {
    this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").add(actividad)
  }
  getAllActividadPMAO(idIndice: string): Observable<any[]> {
    return this.afs.collection("indice").doc(idIndice).collection("actividadPMAO").snapshotChanges().pipe(map(actions => actions.map(documentoActividad => {
      const data = documentoActividad.payload.doc.data()
      data.id = documentoActividad.payload.doc.id
      return data
    })))
  }
}
