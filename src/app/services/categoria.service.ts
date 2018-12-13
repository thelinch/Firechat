import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { categoria } from '../modelos/categoria';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private categoriaColllection: AngularFirestoreCollection<categoria>

  constructor(private afs: AngularFirestore) {
    this.categoriaColllection = this.afs.collection<categoria>('categoria')
  }
  getAllCategoria(): Observable<categoria[]> {
    return this.afs.collection<categoria>("categoria").snapshotChanges().pipe(map(actions => actions.map(categoria => {
      const data = categoria.payload.doc.data() as categoria
      const id = categoria.payload.doc.id
      return { id, ...data }
    })))
  }

}
