import { Injectable } from '@angular/core';
import { persona } from '../modelos/persona';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { map, mergeAll, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { actividades } from '../modelos/actividades';
import { actividad_persona } from '../modelos/actividad_persona';
import { area } from '../modelos/area';
import { tipoPersona } from '../modelos/tipoPersona';
import { gerencia } from '../modelos/gerencia';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personaCollection: AngularFirestoreCollection<persona>
  private perosonaDoc: AngularFirestoreDocument<persona>
  persona: persona
  constructor(private afs: AngularFirestore) {
    this.personaCollection = this.afs.collection<persona>('persona')
  }
  save(persona: persona) {
    this.personaCollection.add(persona)
  }
  update(persona: persona) {
    this.getCollectionPersona().doc(persona.id).update(persona)
  }
  getCollectionPersona(): AngularFirestoreCollection<persona> {
    return this.afs.collection<persona>("persona")
  }
  getPersonaFindId(idPersona: string): Observable<persona> {
    return this.afs.collection("persona").doc(idPersona).snapshotChanges().pipe(map(documentoAction => {
      let  personaData = (documentoAction.payload.data() as persona)
      personaData.id = documentoAction.payload.id
      return personaData
    }))


    /*pipe(switchMap((persona) => {
      persona.areaRef.get().then(datosArea => persona.area = datosArea.data() as area)
      persona.tipoPersonaRef.get().then(datosTipoPersona => persona.tipoPersona = datosTipoPersona.data() as tipoPersona)
        }))*/

  }
  getPersonaFindCorreo(correo: string): Observable<persona[]> {
    return this.afs.collection<persona>("persona", (ref) => ref.where("email", "==", correo).limit(1)).snapshotChanges().pipe(map(actions => actions.map(documentPerson => {
      let personData = documentPerson.payload.doc.data() as persona;
      personData.id = documentPerson.payload.doc.id
      return personData
    })));
  }
  getActividadesFindIdPersona(idPersona: string): Observable<actividad_persona[]> {
    return this.getCollectionPersona().doc(idPersona).collection("actividad_persona").snapshotChanges().pipe(map(actions => actions.map(i => {
      const id = i.payload.doc.id;
      const data = i.payload.doc.data() as actividad_persona;
      return { id, ...data };
    })))

  }

}
