import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { componente } from '../modelos/componente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { categoria } from '../modelos/categoria';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService {
  private componenteCollection: AngularFirestoreCollection<componente>
  constructor(private afs: AngularFirestore) {
    this.componenteCollection = this.afs.collection<componente>('componente')
  }
  getAllComponente(): Observable<componente[]> {
    return this.afs.collection<componente>("componente").snapshotChanges().pipe(map(actions => actions.map(categoria => {
      const data = categoria.payload.doc.data() as componente;
      const id = categoria.payload.doc.id;
      return { id, ...data }
    })));
  }
}
