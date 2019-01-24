import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { persona } from "../modelos/persona";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PersonaService } from "../services/persona.service";
@Injectable()
export class PersonaResolver implements Resolve<persona> {
    constructor(private personaService: PersonaService) { }
    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<persona> {
        return this.personaService.getPersonaFindId(route.params.id);
    }
}