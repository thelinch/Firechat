import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoIncidenciaService } from '../../services/tipo-incidencia.service';
import { tipoIncidencia } from '../../modelos/TipoIncidencia';
import { IncidenciaService } from '../../services/incidencia.service';
import { incidencias } from '../../modelos/incidencias';
import { Observable, from } from 'rxjs';
import FileUploadWithPreview from 'file-upload-with-preview'
import { FileService } from 'src/app/services/file.service';
import { file } from 'src/app/modelos/File';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { take, flatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-actividad-ia',
  templateUrl: './actividad-ia.component.html',
  styleUrls: ['./actividad-ia.component.css']
})
export class ActividadIAComponent implements OnInit {
  activarModalIncidencia: boolean = false;
  activarFormIncidencia: boolean = false;
  incidenciaForm: FormGroup;
  listaIncidencia: Observable<incidencias[]>;
  listaTipoIncidencias: Observable<tipoIncidencia[]>
  fileUploadTemplate: any
  incidenciaSeleccionada: incidencias;
  idIA: string
  actualPagina: number = 1;
  colorTipo = [
    { tipo: 'BAJO', color: 'green' },
    { tipo: 'MEDIO', color: 'yellow' },
    { tipo: 'ALTO', color: 'red' }
  ]
  @BlockUI() blockUI: NgBlockUI;
  constructor(private fileService: FileService, private router: ActivatedRoute, private tipoIncidenciaService: TipoIncidenciaService, private incidenciaService: IncidenciaService) { }

  ngOnInit() {
    this.blockUI.start()
    this.incidenciaForm = new FormGroup({
      detalle: new FormControl("", Validators.required),
      tipoIncidencia: new FormControl("", Validators.required),
      files: new FormControl("", Validators.required)
    })

    this.listaTipoIncidencias = this.tipoIncidenciaService.getAllTipoIncidencia()
    this.fileUploadTemplate = new FileUploadWithPreview("template")
    this.router.params.subscribe(parametro => this.idIA = parametro.idIndice)
    this.listaIncidencia = this.incidenciaService.getAllIncidenciafindIdtipoReferencia(this.idIA)
    this.listaIncidencia.subscribe(resues => {
      this.blockUI.stop()
    })
  }

  toggleModalIncidencia() {
    this.activarModalIncidencia = !this.activarModalIncidencia

  }
  toggleFormIncidencia() {
    this.activarFormIncidencia = !this.activarFormIncidencia

  }
  setIncidencia(incidencia: incidencias) {
    this.incidenciaSeleccionada = incidencia;
  }
  saveIncidencia(incidencia: incidencias) {
    this.startBlock()
    incidencia.urlListOfPhotos = new Array<file>()
    from(this.fileUploadTemplate.cachedFileArray).pipe(take(this.fileUploadTemplate.cachedFileArray.length), flatMap((file: File) => this.fileService.uploadFile(file, "incidencias"))).subscribe({
      next: file => incidencia.urlListOfPhotos.push(file),
      error: error => console.log(error),
      complete: () => {
        this.incidenciaService.setIncidenciaFindIA(this.idIA, incidencia).then(documento => {
          if (documento) {
            this.incidenciaForm.reset()
            this.toggleFormIncidencia()
            this.stopBlock();
          }
        })
      }
    })

  }


  startBlock() {
    this.blockUI.start();
  }

  stopBlock() {
    this.blockUI.stop()

  }

  colorIncidencia(incidencia: incidencias) {
    console.log(incidencia)
    return this.colorTipo.find(objeto => objeto.tipo == incidencia.tipoIncidencia.tipo).color
  }
}


