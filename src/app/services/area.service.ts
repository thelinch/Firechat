import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { area } from '../modelos/area';
import { map } from 'rxjs/operators';
import { area_indice } from '../modelos/area_indice';
import { indice } from '../modelos/indice';
import { Observable, observable } from 'rxjs';
import { DocumentReference } from '@firebase/firestore-types';
@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private actividadCollection: AngularFirestoreCollection<area>
  private listaIndice = new Array<indice>();
  constructor(private afs: AngularFirestore) { }

  getAllIndiceFindAreaId(idArea: string): Observable<DocumentReference[]> {
    return this.afs.collection<indice>("area").doc(idArea).collection("indice").snapshotChanges().pipe(map(actions => actions.map(documentoIndice => {
      const ref: DocumentReference = (documentoIndice.payload.doc.data() as area_indice).indiceRef
      return ref
    })));
  }
  getAllarea(): Observable<area[]> {
    return this.afs.collection("area").snapshotChanges().pipe(map(actions => actions.map(documentArea => {
      const dataArea = documentArea.payload.doc.data() as area
      dataArea.id = documentArea.payload.doc.id
      return dataArea
    })))
  }
}
