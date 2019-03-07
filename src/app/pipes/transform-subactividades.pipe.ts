import { Pipe, PipeTransform } from '@angular/core';
import { subActividadPMAO } from '../modelos/subActividadPMAO';
import { programacionPMAO } from '../modelos/programacionPMAO';
import { Observable, from, zip, iif, of } from 'rxjs';
import { flatMap, map, filter, switchMap, mapTo, toArray, pairwise } from 'rxjs/operators';

@Pipe({
  name: 'transformSubactividades'
})
export class TransformSubactividadesPipe implements PipeTransform {
  transform(programacion: programacionPMAO[]): Observable<programacionPMAO[]> {
    let obserVableSub = from(programacion);
    obserVableSub
      .pipe(filter(progra => progra.resultado != null),toArray()).subscribe(da => console.log(da))
    return obserVableSub
      .pipe(filter(progra => progra.resultado != null),toArray())
  }

  /*  transform(subActividades: subActividadPMAO[]): Observable<programacionPMAO[]> {
      return from(subActividades).pipe(switchMap(subActividad => subActividad.programacion), filter(programacion => programacion.resultado != null), toArray());
    }*/
  /*from(subActividades).pipe(map(subActividad => subActividad.programacion), filter(arrayProgramacion =>{
        return arrayProgramacion.filter(programacion => programacion.resultado)}));
    } */
}
