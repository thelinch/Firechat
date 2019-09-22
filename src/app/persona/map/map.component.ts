import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { IncidenciaService } from "src/app/services/incidencia.service";
import { Observable } from "rxjs";
import { incidencias } from "src/app/modelos/incidencias";
import { ActivatedRoute, Router, Params } from "@angular/router";
import Swal from "sweetalert2";
import { area } from "src/app/modelos/area";
import { AreaService } from "src/app/services/area.service";
import { IndiceService } from "src/app/services/indice.service";
import { indice } from "./../../modelos/indice";
import { take, map, filter } from "rxjs/operators";
import * as $ from "jquery";
import { sweetAlertMensaje } from "src/app/HelperClass/SweetAlertMensaje";
import { resultado } from "src/app/modelos/resultadoICA";
import { ResultadoService } from "src/app/services/resultado.service";
import { persona } from "src/app/modelos/persona";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  latitudCenter: number = -9.211581;
  longitudCenter: number = -75.984001;
  zoom = 16;
  listaIncidencia: Observable<incidencias[]>;
  listArea: Observable<area[]>;
  listIndice: Array<indice> = new Array<indice>();
  listResultIncumplidoICA: Observable<resultado[]>;
  personaSeleccionada: persona;
  activadModalPersona: boolean = false;
  constructor(
    private incidenciaService: IncidenciaService,
    private resultadoService: ResultadoService,
    private indiceService: IndiceService,
    private areaService: AreaService,
    private router: Router,
    private route: ActivatedRoute,
    private activedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.listaIncidencia = this.incidenciaService.getAllIncidencias();
    this.listArea = this.areaService.getAllarea();
    this.listResultIncumplidoICA = this.resultadoService.getAllParametroResultadoIncumplido();
    this.activedRouter.queryParams
      .pipe(filter(params => !!params))
      .subscribe((params: Params) => {
        if (params.lt != undefined && params.ln != undefined) {
          console.log("enro", params.lt, params.ln);

          this.latitudCenter = parseFloat(params.lt);

          this.longitudCenter = parseFloat(params.ln);
          this.zoom = 16;
        }
      });
  }

  toggleModalPersona() {
    this.activadModalPersona = !this.activadModalPersona;
  }
  setPersona(persona: persona) {
    this.personaSeleccionada = persona;
  }
  async mostrarMensaje(idArea: string, nameArea: string) {
    let arrayIndice = new Array<indice>();
    let optionOutput = {};
    this.areaService
      .getAllIndiceFindAreaId(idArea)
      .pipe(take(1))
      .pipe(take(1))
      .subscribe({
        next: listRef => {
          listRef.map(async ref => {
            const dataIndice = await ref.get();
            const indice = dataIndice.data() as indice;
            indice.id = dataIndice.id;
            arrayIndice.push(indice);
          });
        },
        complete: () => {
          Swal({
            title: nameArea,
            input: "select",
            inputClass: "listaIndice",
            inputOptions: {
              0: "PMAO",
              1: "ICA",
              3: "IA"
            },
            inputPlaceholder: "Selecciona una opcion",
            showCancelButton: true
          }).then(respuesta => {
            if (respuesta["value"] != null && respuesta["value"] != "") {
              let opcionSweet: string = $(
                "select.listaIndice option:selected"
              ).text();
              let indiceSeleccionada: indice = arrayIndice.find(
                indice => indice.nombre == opcionSweet
              );
              if (indiceSeleccionada) {
                this.router.navigate(
                  ["indice", indiceSeleccionada.id, opcionSweet, "actividades"],
                  { relativeTo: this.route.parent }
                );
              } else {
                sweetAlertMensaje.getMensajeTransaccionErronea(
                  "LA SELECCION NO EXISTE"
                );
              }
            }
          });
        }

        /* this.indiceService.getallIndiceFindIdArea(idArea).pipe(take(1)).subscribe({
         next: listIndiceRef => {
           listIndiceRef.forEach(indice => {
             indice.then(indiceData => {
               let indice = indiceData.data() as indice
               indice.id = indiceData.id
               console.log(indice)
               optionOutput[indice.id] = indice.nombre
              })
            })
         },
         complete: () => {

         }

       })*/
      });
  }
  ocultarLeyendaTogle(elemento: ElementRef) {
    $(elemento).parent();
    $(elemento)
      .detach()
      .appendTo("#prueba");
    $("#prueba").css("display", "block");
    if ($("#prueba2").is(":hidden")) {
      $("#prueba2").show("slow");
      $("#boton").slideUp();
      $(elemento)
        .detach()
        .appendTo("#prueba2");
      $("#prueba").css("display", "none");
    } else {
      $("#prueba2").slideUp();
    }
  }
}
