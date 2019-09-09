import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { TipoIncidenciaService } from "../../services/tipo-incidencia.service";
import { tipoIncidencia } from "../../modelos/TipoIncidencia";
import { IncidenciaService } from "../../services/incidencia.service";
import { incidencias } from "../../modelos/incidencias";
import { Observable, from } from "rxjs";
import FileUploadWithPreview from "file-upload-with-preview";
import { FileService } from "src/app/services/file.service";
import { file } from "src/app/modelos/File";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { take, flatMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { sweetAlertMensaje } from "src/app/HelperClass/SweetAlertMensaje";
import { FunctionsBasics } from "./../../HelperClass/FunctionBasics";
import * as firebase from "firebase/app";
import { Colecciones } from "src/app/HelperClass/Colecciones";
import { MessagingService } from "src/app/services/messaging.service";
import { SendMessageService } from "src/app/services/send-message.service";

@Component({
  selector: "app-actividad-ia",
  templateUrl: "./actividad-ia.component.html",
  styleUrls: ["./actividad-ia.component.css"]
})
export class ActividadIAComponent implements OnInit {
  activarModalIncidencia: boolean = false;
  activarFormIncidencia: boolean = false;
  filtroIncidenciaForm: FormGroup;
  incidenciaForm: FormGroup;
  listaIncidencia: Observable<incidencias[]>;
  listaTipoIncidencias: Observable<tipoIncidencia[]>;
  fileUploadTemplate: any;
  incidenciaSeleccionada: incidencias;
  idIA: string;
  actualPagina: number = 1;
  accion: boolean = false;
  @BlockUI() blockUI: NgBlockUI;
  constructor(
    private fileService: FileService,
    private messageService: MessagingService,
    private router: ActivatedRoute,
    private tipoIncidenciaService: TipoIncidenciaService,
    private incidenciaService: IncidenciaService,
    private sendMessageService: SendMessageService
  ) {}

  ngOnInit() {
    this.startBlock();

    this.incidenciaForm = new FormGroup({
      detalle: new FormControl("", Validators.required),
      tipoIncidencia: new FormControl("", Validators.required),
      files: new FormControl("", Validators.required),
      id: new FormControl()
    });
    this.filtroIncidenciaForm = new FormGroup({
      fecha_registro: new FormControl(
        FunctionsBasics.getCurrentDate(),
        Validators.required
      ),
      categoria: new FormControl()
    });
    this.listaTipoIncidencias = this.tipoIncidenciaService.getAllTipoIncidencia();
    this.fileUploadTemplate = new FileUploadWithPreview("template");
    this.router.params.subscribe(parametro => (this.idIA = parametro.idIndice));
    this.listaIncidencia = this.incidenciaService.getAllIncidenciafindIdtipoReferencia(
      this.idIA
    );
    this.listaIncidencia.subscribe(resues => {
      this.stopBlock();
    });
  }

  toggleModalIncidencia() {
    this.activarModalIncidencia = !this.activarModalIncidencia;
  }
  toggleAccion() {
    this.accion = !this.accion;
  }
  toggleFormIncidencia() {
    this.activarFormIncidencia = !this.activarFormIncidencia;
  }
  setIncidencia(incidencia: incidencias) {
    this.incidenciaSeleccionada = incidencia;
  }
  consultarFiltroIncidenciaDate(form) {
    this.startBlock();
    this.listaIncidencia = this.incidenciaService.getAllIncidenciasFindDate(
      form.fecha_registro
    );
    this.listaIncidencia.subscribe(() => {
      this.stopBlock();
    });
  }
  nuevaIncidencia() {
    this.incidenciaSeleccionada = null;
    this.accion = true;
    this.incidenciaForm.get("files").setValidators([Validators.required]);
    this.incidenciaForm.get("files").updateValueAndValidity();
  }
  deleteImagenIncidencia(fotoParametro: file) {
    sweetAlertMensaje
      .getMensajeDelete("¿Esta seguro de eliminar la foto?")
      .then(respuesta => {
        if (respuesta.value) {
          this.incidenciaSeleccionada.urlListOfPhotos.find(
            foto => fotoParametro.id == foto.id
          ).estado = false;
          this.incidenciaService.updateFotoIncidencia(
            this.incidenciaSeleccionada
          );
          this.toggleFormIncidencia();
        }
      });
  }
  clearPreventView() {
    if (this.fileUploadTemplate.cachedFileArray.length > 0) {
      this.fileUploadTemplate.cachedFileArray = [];
      this.fileUploadTemplate.clearImagePreviewPanel();
    }
  }
  saveAndEditIncidencia(incidencia: incidencias) {
    this.startBlock();
    if (incidencia.id != null && this.incidenciaSeleccionada) {
      this.incidenciaSeleccionada.detalle = incidencia.detalle;
      this.incidenciaSeleccionada.tipoIncidencia = incidencia.tipoIncidencia;
      this.uploadImagen().subscribe({
        next: file => {
          this.incidenciaSeleccionada.urlListOfPhotos.push(file);
        },
        error: error => console.log(error),
        complete: () => {
          this.incidenciaService
            .updateIncidencia(this.incidenciaSeleccionada)
            .subscribe(async respuesta => {
              await this.stopBlock();
              this.toggleFormIncidencia();
            });
        }
      });
    } else {
      incidencia.latitud = sessionStorage.getItem(
        FunctionsBasics.nombreLatitud
      );
      incidencia.persona = JSON.parse(sessionStorage.getItem("personaLoged"));
      incidencia.idTipoReferencia = this.idIA;
      incidencia.tipoReferencia = "indice";
      incidencia.longitud = sessionStorage.getItem(
        FunctionsBasics.nombreLongitud
      );
      incidencia.fecha_realizacion = firebase.firestore.Timestamp.now();
      incidencia.fecha_registro = firebase.firestore.Timestamp.now();
      incidencia.estado = true;
      incidencia.urlListOfPhotos = new Array<file>();
      this.uploadImagen().subscribe({
        next: file => incidencia.urlListOfPhotos.push(file),
        error: error => console.log(error),
        complete: () => {
          incidencia.fecha_registro = firebase.firestore.Timestamp.now();
          this.incidenciaService
            .setIncidenciaFindIA(this.idIA, incidencia)
            .then(async documento => {
              console.log("entro a la crecion de a incidencian");
              const titleNotification =
                "Nueva Incidencia " + incidencia.detalle;
              const bodyNotification =
                "La incidencia tiene un grado " +
                incidencia.tipoIncidencia.tipo;
              const data = {
                lt: incidencia.latitud,
                ln: incidencia.longitud,
                urlImage: incidencia.urlListOfPhotos[0].url
              };
              this.sendMessageService.sendMessagingDevices(
                bodyNotification,
                titleNotification,
                data,
                incidencia.persona
              );
              this.toggleFormIncidencia();
              await this.stopBlock();
            });
        }
      });
    }
  }
  uploadImagen(): Observable<any> {
    return from(
      this.fileUploadTemplate.cachedFileArray &&
        this.fileUploadTemplate.cachedFileArray.length > 0
        ? this.fileUploadTemplate.cachedFileArray
        : []
    ).pipe(
      take(this.fileUploadTemplate.cachedFileArray.length),
      flatMap((file: File) =>
        this.fileService.uploadFile(file, Colecciones.incidencias)
      )
    );
  }

  startBlock() {
    this.blockUI.start();
  }

  stopBlock() {
    this.blockUI.stop();
  }
  editIncidencia() {
    this.accion = false;
    this.incidenciaForm.get("files").clearValidators();
    this.incidenciaForm.get("files").updateValueAndValidity();
    this.incidenciaForm.patchValue({
      detalle: this.incidenciaSeleccionada.detalle,
      id: this.incidenciaSeleccionada.id
    });
    this.incidenciaForm.get("tipoIncidencia").patchValue({
      id: this.incidenciaSeleccionada.tipoIncidencia.id
    });
  }
  compareTipoIncidencia(incidencia1: any, incidencia2: any) {
    return incidencia1 && incidencia2
      ? incidencia1.id === incidencia2.id
      : incidencia1 === incidencia2;
  }
  eliminarIncidencia() {
    sweetAlertMensaje
      .getMensajeDelete("Desea eliminar la incidencia")
      .then(respuesta => {
        if (respuesta.value) {
          this.incidenciaSeleccionada.estado = false;
          this.incidenciaService.updateEstadoIncidencia(
            this.incidenciaSeleccionada
          );
        }
      });
  }
  resetFormIncidencia() {
    this.incidenciaForm.reset();
  }
}
