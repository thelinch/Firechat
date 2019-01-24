import { copyStyles } from '@angular/animations/browser/src/util';
import { Injectable, Component } from '@angular/core';
import { actividades } from '../modelos/actividades';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, DocumentChangeAction, DocumentReference } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { incidencias } from '../modelos/incidencias';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { indice_actividad } from '../modelos/indice_actividad';
import * as momento from 'moment'
import { estadoActividad } from '../modelos/estado_actividad';
import { estado } from '../modelos/estado';
import { IndiceService } from './indice.service';
import { resultado } from '../modelos/resultado';
import { ParametroService } from './parametro.service';
import { parametro } from '../modelos/parametro';
import { indice } from '../modelos/indice';
@Injectable({
  providedIn: 'root'
})
export class ActividadService {
  private actividadCollection: AngularFirestoreCollection<actividades>
  private extendedItems = new Array<any>()
  constructor(private afs: AngularFirestore, private indiceService: IndiceService, private parametroService: ParametroService) {

  }
  stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
  }
  update(actividad: actividades) {
    this.afs.collection("actividades").doc(actividad.id).update(actividad)
  }
  getAllIncidenciaFindIdActividad(idAvctividad: string): Observable<incidencias[]> {
    return this.getCollectionActividades().doc(idAvctividad).collection<incidencias>("incidencias").snapshotChanges().
      pipe(map(actions => actions.map(documentoListaIncidencia => {
        const id = documentoListaIncidencia.payload.doc.id
        const data = documentoListaIncidencia.payload.doc.data() as incidencias
        return { id, ...data }
      })))
  }
  getCollectionActividades(): AngularFirestoreCollection<actividades> {
    return this.afs.collection<actividades>("actividad")
  }
  saveActividad(idIndice: string, actividad: actividades): Observable<boolean> {
    actividad.incidencia = false
    actividad.fecha_inicio = this.stringToDate(actividad.fecha_inicio, "yyyy-mm-dd", "-")
    if (actividad.fecha_fin) {
      actividad.fecha_fin = this.stringToDate(actividad.fecha_fin, "yyyy-mm-dd", "-")
    }
    return Observable.create(observer => {
      let actividadCread: actividades;
      this.afs.collection<actividades>("actividad").add(actividad).then(actividadCreada => {
        actividadCreada.get().then(datos => {
          actividadCread = datos.data() as actividades
          actividadCread.id = datos.id
        })
        this.afs.collection("indice").doc(idIndice).collection("actividad").add({ actividadRef: this.afs.doc(actividadCreada.path).ref, estado: true })
        observer.next(true)
      })

    })

  }
  getUltimoEstadoIdActividad(idActividad: string) {
    this.getCollectionActividades().doc(idActividad).collection("estado")

  }
  getResultadoICA(idArea: string, fecha_inicio, fecha_fin, listaIndice: indice[]): Observable<number> {
    console.log(listaIndice)
    let listaResultadoNew = new Array<resultado>()
    let listaParametrosNew = new Array<parametro>();
    let listaIndiceNew = new Array<indice>()
    let listaActividadNew = new Array<actividades>()
    fecha_inicio = this.stringToDate(fecha_inicio, "yyyy-mm-dd", "-")
    fecha_fin = this.stringToDate(fecha_fin, "yyyy-mm-dd", "-")
    this.parametroService.getAllParametroFindIdArea(idArea).subscribe(listaParametros => {
      listaParametros.forEach(p => listaParametrosNew.push(p))
    })
    listaIndice.forEach(indice => {
      console.log(indice)
      this.getAllActividadFindIdIndice(indice.id).subscribe(listaActividades => {
        console.log(listaActividades)
      })
    })
    return this.calculoIca(listaResultadoNew, listaParametrosNew)
  }
  private calculoIca(listaResultado: resultado[], listaParametro: parametro[]): Observable<number> {

    let suma: number = 0;
    let numeroIncumplido: number = 0
    let resultado: number
    return Observable.create(observer => {
      listaResultado.forEach(resultado => {
        if (!resultado.cumplio) {
          numeroIncumplido++;
        }
        suma = suma + resultado.valor
      })
      resultado = suma / (listaResultado.length - numeroIncumplido)
      observer.next(resultado)
    })

  }
  getAllRespuestaFindIdActividad(idActividad: string, fecha_fin: Date, fecha_inicio: Date): Observable<resultado[]> {
    return this.afs.collection<resultado>("actividad").doc(idActividad).collection("resultado", ref => ref.where("fecha_registro", ">", fecha_inicio).where("fecha_registro", "<", fecha_fin)).snapshotChanges().pipe(map(actions => actions.map(documentoResultados => {
      const dataResultado = documentoResultados.payload.doc.data() as resultado
      dataResultado.id = documentoResultados.payload.doc.id
      return dataResultado
    })))
  }
  updateAtividad(activida: actividades) {
    this.afs.collection("actividad").doc(activida.id).update(activida)
  }
  getAllActividadFindIdIndice(idIndice: string): Observable<actividades[]> {
    let listaActividades = new Array<actividades>()
    return Observable.create(observer => {
      this.afs.collection("indice").doc(idIndice).collection("actividad", ref => ref.where("estado", "==", true)).snapshotChanges().pipe(map(actions => actions.map(documentoActividadIndice => {
        const id = documentoActividadIndice.payload.doc.id
        const data = documentoActividadIndice.payload.doc.data() as indice_actividad
        return { id, ...data }
      }))).subscribe(listaIndiceActividad => {
        listaActividades.splice(0, listaActividades.length)
        listaIndiceActividad.map(indiceActividad => {
          indiceActividad.actividadRef.get().then(documentoActividad => {
            const id = documentoActividad.id;
            const data = documentoActividad.data() as actividades
            if (data.fecha_fin) {
              data.fecha_fin = new Date(data.fecha_fin["seconds"] * 1000)
            }
            data.fecha_inicio = new Date(data.fecha_inicio["seconds"] * 1000)
            listaActividades.push({ id, ...data })
          })
        })
        observer.next(listaActividades)
      })
    })
  }
  getActividades(): Observable<actividades[]> {
    return this.afs
      .collection<actividades>('actividades')
      .snapshotChanges().pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as actividades;
        const id = a.payload.doc.id;
        return { id, ...data }
      })))
  }






}
