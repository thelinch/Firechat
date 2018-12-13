import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../services/persona.service';
import { persona } from '../modelos/persona';
import { incidencias } from '../modelos/incidencias';
import { IncidenciaService } from '../services/incidencia.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  personaLogeada: persona
  activarNavBar: boolean = false
  listaIncidenciaCritco = new Array<incidencias>();
  colorMolienda = "#7b1fa2";
  constructor(private personaService: PersonaService, private incidenciaService: IncidenciaService) { }

  ngOnInit() {
    setTimeout(() => {
      this.getPersonFindId();

    }, 1000)

  }
  toggleNavBar() {
    this.activarNavBar=!this.activarNavBar;
  }
  getIncidenciaCriticas(idArea: string) {
    this.incidenciaService.getAllIncidenciaFinIdArea(idArea);
  }
  getPersonFindId() {
    // tslint:disable-next-line:no-shadowed-variable
    this.personaService.getPersonaFindId("8e7UM1jYSu5DsNle827L").subscribe(persona => {
      this.personaLogeada = persona
      console.log(this.personaLogeada.tipoPersona.nombre)
      console.log(this.personaLogeada.area.id)
      if (this.personaLogeada.tipoPersona.nombre == "gerente") {
        console.log("enreo al if del gerente")
        this.getIncidenciaCriticas(this.personaLogeada.area.id);

      }
    });
  }

}
