import { Component, OnInit, ViewChild } from '@angular/core';
import { IncidenciaService } from 'src/app/services/incidencia.service';
import { Observable } from 'rxjs';
import { incidencias } from 'src/app/modelos/incidencias';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LatLngLiteral, GoogleMapsAPIWrapper } from '@agm/core';
import { area } from 'src/app/modelos/area';
import { AreaService } from 'src/app/services/area.service';
import { google } from '@agm/core/services/google-maps-types';
import { IndiceService } from 'src/app/services/indice.service';
import { async } from '@angular/core/testing';
import { indice } from './../../modelos/indice';
import { take, map } from 'rxjs/operators';
import * as $ from "jquery"
import { sweetAlertMensaje } from 'src/app/HelperClass/SweetAlertMensaje';
import { resultado } from 'src/app/modelos/resultadoICA';
import { ResultadoService } from 'src/app/services/resultado.service';
import { persona } from 'src/app/modelos/persona';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {
  latitudCenter: number = -9.5504168
  longitudCenter: number = -77.0543888
  listaIncidencia: Observable<incidencias[]>
  listArea: Observable<area[]>
  listIndice: Array<indice> = new Array<indice>()
  listResultIncumplidoICA: Observable<resultado[]>
  personaSeleccionada: persona
  activadModalPersona: boolean = false;
  constructor(private incidenciaService: IncidenciaService, private resultadoService: ResultadoService, private indiceService: IndiceService, private areaService: AreaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listaIncidencia = this.incidenciaService.getAllIncidencias()
    this.listArea = this.areaService.getAllarea()
    this.listResultIncumplidoICA = this.resultadoService.getAllParametroResultadoIncumplido()
  }


  clickPoligono(idArea: string) {
    console.log("click")
    this.router.navigate(["../dashboard"], { relativeTo: this.route })
  }
  incidencia(evento) {
    console.log(evento)
  }
  toggleModalPersona() {
    this.activadModalPersona = !this.activadModalPersona;
  }
  setPersona(persona: persona) {
    this.personaSeleccionada = persona;
  }
  async mostrarMensaje(idArea: string, nameArea: string) {
    let arrayIndice = new Array<indice>();
    let optionOutput = {}
    this.areaService.getAllIndiceFindAreaId(idArea).pipe(take(1)).pipe(take(1)).subscribe({
      next: listRef => {
        listRef.map(ref => {
          ref.get().then(indiceRef => {
            const indice = indiceRef.data() as indice;
            indice.id = indiceRef.id
            arrayIndice.push(indice)
          })

        })

      },
      complete: () => {
        Swal({
          title: nameArea,
          input: 'select',
          inputClass: "listaIndice",
          inputOptions: {
            0: "PMAO",
            1: "ICA",
            3: "IA"
          },
          inputPlaceholder: 'Selecciona una opcion',
          showCancelButton: true,

        }).then(respuesta => {
          if (respuesta["value"] != null && respuesta["value"] != "") {
            let opcionSweet: string = $("select.listaIndice option:selected").text();
            let indiceSeleccionada: indice = arrayIndice.find(indice => indice.nombre == opcionSweet);
            if (indiceSeleccionada) {
              this.router.navigate(["indice", indiceSeleccionada.id, opcionSweet, "actividades"], { relativeTo: this.route.parent })
            } else {
              sweetAlertMensaje.getMensajeTransaccionErronea("LA SELECCION NO EXISTE")
            }
          }
        })
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
    })

  }

}
