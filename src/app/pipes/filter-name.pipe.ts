import { Pipe, PipeTransform } from '@angular/core';
import { ActividadPmaoService } from '../services/actividad-pmao.service';
import { Observable } from 'rxjs';
import { actividadPMAO } from '../modelos/actividadPMAO';

@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {

  constructor(private pmaoService: ActividadPmaoService) {

  }

  transform(name: string, idIndice: string, args?: any): Observable<actividadPMAO[]> {
    console.log(name, idIndice)
    if (name != "") {
      return this.pmaoService.getAllActividadFromName(idIndice, name);

    }
  }

}
