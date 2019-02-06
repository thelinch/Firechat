import { Directive, ViewContainerRef, TemplateRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrueba]'
})
export class PruebaDirective {

  constructor(private viewContainerRef: ViewContainerRef, private templateRef: TemplateRef<any>) { }
  @HostListener("click") onclick() {
    this.viewContainerRef.createEmbeddedView(this.templateRef)
  }

}
