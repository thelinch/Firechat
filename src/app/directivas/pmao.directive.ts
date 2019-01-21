import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ActividadPmaoService } from '../services/actividad-pmao.service';
import { Subscriber, Subscription } from 'rxjs';
import * as $ from 'jquery';

@Directive({
  selector: '[filtradoNombre]'
})
export class PmaoDirective {
  @Input() nombre: string;
  @Input() idIndice: string
  template: any = ""
  subcripcion: Subscription;
  nativeElement: HTMLElement;
  constructor(private elementRef: ElementRef, private render: Renderer2, private pmaoService: ActividadPmaoService) { }
  @HostListener("mouseenter") onclick() {
    this.subcripcion = this.pmaoService.getAllActividadFromName(this.idIndice, this.nombre).subscribe(listaActividades => {
      this.template = ''
      if (listaActividades.length > 1) {
        listaActividades.forEach(actividad => {
          this.template += `
          <div class="col-xs-12 col-md-6 margin_25">
          <div class="card" style="z-index:2000">
          <header class="card-header position_relative">
            <div class="card-header-title ">
              ${actividad.nombre}
    
            </div>
          </header>
          <div class="card-content ">
            <div class="content ">
              ${actividad.comentario}
            </div>
          </div>
          <footer class="card-footer ">
            <a class="card-footer-item has-text-link"  onclick="toogleFormEjecucion()">
              <span class="icon is-large ">
                <i class="material-icons" style="font-size: 2rem">details</i>
              </span>
            </a>
            <a class="card-footer-item has-text-link">
              <span class="icon is-large ">
                <i class="material-icons" style="font-size: 2rem">search</i>
              </span>
            </a>
          </footer>
        </div>
          </div>
         
      `
        })
        this.template = this.parsehtml(this.template)
        this.render.appendChild(this.elementRef.nativeElement, this.template)
      } else {
        this.render.appendChild(this.elementRef.nativeElement, this.parsehtml("<div class='row'><strong>No existe resultados</strong></div>"))

      }
    })
  }
  @HostListener("mouseleave") mouseout() {
    if (this.subcripcion) {
      $(this.elementRef.nativeElement).find("div.row").remove()
      this.subcripcion.unsubscribe();

    }
  }
  parsehtml(html) {
    let t = document.createElement("template")
    t.innerHTML = "<div class='row'>" + html + "</div>";
    return t.content.cloneNode(true)
  }
}
