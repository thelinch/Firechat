import { Pipe, PipeTransform } from '@angular/core';
import { programacionPMAO } from '../modelos/programacionPMAO';
import * as moment from "moment";

@Pipe({
  name: 'filterProgramcion'
})
export class FilterProgramcionPipe implements PipeTransform {

  transform(arrayProgramacion: programacionPMAO[]): programacionPMAO[] {
    let fecha_actual = moment(Date.now())
    return arrayProgramacion.filter(programacion => {
      let fecha_programacion = moment(programacion.mes.toDate())
      return (!programacion.resultado && fecha_actual.isSameOrAfter(fecha_programacion) || !programacion.resultado && fecha_actual.clone().subtract(7, "days").isSameOrBefore(fecha_programacion)) && !fecha_actual.clone().add(7, "days").isSameOrBefore(fecha_programacion)
    });
  }

}
