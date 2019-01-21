/**
@fileoverview funcionalidades para calcular,registrar las actividades de PMAO 
*@author Antony Inga Atunga <Antony.inga@unas.edu.pe>
*@version 2.0
*@History
*V2.0-se agrego las funcionalidades de registro de ejecucion de las actividades.
*V1.0-se realizaron todas las funcionalidades basicas (crud) 
*/

import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActividadPmaoService } from 'src/app/services/actividad-pmao.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { sweetAlertMensaje } from 'src/app/HelperClass/SweetAlertMensaje';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { actividadPMAO } from 'src/app/modelos/actividadPMAO';
import * as $ from "jquery"
import { FunctionsBasics } from 'src/app/HelperClass/FunctionBasics';
@Component({
  selector: 'app-pmao',
  templateUrl: './pmao.component.html',
  styleUrls: ['./pmao.component.css']
})
export class PmaoComponent implements OnInit {


  actividadPMAOForm: FormGroup;
  activarModalFormPMAO: boolean = false;
  opcionSeleccionado: any;
  aspectoAmbientalSelected: any;
  activarModalFormEjecucion: boolean = false
  listaActividadesFiltrada: any[]
  actividadSeleccionada: actividadPMAO;
  formEjecucion: FormGroup
  @ViewChild("clasificacion") elementClasificacion: ElementRef
  listValoracionesColor = [
    { valor: 0, color: "#d50000" },
    { valor: 1, color: "#ff1744" },
    { valor: 2, color: "#ff5252" },
    { valor: 3, color: "#ff8a80" },
    { valor: 4, color: "#ccff90" },
    { valor: 5, color: "#64dd17" },

  ]

