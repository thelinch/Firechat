import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, from, } from 'rxjs';
import { actividadPMAO } from 'src/app/modelos/actividadPMAO';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FunctionsBasics } from 'src/app/HelperClass/FunctionBasics';
import { ActividadPmaoService } from 'src/app/services/actividad-pmao.service';
import { sweetAlertMensaje } from 'src/app/HelperClass/SweetAlertMensaje';
import Swal from 'sweetalert2'
import * as $ from "jquery"
import { executionActivityPMAO } from 'src/app/modelos/executionActivityPMAO';
import FileUploadWithPreview from 'file-upload-with-preview'
import { FileService } from 'src/app/services/file.service';
import { file } from 'src/app/modelos/File';
import { take, flatMap, map, reduce } from 'rxjs/operators';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { subActividadPMAO } from 'src/app/modelos/subActividadPMAO';
import { persona } from 'src/app/modelos/persona';
@Component({
  selector: 'app-sub-activity',
  templateUrl: './sub-activity.component.html',
  styleUrls: ['./sub-activity.component.css']
})
export class SubActivityComponent implements OnInit {


  @Input("name") name: string;
  @Input("idComponent") idComponent;
  @BlockUI() blockUI: NgBlockUI;
  @Output() seleccionActividadVisualizacionAndEdit: EventEmitter<any> = new EventEmitter<any>();
  suscripcion: Subscription
  listActivityFilter: Observable<actividadPMAO[]>
  optionSelectedActivityName: string

  fileUploadTemplate: any
  @Input("idIndice") idIndice: string
  opcionSeleccionado: any;
  activarModalFormPMAO: boolean = false
  activarModalFormEjecucion: boolean = false
  listaActividadesFiltrada: any[]
  listItemsFiltrado: Observable<actividadPMAO[]>
  actividadSeleccionada: actividadPMAO;


