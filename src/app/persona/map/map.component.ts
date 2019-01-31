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
import { take } from 'rxjs/operators';

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
  constructor(private incidenciaService: IncidenciaService, private indiceService: IndiceService, private areaService: AreaService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.listaIncidencia = this.incidenciaService.getAllIncidencia()
    this.listArea = this.areaService.getAllarea()

  }


  clickPoligono(idArea: string) {
    console.log("click")
    this.router.navigate(["../dashboard"], { relativeTo: this.route })
  }
  incidencia(evento) {
    console.log(evento)
  }
  async mostrarMensaje(idArea: string, nameArea: string) {
    let optionOutput = {}
    console.log(idArea)
    let promise = this.areaService.getAllIndiceFindAreaId(idArea, this.listIndice).pipe(take(1))

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
       Swal({
         title: nameArea,
         input: 'select',
         inputOptions: optionOutput,
         inputPlaceholder: 'Selecciona una opcion',
         showCancelButton: true,

       }).then(respuesta => {
         console.log(respuesta.value)
         optionOutput = {}
       })
     }

   })*/
}
}
