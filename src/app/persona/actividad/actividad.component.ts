import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { actividades } from '../../modelos/actividades';
import { ActividadService } from '../../services/actividad.service';
import { ParametroService } from '../../services/parametro.service';
import { ComponenteService } from '../../services/componente.service';
import { componente } from '../../modelos/componente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoIncidenciaService } from '../../services/tipo-incidencia.service';
import { tipoIncidencia } from '../../modelos/TipoIncidencia';
import { IncidenciaService } from '../../services/incidencia.service';
import { incidencias } from '../../modelos/incidencias';
import { ActivatedRoute } from '@angular/router';
import { Observable, from } from 'rxjs';
import { parametro } from 'src/app/modelos/parametro';
import { resultado } from 'src/app/modelos/resultadoICA';
import { ResultadoService } from 'src/app/services/resultado.service';
import FileUploadWithPreview from 'file-upload-with-preview'
import { file } from 'src/app/modelos/File';
import { flatMap, take } from 'rxjs/operators';
import { FileService } from 'src/app/services/file.service';
import { FunctionsBasics } from 'src/app/HelperClass/FunctionBasics';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  listaActividades: Observable<actividades[]>
  listaDeComponentes: Observable<componente[]>
  actividadForm: FormGroup;
  incidenciaForm: FormGroup;
  activarFormActividad: boolean = false
  activarFormIncidencia: boolean = false;
  listaTipoIncidencias: Observable<tipoIncidencia[]>
  idIndice: string;
  actividadSeleccionada: actividades
  activarListaIncidencia: boolean = false
  listaIncidencia: Observable<incidencias[]>
  activarModalParametro: boolean = false
  activarModalResultado: boolean = false
  actividadModalHistorialResultado: boolean = false
  listaParametros: parametro[]
  listResultadoHistorial: any[]
  listParametrosSeleccionados = new Array<parametro>()
  activarModalEstadistica: boolean = false
  fileUploadTemplate: any
  idArea: string;
  lineChartData: Array<any>
  dataEstadistica = new Array<any>();
  public lineChartLabels: Array<any> = ['enero', 'febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  private listaResultado = new Array<resultado>()
  @BlockUI() blockUI: NgBlockUI;
  actualPagina: number = 1;
  optionAtivity: string = "MONITOREO Y LABORATORIO"
  constructor(private actividadService: ActividadService, private fileService: FileService, private parametroService: ParametroService, private componenteService: ComponenteService,
    private tipoIncidenciaService: TipoIncidenciaService, private resultadoService: ResultadoService, private render: Renderer2, private incidenciaService: IncidenciaService, private router: ActivatedRoute) { }


  ngOnInit() {
    this.blockUI.start()
    this.router.params.subscribe(dataUrl => {
      this.idIndice = dataUrl.idIndice;
    })
    this.router.parent.parent.params.subscribe(dataUrlPadre => {
      this.idArea = dataUrlPadre.idarea;
    })
    this.actividadForm = new FormGroup({
      actividad: new FormControl('', Validators.required),
      fecha_inicio: new FormControl(FunctionsBasics.getCurrentDate(), Validators.required),
      fecha_fin: new FormControl(FunctionsBasics.getCurrentDate()),
      componente: new FormControl('', Validators.required)
    })
    this.incidenciaForm = new FormGroup({
      detalle: new FormControl("", Validators.required),
      tipoIncidencia: new FormControl("", Validators.required),
      files: new FormControl("", Validators.required)
    })
    this.listaTipoIncidencias = this.tipoIncidenciaService.getAllTipoIncidencia()
    this.fileUploadTemplate = new FileUploadWithPreview("template")
    this.listaDeComponentes = this.componenteService.getAllComponente()
    this.listaActividades = this.actividadService.getAllActividadFindIdIndice(this.idIndice)
    this.listaActividades.subscribe(respuesta => {
      this.blockUI.stop()
    })

  }
  getResultadoEstadisticoFindIdActividad(actividad: actividades) {
    this.resultadoService.getEstadisticaParametroFinIdActividad(actividad.id).subscribe(dat => {
      this.lineChartData = new Array<any>();
      this.lineChartData = dat
    })
  }
  getAllParametroFindIdActividad(idActividad: string) {
    this.parametroService.getAllParametroFindIdActividad(idActividad).subscribe(lista => {
      this.listaParametros = lista
    });
  }
  toggleModalEstadistica() {
    this.activarModalEstadistica = !this.activarModalEstadistica
  }
  agrearParametro(parametro: parametro) {
    this.listParametrosSeleccionados.push(parametro)
    console.log(this.listParametrosSeleccionados)

  }
  cambioEstadoInput(input, index: number, parametro: parametro) {
    if (input.checked) {
      this.agrearParametro(parametro)
    } else {
      this.quitarParametro(index)
    }
  }

  agregarResultado(parametro: parametro, resultado: number) {
    if (resultado > 0) {
      if (this.listaResultado.findIndex(res => res.parametro.id == parametro.id) != -1) {
        this.listaResultado.find(res => res.parametro.id == parametro.id).resultado = resultado
      } else {
        this.listaResultado.push({ parametro, resultado })

      }
    }

  }
  guardarResultado() {
    this.actividadSeleccionada.isResultado = true;
    this.resultadoService.guardarResultado(this.listaParametros, this.actividadSeleccionada).subscribe(resultado => {
      if (this.actividadSeleccionada.componente.nombre == "MONITOREO EN CAMPO") {
        this.actividadSeleccionada.fecha_fin = new Date();
      }
      if (resultado) {
        this.actividadService.updateAtividad(this.actividadSeleccionada)
        this.toggleModalResultado()
      }
    });

  }
  toggleModalResultado() {
    this.activarModalResultado = !this.activarModalResultado
    if (this.activarModalResultado) {
      this.listaResultado.splice(0, this.listaResultado.length)
    }
  }
  saveParametroFromIdActividadAndIdArea() {
    if (this.actividadSeleccionada) {
      this.actividadSeleccionada.isParametro = true
      this.parametroService.saveParametroFromIdActividadAndIdArea(this.idArea, this.actividadSeleccionada, this.listParametrosSeleccionados)
        .subscribe(respuesta => {
          this.actividadService.updateAtividad(this.actividadSeleccionada)
          if (respuesta) {
            this.toggleModalParametro()
          }
        })

    } else {
      console.log("falta seleccionar la actividad")
    }
  }

  quitarParametro(index: number) {
    this.listParametrosSeleccionados.splice(index, 1)
  }

  toggleModalParametro() {
    this.activarModalParametro = !this.activarModalParametro
    if (!this.activarModalParametro) {
      this.resetArrayListaParametrosSeleccionados()
    }
  }
  resetArrayListaParametrosSeleccionados() {
    this.listParametrosSeleccionados.splice(0, this.listParametrosSeleccionados.length)
  }
  getAllParametros() {
    this.parametroService.getAllParametro().subscribe(lista => {
      this.listaParametros = lista
    });
    this.toggleModalParametro()
  }

  seleccionarActividad(actividad: actividades) {
    this.actividadSeleccionada = actividad
  }
  toggleModalActividad() {
    this.activarFormActividad = !this.activarFormActividad;
  }
  changeOptionsComponent() {

    this.optionAtivity = this.actividadForm.get("componente").value.nombre
    if (this.optionAtivity == "MONITOREO EN CAMPO") {
      this.actividadForm.get("fecha_fin").setValue(FunctionsBasics.getCurrentDate())
      this.actividadForm.get("fecha_inicio").setValue(FunctionsBasics.getCurrentDate())

    }
  }

  toggleModalListaIncidencia() {
    this.activarListaIncidencia = !this.activarListaIncidencia

  }
  getAllIncidenciaFindIdActividad(idActividad: string) {
    this.listaIncidencia = this.incidenciaService.getAllIncidenciafindIdtipoReferencia(idActividad)
  }

  saveIncidencia(incidencia: incidencias) {
    if (this.actividadSeleccionada) {
      this.startBlock()
      incidencia.urlListOfPhotos = new Array<file>()
      from(this.fileUploadTemplate.cachedFileArray).pipe(take(this.fileUploadTemplate.cachedFileArray.length), flatMap((file: File) => this.fileService.uploadFile(file, "incidencias"))).subscribe(
        {
          next: file => incidencia.urlListOfPhotos.push(file),
          error: error => console.log(error),
          complete: () => {
            this.incidenciaService.setIncidenciaFindIdActividad(this.actividadSeleccionada, incidencia).then(documento => {
              if (documento) {
                documento.get().then(incidencia => {
                  this.incidenciaForm.reset()
                  this.stopBlock();
                  this.toggleModalIncidencia()
                })
              }
            })
          }
        }
      )
    }
  }
  startBlock() {
    this.blockUI.start();

  }
  stopBlock() {
    this.blockUI.stop()

  }


  getAllActividadesFinIdIndice(idIndice: string) {


  }

  toggleModal(elemento: ElementRef) {
    console.log(elemento.nativeElement)
  }
  toggleModalIncidencia() {
    this.activarFormIncidencia = !this.activarFormIncidencia

  }
  saveActividad(actividad: actividades) {
    actividad.persona = JSON.parse(sessionStorage.getItem("personaLoged"))
    actividad.isParametro = false;
    this.actividadService.saveActividad(this.idIndice, actividad).subscribe(valor => {
      if (valor) {
        this.actividadForm.reset()
        this.toggleModalActividad();
      }
    })

  }
  //Funcionalidades de usuarios
  toggleModalHistorialResultado() {
    this.actividadModalHistorialResultado = !this.actividadModalHistorialResultado;
  }
  getAllResultadoFindIdActividad() {
    this.resultadoService.getAllResultadoFindIdActividad(this.actividadSeleccionada.id).subscribe(listaResultad => {
      this.listResultadoHistorial = listaResultad
      console.log(this.listResultadoHistorial)
    })
  }


}
