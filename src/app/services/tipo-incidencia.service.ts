import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { tipoIncidencia } from '../modelos/TipoIncidencia';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TipoIncidenciaService {
  private TipoIncidenciaCollection: AngularFirestoreCollection<tipoIncidencia>
  constructor(private afs: AngularFirestore) {
    this.TipoIncidenciaCollection = this.afs.collection<tipoIncidencia>('tipoIncidencia')
  }

  getAllTipoIncidencia(): Observable<tipoIncidencia[]> {
    return this.getCollectionIncidencias()
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as tipoIncidencia;
        const id = a.payload.doc.id;
        return { id, ...data }
      })))
  }
  private getCollectionIncidencias(): AngularFirestoreCollection<tipoIncidencia> {
    return this.afs.collection<tipoIncidencia>("tipoIncidencia");
  }
}
