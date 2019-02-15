import { Pipe, PipeTransform } from '@angular/core';
import { ActividadPmaoService } from '../services/actividad-pmao.service';
import { Observable } from 'rxjs';
import { actividadPMAO } from '../modelos/actividadPMAO';
import { file } from '../modelos/File';

@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {

  constructor(private pmaoService: ActividadPmaoService) {

  }

  transform(fotos: file[]): file[] {
    return fotos.filter(f => f.estado);
  }

}
