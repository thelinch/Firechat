import { element } from 'protractor/built';
import { Injectable, EventEmitter } from '@angular/core';
import { parametro } from '../modelos/parametro';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentReference } from 'angularfire2/firestore';
import { actividades } from '../modelos/actividades';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { parametro_actividad } from '../modelos/parametro_actividad';
import { actividad_persona } from '../modelos/actividad_persona';
import { elementProperty } from '@angular/core/src/render3/instructions';
import { async } from 'rxjs/internal/scheduler/async';
import { Colecciones } from './../HelperClass/Colecciones';

@Injectable({
  providedIn: 'root'
})
export class ParametroService {
  private parametroCollection: AngularFirestoreCollection<parametro>
  DataParametro = new EventEmitter<any>()
  constructor(private afs: AngularFirestore) {
    this.parametroCollection = this.afs.collection<parametro>('parametro')
  }
  setArrayParametro(parametro: parametro[]) {
    this.DataParametro.emit({ parametros: parametro })
  }
  mappingParametroActividad(idParametro: string, actividad: actividades) {
    let referenciaActividad = this.afs.collection(Colecciones.actividades).doc(actividad.id).ref

    this.afs.collection("parametro").doc(idParametro).collection("actividad").add({ actividadRef: referenciaActividad, activo: true })
  }
  getAllParametroFindIdActividad(idActividad: string): Observable<parametro[]> {
    return this.afs.collection<parametro>(Colecciones.actividades).doc(idActividad).collection("parametro").snapshotChanges().pipe(map(actions => actions.map(documentoParametro => {
      const data = documentoParametro.payload.doc.data() as parametro
      data.id = documentoParametro.payload.doc.id
      return data
    })))
  }

  saveParametroFromIdActividadAndIdArea(idArea: string, actividad: actividades, parametro: parametro[]): Observable<boolean> {
    return Observable.create(observer => {
      parametro.map(parametro => {
        this.afs.collection("area").doc(idArea).collection("parametro").add(parametro)
        actividad.parametro = true
        this.afs.collection(Colecciones.actividades).doc(actividad.id).update(actividad).then(() => {
          this.afs.collection(Colecciones.actividades).doc(actividad.id).collection("parametro").add(parametro)

        })
      })
      observer.next(true)
    })
  }

  getAllActividadesFindParametros(idCategoria: string): actividades[] {
    let arrayActividad = new Array<actividades>();
    //parametros.forEach(elemento => {
    this.afs.collection<parametro>("parametro", ref => ref.where("categoria.id", "==", idCategoria))
      .snapshotChanges().
      pipe(map(actions => actions.map(docuementoParametro => {
        const id = docuementoParametro.payload.doc.id;
        const data = docuementoParametro.payload.doc.data() as parametro;
        return { id, ...data }
      }))).subscribe(listaParametros => {
        listaParametros.forEach(elemento => {
          this.afs.collection("parametro").doc(elemento.id).collection(Colecciones.actividades).snapshotChanges().pipe(map(actions => actions.map(documentoActvidadParametro => {
            const id = documentoActvidadParametro.payload.doc.id
            const data = documentoActvidadParametro.payload.doc.data() as parametro_actividad
            return { id, ...data }
          }))).subscribe(listaParametroActividad => {
            listaParametroActividad.map(parametroActividad => {
              parametroActividad.actividadRef.get().then(actividad => {
                arrayActividad.push(actividad.data() as actividades)
              })
            })
          })
          /*this.afs.doc(elemento.id).collection("actividad").snapshotChanges().pipe(map(actions => actions.map(documentoActividad => {
            const id = documentoActividad.payload.doc.id;
            const data = documentoActividad.payload.doc.data() as parametro_actividad;
            return { id, ...data }
          }))).pipe(map(listaParametroActividad => listaParametroActividad.map(parametroActividad => {
            parametroActividad.actividadRef.get().then(actividad => {
              arrayActividad.push((actividad.data() as actividades))
            })
          })))*/
        })
      })

    //  })
    console.log(arrayActividad)

    return arrayActividad;
  }
  getAllParametroFindIdArea(idArea: string): Observable<parametro[]> {
    return this.afs.collection<parametro>("area").doc(idArea).collection("parametro").snapshotChanges().pipe(map(actions => actions.map(documentoParametro => {
      const dataParametro = documentoParametro.payload.doc.data() as parametro
      dataParametro.id = documentoParametro.payload.doc.id
      return dataParametro;
    })))
  }
  getAllParametro(): Observable<parametro[]> {
    return this.afs.collection(Colecciones.parametro, ref => ref.where("estado", "==", true)).snapshotChanges().pipe(map(actions => actions.map(parametroData => {
      const parametro = parametroData.payload.doc.data() as parametro
      parametro.id = parametroData.payload.doc.id
      return parametro
    })))
  }
  saveParametro(parametro: parametro) {
    this.getCollectionParametro().add(parametro)
  }
  getCollectionParametro(): AngularFirestoreCollection<parametro> {
    return this.afs.collection<parametro>(Colecciones.parametro)
  }

  updateEstadoParametro(parametro: parametro) {
    this.afs.collection(Colecciones.parametro).doc(parametro.id).update({ estado: parametro.estado })
  }

  updateParametro(parametro: parametro): Observable<boolean> {
    return Observable.create(observer => {
      this.afs.collection(Colecciones.parametro).doc(parametro.id).update(parametro).then(() => {
        observer.next(true)

      })
    })

  }
}
