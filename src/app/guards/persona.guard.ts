import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { PersonaService } from '../services/persona.service';

@Injectable({
  providedIn: 'root'
})
export class PersonaGuard implements CanActivate {
  constructor(private authService: AuthService, private personaService: PersonaService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let userLoged = this.authService.getCurrentUser()
    if (userLoged) {
      return true
    }
    this.router.navigate(["/"])
    return false;
  }
}
