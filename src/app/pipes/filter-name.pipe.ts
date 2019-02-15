import { Pipe, PipeTransform } from '@angular/core';
import { file } from '../modelos/File';
import { Observable, of } from 'rxjs';

@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {

  transform(fotos: file[]): Observable<file[]> {
    return of(fotos.filter(f => f.estado));
  }

}