  formEjecucion: FormGroup;
  activateModalHistory: boolean = false;
  listEjecutionsFindIdActivity: Observable<executionActivityPMAO[]>
  comentarioActividad: Observable<any>
  listValoracionesColor = [
    { valor: 0, color: "#d50000" },
    { valor: 1, color: "#ff1744" },
    { valor: 2, color: "#ff5252" },
    { valor: 3, color: "#ff8a80" },
    { valor: 4, color: "#ccff90" },
    { valor: 5, color: "#64dd17" },

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
  listaActividades: any[]
  @ViewChild("clasificacion") elementClasificacion: ElementRef
  activarModalComentarioActividad: boolean = false;
  personaLoged: persona;
  constructor(private render: Renderer2, private pmaoService: ActividadPmaoService, private fileService: FileService) {

  }
  ngOnInit() {

    this.formEjecucion = new FormGroup({
      executionComentary: new FormControl('', Validators.required),
      denomination: new FormControl('', Validators.required),
      unity: new FormControl('', Validators.required),
      files: new FormControl('', Validators.required),
      current: new FormControl('', Validators.required),
      total: new FormControl('', Validators.required)
    })
    this.personaLoged = JSON.parse(sessionStorage.getItem("personaLoged"))
  }

  toogleModalComentarioActividad() {
    this.activarModalComentarioActividad = !this.activarModalComentarioActividad
  }
  getBackgroundColorFindActividad(actividad: actividadPMAO): string {
    if (actividad.valoracion) {
      return this.listValoracionesColor.find(exprecion => exprecion.valor == actividad.valoracion.valor).color

    }
  }

  toogleFormEjecucion() {
    this.activarModalFormEjecucion = !this.activarModalFormEjecucion
    if (this.activarModalFormEjecucion && !this.fileUploadTemplate) {
      this.fileUploadTemplate = new FileUploadWithPreview(this.idComponent)
    } else if (!this.activarModalFormEjecucion && this.fileUploadTemplate) {
      this.fileUploadTemplate.clearImagePreviewPanel();
    }
  }

  optionSelected(element: ElementRef) {
    $(element).slideDown("slow")
    $("li").find("div.row").not(element).slideUp("slow")
    this.optionSelectedActivityName = name
  }
  /**
   * Seleccionara la actividad para poder usarse en otros metodos
   * @param {any}  actividad seleccionada por el usuario
   */
  seleccionarActividad(actividad: actividadPMAO) {
    this.actividadSeleccionada = actividad;
  }
  /**
   * guarda los datos de la ejecucion de la actividad seleccionada
  *@param {json}  datos que el formulario recopila
   */
  saveEjecucion(form: FormGroup) {
    this.blockUI.start()
    form.setControl("calculation", new FormControl(this.calcularTotalFromEjecucion(form.get("total").value, form.get("current").value)))
    form.setControl("registrationDate", new FormControl(new Date()))
    let executionActivity: executionActivityPMAO = (form.value as executionActivityPMAO)
    executionActivity.urlListOfPhotos = new Array<file>();
    this.actividadSeleccionada.isEjecuciones = true
    from(this.fileUploadTemplate.cachedFileArray).pipe(take(this.fileUploadTemplate.cachedFileArray.length), flatMap((file: File) => this.fileService.uploadFile(file, "executionPMAO"))).subscribe(
      {
        next: file => {
          executionActivity.urlListOfPhotos.push(file)
        },
        error: err => console.log(err),
        complete: () => {
          console.log(executionActivity)
          this.pmaoService.saveActividadEjecucionPMAOFindIdActividad(this.actividadSeleccionada, this.idIndice, executionActivity).subscribe(respuesta => {
            if (respuesta) {
              this.blockUI.stop()
              // sweetAlertMensaje.getMensajeTransaccionExitosa()
              this.toogleFormEjecucion();
            }
          })
        }
      })

  }
  getMessageInfoValidation(activity: actividadPMAO) {
    let html: any = `<div><span>Valoracion :<strong>${activity.valoracion.nombre}</strong></span></div>
                      <div><span>Clasificacion : <strong>${activity.clasificacion}</strong></span></div>`
    sweetAlertMensaje.getMessageInfo("Informacion de la actividad", html);

  }
  ocultar() {
    if (this.suscripcion) {
      this.listActivityFilter = null
      this.suscripcion.unsubscribe()
    }

  }



  /**
   * Calcula el total de  la ejecucion que servira para promediar el PMAO
   * @param{string}
   * @returns{number}
   *
   */
  getFilterListFindName() {
    this.blockUI.start();
    this.listActivityFilter = this.pmaoService.getAllActividadFromName(this.idIndice, this.name);
    this.suscripcion = this.listActivityFilter.subscribe(res => {
      this.blockUI.stop()
    })
  }
  visualizacionSubAcitivada(actividad: actividadPMAO) {
    this.seleccionActividadVisualizacionAndEdit.emit({
      actividad: actividad,
      accion: "visualizacion"
    })
  }
  edicionSubActividad(actividad: actividadPMAO) {
    this.seleccionActividadVisualizacionAndEdit.emit({
      actividad: actividad,
      accion: "edicion"
    })
  }
  calcularTotalFromEjecucion(total: string, actual: string): number {
    let calculo: number = parseInt(actual) * 5 / parseInt(total)
    return parseFloat(calculo.toFixed(2));
  }
  toggleModalFormularioPMAO() {
    this.activarModalFormPMAO = !this.activarModalFormPMAO
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
  getAllEjecutionsFindIdActividad(idActivity: string) {
    this.listEjecutionsFindIdActivity = this.pmaoService.getAllEjecutionsFindIdActividad(this.idIndice, idActivity)
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
      inputClass: "valoracion",
      inputOptions: {
        0: "Inconformidad Total",
        1: "Inconformidad Muy Alta",
        2: "Inconformidad Alta",
        3: "Inconformidad Media",
        4: "Inconformidad Baja",
        5: "Conformidad",
      },
      inputPlaceholder: "Seleccione una valoracion",
      showCancelButton: true
    }).then(seleccion => {
      if (seleccion["value"] != null && seleccion["value"] != "") {
        actividad.valoracion = { nombre: $("select.valoracion option:selected").text(), valor: (parseInt(seleccion["value"])) }
        this.pmaoService.getAllEjecutionsFindIdActividad(this.idIndice, actividad.id).subscribe(listEjecutions => {
          let numeroTotalEjecuciones: number = listEjecutions.length
          from(listEjecutions).pipe(map(ejecution => ejecution.calculation), reduce((total, current) => total + current), map((totalSum: number) => parseFloat((totalSum / numeroTotalEjecuciones).toFixed(2)))).subscribe(efficiencyOne => {
            actividad.porcentageOfImplementation = parseFloat(((efficiencyOne * FunctionsBasics.valueEficiencyOne + actividad.valoracion.valor * FunctionsBasics.valueEficiencyTwo) / 5).toFixed(2));
            this.pmaoService.updateActividadPMAO(actividad, this.idIndice)
          })

        })
      }
    })
  }
  closeModal(): boolean {
    return false;
  }
  openModal(): boolean {
    return true
  }
  setChangeCheckbox(elemento: ElementRef) {
    if ($(elemento).is(":checked")) {
      Swal({
        type: "info",
        text: "¿Esta seguro?",
        showCancelButton: true,
        confirmButtonText: "OK"
      }).then(respuesta => {
        if (respuesta.value) {

          this.actividadSeleccionada.estadoActividad = true;
          this.pmaoService.updateEstadoActividadFindIdIndice(this.actividadSeleccionada, this.idIndice)
        }
      })
    }
  }


}
