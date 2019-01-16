import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ActividadPmaoService } from '../services/actividad-pmao.service';

@Directive({
  selector: '[filtradoNombre]'
})
export class PmaoDirective {
  @Input() nombre: string;
  @Input() idIndice: string
  constructor(private elementRef: ElementRef, private render: Renderer2, private pmaoService: ActividadPmaoService) { }
  @HostListener("mouseenter") onmouseenter() {
    this.pmaoService.getAllActividadFromName(this.idIndice, this.nombre).subscribe(listaActividades => {
      console.log(listaActividades)
    })
  }

}
