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
import { resultado } from '../modelos/resultadoICA';
import { ParametroService } from './parametro.service';
import { parametro } from '../modelos/parametro';
import { indice } from '../modelos/indice';
import * as firebase from "firebase/app";
import { Colecciones } from './../HelperClass/Colecciones';
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
  getAllIncidenciaFindIdActividad(idAvctividad: string, idIndice: string): Observable<incidencias[]> {
    return this.getCollectionActividades(idIndice).doc(idAvctividad).collection<incidencias>("incidencias").snapshotChanges().
      pipe(map(actions => actions.map(documentoListaIncidencia => {
        const id = documentoListaIncidencia.payload.doc.id
        const data = documentoListaIncidencia.payload.doc.data() as incidencias
        return { id, ...data }
      })))
  }
  getCollectionActividades(idIndice: string): AngularFirestoreCollection<actividades> {
    return this.afs.collection<actividades>(Colecciones.actividades, ref => ref.where("idIndice", "==", idIndice))
  }
  saveActividad(actividad: actividades): Observable<boolean> {
    return Observable.create(observer => {
      this.afs.collection(Colecciones.actividades).add(actividad).then(() => {
        observer.next(true)
      })

    })

  }
  getUltimoEstadoIdActividad(idActividad: string, idIndice: string) {
    this.getCollectionActividades(idIndice).doc(idActividad).collection("estado")

  }
  getResultadoICA(idArea: string, fecha_inicio, fecha_fin, listaIndice: indice[]): Observable<number> {
    console.log(listaIndice)
    let listaResultadoNew = new Array<resultado>()
    let listaParametrosNew = new Array<parametro>();
    fecha_inicio = this.stringToDate(fecha_inicio, "yyyy-mm-dd", "-")
    fecha_fin = this.stringToDate(fecha_fin, "yyyy-mm-dd", "-")
    this.parametroService.getAllParametroFindIdArea(idArea).subscribe(listaParametros => {
      listaParametros.forEach(p => listaParametrosNew.push(p))
    })
    listaIndice.forEach(indice => {
      this.getAllActividadFindIdIndice(indice.id, fecha_inicio, fecha_fin).subscribe(listaActividades => {
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
    return this.afs.collection<resultado>(Colecciones.actividades).doc(idActividad).collection("resultado", ref => ref.where("fecha_registro", ">", fecha_inicio).where("fecha_registro", "<", fecha_fin)).snapshotChanges().pipe(map(actions => actions.map(documentoResultados => {
      const dataResultado = documentoResultados.payload.doc.data() as resultado
      dataResultado.id = documentoResultados.payload.doc.id
      return dataResultado
    })))
  }
  updateAtividad(activida: actividades) {
    this.afs.collection(Colecciones.actividades).doc(activida.id).update(activida)
  }

  deleteActividad(actividad: actividades) {
    this.afs.collection(Colecciones.actividades).doc(actividad.id).update({ estado: false })
  }
  getAllActividadFindIdIndice(idIndice: string, fecha_inicio, fecha_fin): Observable<actividades[]> {

    console.log(firebase.firestore.Timestamp.fromDate(new Date()))
    return this.afs.collection<actividades>(Colecciones.actividades, ref => ref.orderBy("fecha_inicio").startAt(firebase.firestore.Timestamp.fromDate(new Date(fecha_inicio))).endAt(firebase.firestore.Timestamp.fromDate(new Date(fecha_fin))).where("estado", "==", true).where("idIndice", "==", idIndice)).snapshotChanges().pipe(map(actions => actions.map(documentoActividad => {
      const actividad = documentoActividad.payload.doc.data() as actividades
      /* if (actividad.fecha_fin) {
         actividad.fecha_fin = new Date(actividad.fecha_fin["seconds"] * 1000)
         PARA NO HACER ESTO UTILIZA .toDate en la plantilla
       }
       actividad.fecha_inicio = new Date(actividad.fecha_inicio["seconds"] * 1000)*/
      actividad.id = documentoActividad.payload.doc.id
      return actividad
    })))
  }







}
