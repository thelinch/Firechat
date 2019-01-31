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
  private listaIndice = new Array<indice>();
  constructor(private afs: AngularFirestore) { }

  getAllIndiceFindAreaId(idArea: string, listIndice: Array<indice>): Observable<indice[]> {

    return Observable.create(observable => {
      this.afs.collection<indice>("area").doc(idArea).collection("indice").snapshotChanges().pipe(map(actions => actions.map(documentoIndice => {
        const data = documentoIndice.payload.doc.data() as area_indice
        const id = documentoIndice.payload.doc.id
        return { id, ...data }
      }))).subscribe(listaIndices => {
        listaIndices.map(indice => {
          indice.indiceRef.get().then(indiceData => {
            let indice = (indiceData.data() as indice)
            indice.id = indiceData.id
            listIndice.push(indice)
          })
        })
        observable.next(this.listaIndice)
      })
    })
  }
  getAllarea(): Observable<area[]> {
    return this.afs.collection("area").snapshotChanges().pipe(map(actions => actions.map(documentArea => {
      const dataArea = documentArea.payload.doc.data() as area
      dataArea.id = documentArea.payload.doc.id
      return dataArea
    })))
  }
}
