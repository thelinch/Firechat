/**
@fileoverview funcionalidades para calcular,registrar las actividades de PMAO
*@author Antony Inga Atunga <Antony.inga@unas.edu.pe>
*@version 2.0
*@History
*V2.0-se agrego las funcionalidades de registro de ejecucion de las actividades.
*V1.0-se realizaron todas las funcionalidades basicas (crud)
*/

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, TemplateRef, ContentChild, ViewChildren, QueryList, ViewContainerRef } from '@angular/core';
import { ActividadPmaoService } from 'src/app/services/actividad-pmao.service';
import { ActivatedRoute } from '@angular/router';
import { sweetAlertMensaje } from 'src/app/HelperClass/SweetAlertMensaje';
import { FormGroup, FormBuilder, FormArray, FormGroupName } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { actividadPMAO } from 'src/app/modelos/actividadPMAO';
import * as $ from "jquery"
import * as moment from "moment";
import { FunctionsBasics } from 'src/app/HelperClass/FunctionBasics';
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import Swal from 'sweetalert2';
import * as firebase from "firebase/app";
@Component({
  selector: 'app-pmao',
  templateUrl: './pmao.component.html',
  styleUrls: ['./pmao.component.css']
})
export class PmaoComponent implements OnInit, AfterViewInit {


