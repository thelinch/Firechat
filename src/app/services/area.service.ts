import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { area } from '../modelos/area';
import { map } from 'rxjs/operators';
import { area_indice } from '../modelos/area_indice';
import { indice } from '../modelos/indice';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private actividadCollection: AngularFirestoreCollection<area>

  constructor(private afs: AngularFirestore) { }

  getAllIndiceFindAreaId(idArea: string): Observable<indice[]> {
    let listaIndice = new Array<indice>();
return Observable.create(observable => {
      this.afs.collection("area").doc(idArea).collection("indice").snapshotChanges().pipe(map(actions => actions.map(documentoIndice => {
        const data = documentoIndice.payload.doc.data() as area_indice
        const id = documentoIndice.payload.doc.id
        return { id, ...data }
      }))).subscribe(listaIndices => {
        listaIndices.map(indice => {
          indice.indiceRef.get().then(indiceData => {
            listaIndice.push((indiceData.data() as indice))
          })
        })
        observable.next(listaIndice)
      })
    })
  }
}
