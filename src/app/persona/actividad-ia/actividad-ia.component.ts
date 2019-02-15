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
import { sweetAlertMensaje } from 'src/app/HelperClass/SweetAlertMensaje';
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
  accion: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  constructor(private fileService: FileService, private router: ActivatedRoute, private tipoIncidenciaService: TipoIncidenciaService, private incidenciaService: IncidenciaService) { }

  ngOnInit() {
    this.blockUI.start()
    this.incidenciaForm = new FormGroup({
      detalle: new FormControl("", Validators.required),
      tipoIncidencia: new FormControl("", Validators.required),
      files: new FormControl("", Validators.required),
      id: new FormControl()
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
  toggleAccion() {
    this.accion = !this.accion;
  }
  toggleFormIncidencia() {
    this.activarFormIncidencia = !this.activarFormIncidencia

  }
  setIncidencia(incidencia: incidencias) {
    this.incidenciaSeleccionada = incidencia;
  }
  nuevaIncidencia() {
    this.incidenciaSeleccionada = null;
  }
  deleteImagenIncidencia(index: number) {
    this.incidenciaSeleccionada.urlListOfPhotos[index].estado = false;
    console.log(this.incidenciaSeleccionada.urlListOfPhotos[index].estado)
    this.incidenciaService.updateFotoIncidencia(this.incidenciaSeleccionada,index)
  }
  saveAndEditIncidencia(incidencia: incidencias) {
    if (incidencia.id != null) {
      this.incidenciaService.updateIncidencia(incidencia).subscribe(respuesta => {
        this.toggleFormIncidencia();
      })
    } else {
      this.startBlock()
      incidencia.estado = true;
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
  }


  startBlock() {
    this.blockUI.start();
  }

  stopBlock() {
    this.blockUI.stop()

  }
  editIncidencia() {
    this.incidenciaForm.patchValue({
      detalle: this.incidenciaSeleccionada.detalle,
      id: this.incidenciaSeleccionada.id
    })
    this.incidenciaForm.controls["tipoIncidencia"].patchValue(
      {
        id: this.incidenciaSeleccionada.tipoIncidencia.id,
        color: this.incidenciaSeleccionada.tipoIncidencia.color,
        estado: this.incidenciaSeleccionada.tipoIncidencia.estado,
        tipo: this.incidenciaSeleccionada.tipoIncidencia.tipo
      })
  }
  compareTipoIncidencia(incidencia1: any, incidencia2: any) {
    return incidencia1 && incidencia2 ? incidencia1.id = incidencia2.id : incidencia1 === incidencia2;
  }
  eliminarIncidencia() {
    sweetAlertMensaje.getMensajeEdit("Desea eliminar la incidencia").then(respuesta => {
      if (respuesta.value) {
        this.incidenciaSeleccionada.estado = false;
        this.incidenciaService.updateEstadoIncidencia(this.incidenciaSeleccionada);
      }
    })
  }
  resetFormIncidencia() {
    this.incidenciaForm.reset();
  }
}


