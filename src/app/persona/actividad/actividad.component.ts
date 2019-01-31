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
import { resultado } from 'src/app/modelos/resultado';
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
  listaDeComponentes: componente[]
  actividadForm: FormGroup;
  incidenciaForm: FormGroup;
  activarFormActividad: boolean = false
  activarFormIncidencia: boolean = false;
  listaTipoIncidencias: Observable<tipoIncidencia[]>
  idIndice: string;
  actividadSeleccionada: actividades
  activarListaIncidencia: boolean = false
  listaIncidencia: incidencias[]
  activarModalParametro: boolean = false
  activarModalResultado: boolean = false
  listaParametros: parametro[]
  listParametrosSeleccionados = new Array<parametro>()
  activarModalEstadistica: boolean = false
  fileUploadTemplate: any
  idArea: string;
  lineChartData: Array<any>
  dataEstadistica = new Array<any>();
  public lineChartLabels: Array<any> = ['enero', 'febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'];
  private listaResultado = new Array<resultado>()
  @BlockUI() blockUI: NgBlockUI;
  constructor(private actividadService: ActividadService, private fileService: FileService, private parametroService: ParametroService, private componenteService: ComponenteService,
    private tipoIncidenciaService: TipoIncidenciaService, private resultadoService: ResultadoService, private render: Renderer2, private incidenciaService: IncidenciaService, private router: ActivatedRoute) { }


  ngOnInit() {
    this.router.params.subscribe(dataUrl => {
      this.idIndice = dataUrl.idIndice;
      this.getAllActividadesFinIdIndice(this.idIndice)
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
    this.resultadoService.guardarResultado(this.listaParametros, this.actividadSeleccionada).subscribe(resultado => {
      if (resultado) {
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
      this.parametroService.saveParametroFromIdActividadAndIdArea("D8a5UgSogRhTreAED5BG", this.actividadSeleccionada, this.listParametrosSeleccionados)
        .subscribe(respuesta => {
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
    if (this.activarFormActividad) {
      this.componenteService.getAllComponente().subscribe(componentes => {
        this.listaDeComponentes = componentes;
      })
    }

  }


  toggleModalListaIncidencia() {
    this.activarListaIncidencia = !this.activarListaIncidencia

  }
  getAllIncidenciaFindIdActividad(idActividad: string) {
    this.actividadService.getAllIncidenciaFindIdActividad(idActividad).subscribe(lista => {
      this.listaIncidencia = lista
      console.log(this.listaIncidencia)
      this.toggleModalListaIncidencia()
    })
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

    this.listaActividades = this.actividadService.getAllActividadFindIdIndice(idIndice)
  }
  cerraModal() {
    setTimeout(() => {
      if (this.activarFormActividad) {
        this.toggleModalActividad();
      } else {
        this.toggleModalIncidencia()
      }
    },
      500)
  }
  toggleModal(elemento: ElementRef) {
    console.log(elemento.nativeElement)
  }
  toggleModalIncidencia() {
    this.activarFormIncidencia = !this.activarFormIncidencia

  }
  saveActividad(actividad: actividades) {

    this.actividadService.saveActividad(this.idIndice, actividad).subscribe(valor => {
      if (valor) {
        this.actividadForm.reset()
        this.cerraModal()
      }
    })
  }

}
