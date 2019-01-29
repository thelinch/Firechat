import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore, DocumentReference } from 'angularfire2/firestore';
import { indice } from '../modelos/indice';
import { map } from 'rxjs/operators';
import { area_indice } from '../modelos/area_indice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndiceService {
  private actividadCollection: AngularFirestoreCollection<indice>
  constructor(private afs: AngularFirestore) { }
  mappingActividadIndiceFindId(idActividad: string, idIndice: string) {
    this.afs.collection("actividad").doc(idActividad).ref
    this.afs.collection("indice").doc(idIndice).collection("actividad").add({ actividadRef: this.afs.collection("actividad").doc(idActividad).ref, estado: true })
  }
  saveIndice(indice: indice): Promise<DocumentReference> {
    return this.afs.collection("indice").add(indice)
  }

  getallIndiceFindIdArea(idArea: string): Observable<Array<indice>> {

    let listaIndice = new Array<indice>();
    return Observable.create(observer => {
      this.afs.collection("area").doc(idArea).collection("indice").snapshotChanges().pipe(map(actions => actions.map(documentoIndiceArea => {
        const id = documentoIndiceArea.payload.doc.id;
        const data = documentoIndiceArea.payload.doc.data() as area_indice
        return { id, ...data }
      }))).subscribe(listaAreaIndice => {
        listaIndice = new Array<indice>();
        listaAreaIndice.map(areaIndice => {
          areaIndice.indiceRef.get().then(indice => {
            const data = indice.data() as indice;
            const id = indice.id;
            listaIndice.push({ id, ...data })
          })
        })
        observer.next(listaIndice)
      })
    })

  }
}