  listaAspectosAmbientales = [
    {
      nombre: "RIESGO E IMPACTO EN EL AGUA",
      opciones: [
        { nombre: "Uso de agua superficial" },
        { nombre: "Uso de agua subterranea" },
        { nombre: "Descargas de agua al mar (Efluentes)" },
        { nombre: "Descargas de agua a rios y quebradas (Efluentes)" },
        { nombre: "Descargas a pozos subterraneos (Acuiferos)" },
        { nombre: "Potencial de contacto con el nivel freatico" },
        { nombre: "Generacion de lodos y sedimentos (movimiento de tierra, cruces en cuerpos de agua, etc)" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN AIRE",
      opciones: [
        { nombre: "Generacion de polvo (Uso de vias no pavimentadas)" },
        { nombre: "Generacion de gases / humos / olores" },
        { nombre: "Generacion de ruido" },
        { nombre: "Generacion de vibraciones" },
        { nombre: "Potencial impacto en una estacion de calidad de aire (Indicar cuales)" },
        { nombre: "Uso de equipos con fuerte radioactividad" },
        { nombre: "Uso de equipos con fuerte radiacion no ionizante (Antenas de radio, ceular, lineas electricas)" },
        { nombre: "Consumo de energia electrica (cambio climatico)" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN BIOLOGIA Y RECURSOS NATURALES",
      opciones: [
        { nombre: "Perturbacion o disturbacion de cobertura vegetal (Colles, quenuales, pastos, etc)" },
        { nombre: "Perturbacion o disturbacion de habitats acuaticos o terrestres" },
        { nombre: "Reubicacion de especies de flora y fauna" },
        { nombre: "Consumo de papel" },
        { nombre: " Consumo de hidrocarburos" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN SUELOS",
      opciones: [
        { nombre: "Generacion de suelos organico (Retiro de Top soil)" },
        { nombre: "Generacion de material inerte" },
        { nombre: "Uso de canteras internas (autorizadas)" },
        { nombre: "Generacion de erosion" },
        { nombre: "Agregar otros +" },
      ]

    },
    {
      nombre: "RIESGO E IMPACTO EN DESMONTES",
      opciones: [
        { nombre: " Uso de desmonte para actividades como lastrado (indicar clase)" },
        { nombre: "Uso de suelos organico" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN RESIDUOS",
      opciones: [
        { nombre: "Generacion de residuos peligrosos" },
        { nombre: "Generacion de residuos no peligrosos" },
        { nombre: " Uso de insumos quimicos fiscalizados" },
        { nombre: "Uso de insumos quimicos / reactivos" },
        { nombre: "Uso de baños (portatiles u otros)" },
        { nombre: "Potencial derrame de hidrocarburos (transporte / almacenamiento y/o abastecimiento)" },
        { nombre: "Potencial derrame de productos quimicos / reactivos (Transporte / almacenamiento y/o abastecimiento)" },
        { nombre: "Agregar otros +" },
      ]

    },

    {
      nombre: "RIESGO E IMPACTO POR INFRAESTRUCTURA Y EQUIPAMIENTO",
      opciones: [
        { nombre: "Uso de talleres temporales" },
        { nombre: "Uso de instalaciones temporales (campamento / almacenes / oficinas)" },
        { nombre: " Uso de equipos pesados y/o auxiliares" },
        { nombre: "Agregar otros +" },
      ]

    },

    {
      nombre: "RIESGO E IMPACTO POR FUERA DE LA PROPIEDAD",
      opciones: [
        { nombre: "Ejecucion de actividades fuera del limite de propiedad" },
        { nombre: "Comunicaciones a las pobaciones vecinas, comunidades y/o autoridades locales" },
        { nombre: "Contratacion de personal local" },
        { nombre: "Agregar otros +" },
      ]

    },
    {
      nombre: "AGREGAR OTROS ",
      opciones: [

        { nombre: "Agregar otros +" },
      ]

    }
  ]






  serveridadLista = [
    { item: "CATASTROFICO", valor: 1 },
    { item: "FATALIDAD", valor: 2 },
    { item: "PERMANENTE", valor: 3 },
    { item: "TEMPORAL", valor: 4 },
    { item: "MENOR", valor: 5 }
  ]

  frecuenciaLista = [
    { item: "COMUN", valor: 1 },
    { item: "HA SUCEDIDO", valor: 2 },
    { item: "PODRIA SUCEDER", valor: 3 },
    { item: "RARO QUE SUCEDA", valor: 4 },
    { item: "IMPOSIBLE QUE SUCEDA", valor: 5 }
  ]


  significanciLista = [

    { item: "Positivo", valor: 1, icon: "(+)" },
    { item: "Negativo", valor: -1, icon: "(-)" },

  ]


  matrizIper = [
    { frecuencia: 1, severidad: 5, valor: 15 },
    { frecuencia: 1, severidad: 4, valor: 10 },
    { frecuencia: 1, severidad: 3, valor: 6 },
    { frecuencia: 1, severidad: 2, valor: 3 },
    { frecuencia: 1, severidad: 1, valor: 1 },
    { frecuencia: 2, severidad: 5, valor: 19 },
    { frecuencia: 2, severidad: 4, valor: 14 },
    { frecuencia: 2, severidad: 3, valor: 3 },
    { frecuencia: 2, severidad: 2, valor: 5 },
    { frecuencia: 2, severidad: 1, valor: 2 },
    { frecuencia: 3, severidad: 5, valor: 22 },
    { frecuencia: 3, severidad: 4, valor: 18 },
    { frecuencia: 3, severidad: 3, valor: 13 },
    { frecuencia: 3, severidad: 2, valor: 8 },
    { frecuencia: 3, severidad: 1, valor: 4 },
    { frecuencia: 4, severidad: 5, valor: 24 },
    { frecuencia: 4, severidad: 4, valor: 21 },
    { frecuencia: 4, severidad: 3, valor: 17 },
    { frecuencia: 4, severidad: 2, valor: 12 },
    { frecuencia: 4, severidad: 1, valor: 7 },
    { frecuencia: 5, severidad: 5, valor: 25 },
    { frecuencia: 5, severidad: 4, valor: 23 },
    { frecuencia: 5, severidad: 3, valor: 20 },
    { frecuencia: 5, severidad: 2, valor: 16 },
    { frecuencia: 5, severidad: 1, valor: 11 }
  ]
  clasificacion = [
    { name: "ALTO", inicio: -1, fin: -8, color: "red" },
    { name: "Medio", inicio: -9, fin: -15, color: "yellow" },
    { name: "Bajo", inicio: -16, fin: -25, color: "green" },
    { name: "ALTO", inicio: 1, fin: 8, color: "teal" },
    { name: "Medio", inicio: 9, fin: 15, color: "blue" },
    { name: "Bajo", inicio: 16, fin: 25, color: "#c4bfbd" }]
  idIndice: string
  listaActividades: any[]
  //TODO: Refa
  constructor(private render: Renderer2, private pmaoService: ActividadPmaoService, private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(dataUrl => {
      this.idIndice = dataUrl.idIndice;
      this.getAllActividades(this.idIndice)
    })

    this.actividadPMAOForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      impacto: new FormControl('', Validators.required),
      severidad: new FormControl('', Validators.required),
      frecuencia: new FormControl('', Validators.required),
      significancia: new FormControl('', Validators.required),
      clasificacion: new FormControl('', Validators.required),
      comentario: new FormControl('', Validators.required)
    })

    this.formEjecucion = new FormGroup({
      comentarioEjecucion: new FormControl('', Validators.required),
      denominacion: new FormControl('', Validators.required),
      unidad: new FormControl('', Validators.required),
      actual: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required)
    })
  }
  getBackgroundColorFindActividad(actividad: actividadPMAO): string {
    if (actividad.valoracion) {
      return this.listValoracionesColor.find(exprecion => exprecion.valor == actividad.valoracion.valor).color

    }
  }






  /**
   * Calcula el total de  la ejecucion que servira para promediar el PMAO
   * @param{string}
   * @returns{number}
   * 
   */
  calcularTotalFromEjecucion(total: string, actual: string): number {
    let calculo: number = Math.floor(parseInt(actual) * 5 / parseInt(total))
    return calculo;
  }
  seleccionarActividad(actividad: actividadPMAO) {
    this.actividadSeleccionada = actividad;
  }
  /** 
   * guarda los datos de la ejecucion de la actividad seleccionada
  *@param {json}  datos que el formulario recopila 
   */
  saveEjecucion(form: FormGroup) {
    form.setControl("calculo", new FormControl(this.calcularTotalFromEjecucion(form.get("total").value, form.get("actual").value)))
    let fechaActual = new Date();
    //:TODO Falta realizar el update de las actividades
    form.setControl("fechaRegistro", new FormControl(new Date()))
    this.actividadSeleccionada.isEjecuciones = true
    this.pmaoService.saveActividadEjecucionPMAOFindIdActividad(this.actividadSeleccionada, this.idIndice, form.value).subscribe(respuesta => {
      if (respuesta) {
        this.toogleFormEjecucion();
        sweetAlertMensaje.getMensajeTransaccionExitosa()
      }
    })
  }
  toogleFormEjecucion() {
    this.activarModalFormEjecucion = !this.activarModalFormEjecucion
  }
  getActividades(nombre: string, elemento: HTMLDivElement) {
    let template: any = ""
    this.pmaoService.getAllActividadFromName(this.idIndice, nombre).subscribe(lista => {
      lista.forEach(actividad => {
        template += `
        <div class="col-xs-12 col-md-4">
        <div class="card">
        <header class="card-header position_relative" [ngClass]="{'has-background-primary': ${actividad.isResulto}}">
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
      elemento.appendChild(this.render.createElement(template))
    })

  }

  toggleModalFormularioPMAO() {
    this.activarModalFormPMAO = !this.activarModalFormPMAO
  }

  calcularClasificacion(formulario) {
    if (formulario.frecuencia != null && formulario.severidad != null && formulario.significancia != null) {
      this.getClasificacion(this.getRiesgoMatrizIper(formulario.frecuencia.valor, formulario.severidad.valor).valor, formulario.significancia.valor)
    }
  }
  /**
   *
   *
   * @param {string} idIndice
   * @memberof PmaoComponent
   */
  getAllActividades(idIndice: string) {
    this.pmaoService.getAllActividadPMAO(idIndice).subscribe(lista => {
      this.listaActividades = lista
    })
  }
  selectionOption(element: ElementRef, nombre: string) {
    $(element).find(".body").slideToggle("slow")
    $(element).parent().parent().find(".collapsie").not(element).find("div.body").slideUp("slow")
  }
  seleccionarOpcion(item: any) {
    this.opcionSeleccionado = item
  }
  resetFormActividadPMAO() {
    this.actividadPMAOForm.reset({ nombre: this.opcionSeleccionado.nombre })
  }
  getClasificacion(valor: number, significancia: number) {

    let significanciaValor: { name: any; inicio?: number; fin?: number; color: any; };

    if (significancia > 0) {
      significanciaValor = this.clasificacion.find(cl => valor >= cl.inicio && valor <= cl.fin)

    } else {
      significanciaValor = this.clasificacion.find(cl => -1 * valor <= cl.inicio && -1 * valor >= cl.fin)
    }
    this.actividadPMAOForm.get("clasificacion").setValue(significanciaValor.name)
    this.render.setStyle(this.elementClasificacion.nativeElement, "background", significanciaValor.color)
  }

  getRiesgoMatrizIper(frecuencia: number, severidad: number): any {
    return this.matrizIper.find(i => i.frecuencia == frecuencia && i.severidad == severidad)
  }
  saveActividadPMAO(form: actividadPMAO) {
    this.pmaoService.saveActividadPMAO(this.idIndice, form).subscribe(respuesta => {
      if (respuesta) {
        sweetAlertMensaje.getMensajeTransaccionExitosa()
        this.toggleModalFormularioPMAO()
      }
    })
  }


  resetFormEjecucion() {
    this.formEjecucion.reset()
  }
  getMensajeValoracion(actividad: actividadPMAO) {
    Swal({
      title: "Ingrese la valoracion",
      input: "select",
      inputClass: "select",
      inputOptions: {
        0: "Inconformidad Total",
        1: "Inconformidad Muy Alta",
        2: "Inconformidad Alta",
        3: "Inconformidad Media",
        4: "Inconformidad Baja",
        5: "Conformidad",
      },
      inputPlaceholder: "Valoracion",
      showCancelButton: true
    }).then(seleccion => {
      if (seleccion["value"] != null) {
        actividad.valoracion = { valor: (parseInt(seleccion["value"])), nombre: $("select.select option:selected").text() }
        this.pmaoService.setValoracionFindIdActividad(this.idIndice, actividad).subscribe(respuesta => {
          console.log(respuesta)
        })
      }

    })


  }
}
