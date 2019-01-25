

import { Component, OnInit, OnDestroy } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { persona } from '../modelos/persona';
import { incidencias } from '../modelos/incidencias';
import { IncidenciaService } from '../services/incidencia.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';

/**
 *
 *
 * @export
 * @class PersonaComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})

export class PersonaComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
  personaLogeada: Observable<persona>
  activarNavBar: boolean = false
  listaIncidenciaCritco = new Array<incidencias>();
  colorMolienda = "#7b1fa2";
  Subscription: Subscription
  idPerson: string;
  /**
   *Creates an instance of PersonaComponent.
   * @param {PersonaService} personaService
   * @param {IncidenciaService} incidenciaService
   * @memberof PersonaComponent
   */
  constructor(private personaService: PersonaService, private incidenciaService: IncidenciaService, private router: ActivatedRoute, private permissionsService: NgxPermissionsService) { }

  ngOnInit() {
    console.log("se inicio")
    if (!this.idPerson) {
      this.router.params.subscribe(params => {
        this.idPerson = params["id"]
      })
    }
    this.getPersonFindId();
  }

  /**
   *
   *
   * @memberof PersonaComponent
   */
  toggleNavBar() {
    this.activarNavBar = !this.activarNavBar;
  }
  getIncidenciaCriticas(idArea: string) {
    this.incidenciaService.getAllIncidenciaFinIdArea(idArea);
  }


  getPersonFindId() {
    // tslint:disable-next-line:no-shadowed-variable
    this.personaLogeada = this.personaService.getPersonaFindId(this.idPerson)
    this.personaLogeada.subscribe(personPersmissions => {
      this.permissionsService.loadPermissions([personPersmissions.tipoPersona.nombre])
    })
  }

}
