import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren, AfterContentInit, AfterViewChecked, AfterContentChecked, OnChanges, Renderer2 } from '@angular/core';
import { Chart } from 'chart.js';
import { ParametroService } from '../../services/parametro.service';
import { parametro } from '../../modelos/parametro';
import { EventEmitter } from 'events';
import { CategoriaService } from '../../services/categoria.service';
import { categoria } from '../../modelos/categoria';
import { IndiceService } from '../../services/indice.service';
import { indice } from '../../modelos/indice';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ActividadService } from 'src/app/services/actividad.service';
import { actividades } from 'src/app/modelos/actividades';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FunctionsBasics } from 'src/app/HelperClass/FunctionBasics';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentInit, AfterContentInit {


  listaIndice: Observable<indice[]>
  chart: any
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  @ViewChild("fechaInicio") fechaInicio: ElementRef

  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  formFilterDate: FormGroup
  idArea: string
  idPerson: string
  objetoUrl: Observable<any>
  public barChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Valor' },
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }
  consultarResultados(datosForm) {


  }
  public chartHovered(e: any): void {
    console.log(e);
  }
  ngAfterContentInit(): void {


  }

  ngAfterContentChecked(): void {

  }


  constructor(private render2: Renderer2, private parametroService: ParametroService, private actividadService: ActividadService, private indiceService: IndiceService, private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.formFilterDate = new FormGroup({
      startDate: new FormControl(FunctionsBasics.getCurrentDate(), Validators.compose([Validators.required])),
      endDate: new FormControl(FunctionsBasics.getCurrentDate(), Validators.compose([Validators.required]))
    })
    this.objetoUrl = this.router.parent.params;
    this.router.parent.params.subscribe(objetoArea => {
      this.idPerson = objetoArea.id
      this.idArea = objetoArea.idarea;
      this.getAllIndiceFindIndArea(this.idArea)

    })

  }

  getAllIndiceFindIndArea(idArea: string) {
    this.listaIndice = this.indiceService.getallIndiceFindIdArea(idArea)

  }

}
