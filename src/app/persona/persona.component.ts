

import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { persona } from '../modelos/persona';
import { incidencias } from '../modelos/incidencias';
import { IncidenciaService } from '../services/incidencia.service';
import { Observable } from 'rxjs';

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

export class PersonaComponent implements OnInit {
  personaLogeada: Observable<persona>
  activarNavBar: boolean = false
  listaIncidenciaCritco = new Array<incidencias>();
  colorMolienda = "#7b1fa2";

  /**
   *Creates an instance of PersonaComponent.
   * @param {PersonaService} personaService
   * @param {IncidenciaService} incidenciaService
   * @memberof PersonaComponent
   */
  constructor(private personaService: PersonaService, private incidenciaService: IncidenciaService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getPersonFindId();

    }, 1000)

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
    this.personaLogeada = this.personaService.getPersonaFindId("8e7UM1jYSu5DsNle827L")
  }

}