  actividadPMAOSeleccionado: actividadPMAO
  actividadPMAOForm: FormGroup;
  activarModalFormPMAO: boolean = false;
  opcionSeleccionado: any;
  aspectoAmbientalSelected: any;
  actividadSeleccionada: actividadPMAO;
  @ViewChild("clasificacion") elementClasificacion: ElementRef
  @BlockUI() blockUI: NgBlockUI;
  idIndice: string
  // @ViewChild("vc", { read: ViewContainerRef }) divTemplate;
  //@ViewChildren("vc") divTemplate: QueryList<ViewContainerRef>
  idActividadRemove: number = -1;
  constructor(private render: Renderer2, private pmaoService: ActividadPmaoService, private router: ActivatedRoute, private formBuilder: FormBuilder) { }
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
        { nombre: "Uso de agua superficial", id: "1" },
        { nombre: "Uso de agua subterranea", id: "2" },
        { nombre: "Descargas de agua al mar (Efluentes)", id: "3" },
        { nombre: "Descargas de agua a rios y quebradas (Efluentes)", id: "4" },
        { nombre: "Descargas a pozos subterraneos (Acuiferos)", id: "5" },
        { nombre: "Potencial de contacto con el nivel freatico", id: "6" },
        { nombre: "Generacion de lodos y sedimentos (movimiento de tierra, cruces en cuerpos de agua, etc)", id: "7" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN AIRE",
      opciones: [
        { nombre: "Generacion de polvo (Uso de vias no pavimentadas)", id: "8" },
        { nombre: "Generacion de gases / humos / olores", id: "9" },
        { nombre: "Generacion de ruido", id: "10" },
        { nombre: "Generacion de vibraciones", id: "11" },
        { nombre: "Potencial impacto en una estacion de calidad de aire (Indicar cuales)", id: "12" },
        { nombre: "Uso de equipos con fuerte radioactividad", id: "13" },
        { nombre: "Uso de equipos con fuerte radiacion no ionizante (Antenas de radio, ceular, lineas electricas)", id: "14" },
        { nombre: "Consumo de energia electrica (cambio climatico)", id: "15" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN BIOLOGIA Y RECURSOS NATURALES",
      opciones: [
        { nombre: "Perturbacion o disturbacion de cobertura vegetal (Colles, quenuales, pastos, etc)", id: "16" },
        { nombre: "Perturbacion o disturbacion de habitats acuaticos o terrestres", id: "17" },
        { nombre: "Reubicacion de especies de flora y fauna", id: "18" },
        { nombre: "Consumo de papel", id: "19" },
        { nombre: " Consumo de hidrocarburos", id: "20" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN SUELOS",
      opciones: [
        { nombre: "Generacion de suelos organico (Retiro de Top soil)", id: "21" },
        { nombre: "Generacion de material inerte", id: "22" },
        { nombre: "Uso de canteras internas (autorizadas)", id: "23" },
        { nombre: "Generacion de erosion", id: "24" },
        { nombre: "Agregar otros +" },
      ]

    },
    {
      nombre: "RIESGO E IMPACTO EN DESMONTES",
      opciones: [
        { nombre: " Uso de desmonte para actividades como lastrado (indicar clase)", id: "25" },
        { nombre: "Uso de suelos organico", id: "26" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN RESIDUOS",
      opciones: [
        { nombre: "Generacion de residuos peligrosos", id: "27" },
        { nombre: "Generacion de residuos no peligrosos", id: "28" },
        { nombre: " Uso de insumos quimicos fiscalizados", id: "29" },
        { nombre: "Uso de insumos quimicos / reactivos", id: "30" },
        { nombre: "Uso de baños (portatiles u otros)", id: "31" },
        { nombre: "Potencial derrame de hidrocarburos (transporte / almacenamiento y/o abastecimiento)", id: "32" },
        { nombre: "Potencial derrame de productos quimicos / reactivos (Transporte / almacenamiento y/o abastecimiento)", id: "33" },
        { nombre: "Agregar otros +" },
      ]

    },

    {
      nombre: "RIESGO E IMPACTO POR INFRAESTRUCTURA Y EQUIPAMIENTO",
      opciones: [
        { nombre: "Uso de talleres temporales", id: "34" },
        { nombre: "Uso de instalaciones temporales (campamento / almacenes / oficinas)", id: "35" },
        { nombre: " Uso de equipos pesados y/o auxiliares", id: "36" },
        { nombre: "Agregar otros +" },
      ]

    },

    {
      nombre: "RIESGO E IMPACTO POR FUERA DE LA PROPIEDAD",
      opciones: [
        { nombre: "Ejecucion de actividades fuera del limite de propiedad", id: "37" },
        { nombre: "Comunicaciones a las pobaciones vecinas, comunidades y/o autoridades locales", id: "38" },
        { nombre: "Contratacion de personal local", id: "39" },
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
    { item: "CATASTROFICO", valor: 1, id: 1 },
    { item: "FATALIDAD", valor: 2, id: 2 },
    { item: "PERMANENTE", valor: 3, id: 3 },
    { item: "TEMPORAL", valor: 4, id: 4 },
    { item: "MENOR", valor: 5, id: 5 }
  ]
  frecuenciaLista = [
    { item: "COMUN", valor: 1, id: 1 },
    { item: "HA SUCEDIDO", valor: 2, id: 2 },
    { item: "PODRIA SUCEDER", valor: 3, id: 3 },
    { item: "RARO QUE SUCEDA", valor: 4, id: 4 },
    { item: "IMPOSIBLE QUE SUCEDA", valor: 5, id: 5 }
  ]
  significanciLista = [

    { item: "Positivo", valor: 1, icon: "(+)", id: 1 },
    { item: "Negativo", valor: -1, icon: "(-)", id: 2 },

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
  ngOnInit() {
    FunctionsBasics.iniciarMaterialBoxed();
    this.router.params.subscribe(dataUrl => {
      this.idIndice = dataUrl.idIndice;

    })

    this.actividadPMAOForm = this.formBuilder.group({
      id: new FormControl(),
      nombre: new FormControl('', Validators.required),
      condicion: new FormControl('', Validators.required),
      impacto: new FormControl('', Validators.required),
      severidad: new FormControl('', Validators.required),
      frecuencia: new FormControl('', Validators.required),
      significancia: new FormControl('', Validators.required),
      clasificacion: new FormControl('', Validators.required),
      comentario: new FormControl('', Validators.required),
      subActividades: this.formBuilder.array([this.createItem()], Validators.required)
    })
  }
  ngAfterViewInit(): void {

  }

  createItem(): FormGroup {
    return this.formBuilder.group({
      actividad: ["", Validators.required],
      fecha_fin: [FunctionsBasics.getCurrentDate(), Validators.required],
      fecha_inicio: [FunctionsBasics.getCurrentDate(), Validators.required],
      tipoTrabajo: ["", Validators.required],
      unidad: ["", Validators.required],
      total: ["", Validators.required],
      // programacion: this.formBuilder.array([this.crearProgramacion()])
    })
  }

  calcularProgramacion(item: FormGroup) {
    if (item.get("fecha_fin").value != "" && item.get("fecha_inicio").value != "" && item.get("tipoTrabajo").value != "") {
      item.removeControl("programacion")
      console.log(item.get("tipoTrabajo").value)
      item.get("total").setValue(0)
      let tipoTrabajo = item.get("tipoTrabajo").value.valor
      let fecha_fin = moment(new Date(item.get("fecha_fin").value));
      let fecha_incio = moment(new Date(item.get("fecha_inicio").value));
      let periodo = fecha_fin.diff(fecha_incio, tipoTrabajo);
      let controlArray = new Array<any>()
      for (let index = 1; index <= periodo; index++) {
        controlArray.push(this.crearProgramacion(fecha_incio.add(1, tipoTrabajo).format("YYYY-MM-DD").toString()))
      }

      item.addControl("programacion", this.formBuilder.array(controlArray))
    }

    //(item.get("programacion") as FormArray).push(this.crearProgramacion())
  }
  sumarValor(item: FormGroup, valor: number) {
    console.log(parseFloat(item.get("total").value) + " " + parseFloat(valor.toString()))
    let suma = parseFloat(item.get("total").value != "" ? item.get("total").value : 0) + parseFloat(valor.toString())
    item.get("total").setValue(suma)
  }

  crearProgramacion(mes: string) {
    return this.formBuilder.group({
      mes: [mes, Validators.required],
      valor: ["", Validators.required]
    })
  }
  addItemTemplate(): void {
    (this.actividadPMAOForm.get("subActividades") as FormArray).push(this.createItem())
  }
  addProgramacion(i: number) {
    (this.actividadPMAOForm.get("subActividades") as FormArray)
  }
  removeTemplate(index: number) {
    (this.actividadPMAOForm.get("subActividades") as FormArray).removeAt(index)
  }
  getBackgroundColorFindActividad(actividad: actividadPMAO): string {
    if (actividad.valoracion) {
      return this.listValoracionesColor.find(exprecion => exprecion.valor == actividad.valoracion.valor).color

    }
  }

  //Edicion y visualzion de las actividades PMAO
  compararObjetos(objeto1: any, objeto2: any) {
    return objeto1 && objeto2 ? objeto1.id === objeto2.id : objeto1 === objeto2;
  }
  captacionObjeto(objeto: any) {
    this.actividadPMAOSeleccionado = objeto.actividad as actividadPMAO;
    this.actividadPMAOForm.enable();
    this.visualizacionFormularionPMAO();
    if (objeto.accion == "visualizacion") {
      this.disabledActividadPMAOForm()
    }

  }
  nuevaActividad() {
    this.clearFormArray()
    this.actividadPMAOForm.enable();
  }
  visualizacionFormularionPMAO() {
    this.actividadPMAOForm.get("id").setValue(this.actividadPMAOSeleccionado.id)
    this.actividadPMAOForm.get("nombre").setValue(this.actividadPMAOSeleccionado.nombre);
    this.actividadPMAOForm.get("condicion").patchValue(this.actividadPMAOSeleccionado.condicion);
    this.actividadPMAOForm.get("impacto").patchValue(this.actividadPMAOSeleccionado.impacto);
    this.actividadPMAOForm.get("severidad").patchValue({
      id: this.actividadPMAOSeleccionado.severidad.id
    });
    this.actividadPMAOForm.get("impacto").patchValue(this.actividadPMAOSeleccionado.impacto);
    this.actividadPMAOForm.get("frecuencia").patchValue({
      id: this.actividadPMAOSeleccionado.frecuencia.id
    });
    this.actividadPMAOForm.get("significancia").patchValue({
      id: this.actividadPMAOSeleccionado.significancia.id
    });
    this.actividadPMAOForm.get("clasificacion").patchValue(this.actividadPMAOSeleccionado.clasificacion)
    this.actividadPMAOForm.get("comentario").patchValue(this.actividadPMAOSeleccionado.comentario);
    let controlSubActividad = <FormArray>this.actividadPMAOForm.controls.subActividades;
    this.clearFormArray();
    this.actividadPMAOSeleccionado.subActividades.forEach(actividad => {
      let programacionArray = new Array<FormGroup>();
      actividad.programacion.forEach(programacion => {
        programacionArray.push(this.formBuilder.group({ mes: moment(programacion.mes.toDate()).format("YYYY-MM-DD"), valor: programacion.valor }))
      })
      controlSubActividad.push(this.formBuilder.group({
        actividad: actividad.actividad,
        fecha_fin: moment(actividad.fecha_fin.toDate()).format("YYYY-MM-DD").toString(),
        fecha_inicio: moment(actividad.fecha_inicio.toDate()).format("YYYY-MM-DD").toString(),
        unidad: actividad.unidad,
        total: actividad.total,
        tipoTrabajo: actividad.tipoTrabajo,
        programacion: this.formBuilder.array(programacionArray)
      }))

    })
    this.actividadPMAOForm.updateValueAndValidity();
    this.toggleModalFormularioPMAO();

  }
  compareObjectString(objeto1: any, objeto2: any) {
    return objeto1 === objeto2
  }
  clearFormArray() {
    let array = (this.actividadPMAOForm.get("subActividades") as FormArray)
    if (array.length !== 0) {
      array.controls.splice(0)
    }
  }
  disabledActividadPMAOForm() {
    this.actividadPMAOForm.disable()
  }





  //Fin de Edicion y visualizacion de las actividades PMAO




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
        sweetAlertMensaje.getMensajeTransaccionExitosa()
      }
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

  selectionOption(element: ElementRef, nombre: string) {
    $(element).find(".body").slideToggle("slow")
    $(element).parent().parent().find(".collapsie").not(element.nativeElement).find("div.body").slideUp("slow")
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
    this.render.setStyle(this.elementClasificacion.nativeElement, "color", "white")
    this.render.setStyle(this.elementClasificacion.nativeElement, "background", significanciaValor.color)
  }

  getRiesgoMatrizIper(frecuencia: number, severidad: number): any {
    return this.matrizIper.find(i => i.frecuencia == frecuencia && i.severidad == severidad)
  }
  saveActividadPMAO(actividadPMAO: any) {
    this.blockUI.start()
    actividadPMAO.subActividades.forEach(subAc => {
      let fecha_fin = moment(new Date(subAc.fecha_fin));
      let fecha_incio = moment(new Date(subAc.fecha_inicio));
      let periodo = fecha_fin.diff(fecha_incio, "weeks");
      let tipoPeriodo = "Dias"
      if (fecha_fin.diff(fecha_incio, "M") > 0) {
        tipoPeriodo = "Meses"
        periodo = fecha_fin.diff(fecha_incio, "M");
      }
      subAc.programacion.forEach(programacion => {
        programacion.mes = firebase.firestore.Timestamp.fromDate(new Date(programacion.mes))
      });
      subAc.fecha_inicio = firebase.firestore.Timestamp.fromDate(fecha_incio.toDate())
      subAc.fecha_fin = firebase.firestore.Timestamp.fromDate(fecha_fin.toDate())
      subAc.tipoPeriodo = tipoPeriodo
      subAc.periodo = periodo
    })
    if (actividadPMAO.id != null) {
      this.pmaoService.updateActividadPMAO(actividadPMAO, this.idIndice).subscribe(respuesta => {
        if (respuesta) {
          sweetAlertMensaje.getMensajeTransaccionExitosa()
          this.blockUI.stop()
        }
      })
    } else {
      actividadPMAO.estadoActividad = false;
      this.pmaoService.saveActividadPMAO(this.idIndice, actividadPMAO).subscribe(async respuesta => {
        if (respuesta) {
          await this.blockUI.stop()
          sweetAlertMensaje.getMensajeTransaccionExitosa()
        }
      })
    }
    this.toggleModalFormularioPMAO()
  }

  guardarObservacion(index: number) {
    Swal({
      title: "Ingrese Observacion",
      input: "textarea",
      showCancelButton: true
    }).then(respuesta => {
      if (respuesta.value) {

        if (!this.actividadPMAOSeleccionado.subActividades[index].observaciones) {
          this.actividadPMAOSeleccionado.subActividades[index].observaciones = new Array<any>()
        }

        this.actividadPMAOSeleccionado.subActividades[index].observaciones.push({ mensaje: respuesta.value, estado: true, isVisto: false, fecha_regitro: firebase.firestore.Timestamp.now(), fecha_visto: firebase.firestore.Timestamp.now() })
        console.log(this.actividadPMAOSeleccionado)
        this.actividadPMAOSeleccionado.personaRegistroMensaje = JSON.parse(sessionStorage.getItem("personaLoged"))
        this.actividadPMAOSeleccionado.estadoLectura = true
        this.pmaoService.updateObservacionesFindActividadAndId(this.actividadPMAOSeleccionado, this.idIndice)
      }
    })

  }
  seleccionarActividadPmao(actividadPMAO: actividadPMAO) {
    this.actividadPMAOSeleccionado = actividadPMAO;
  }

}
