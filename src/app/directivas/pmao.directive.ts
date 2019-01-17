import { Directive, Input, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ActividadPmaoService } from '../services/actividad-pmao.service';
import { Subscriber, Subscription } from 'rxjs';

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
  @HostListener("mouseenter") onmouseenter() {
    this.subcripcion = this.pmaoService.getAllActividadFromName(this.idIndice, this.nombre).subscribe(listaActividades => {
      if (listaActividades.length > 1) {
        listaActividades.forEach(actividad => {
          this.template += `
          <div class="col-xs-12 col-md-6 margin_25">
          <div class="card">
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
            <a class="card-footer-item has-text-link" (click)="toogleFormEjecucion()">
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


        this.nativeElement = this.elementRef.nativeElement
        if (this.elementRef.nativeElement.childNodes.length == 3) {
          console.log()
          this.render.removeChild(this.elementRef.nativeElement, this.template)
        }
        this.render.appendChild(this.nativeElement, this.template)
      } else {
        console.log("no contiene")
      }
    })
  }
  @HostListener("mouseleave") mouseout() {

    console.log("entro al mouseout", this.template)

    this.subcripcion.unsubscribe();
  }
  parsehtml(html) {
    let t = document.createElement("template")
    t.innerHTML = "<div class='row'>" + html + "</div>";
    return t.content.cloneNode(true)
  }
}
