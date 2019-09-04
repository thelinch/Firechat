import { Component, OnInit, OnDestroy, ElementRef } from "@angular/core";
import { PersonaService } from "../services/persona.service";
import { persona } from "../modelos/persona";
import { incidencias } from "../modelos/incidencias";
import { IncidenciaService } from "../services/incidencia.service";
import { Observable, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { NgxPermissionsService } from "ngx-permissions";
import { AuthService } from "../services/auth.service";
import { sweetAlertMensaje } from "../HelperClass/SweetAlertMensaje";
import * as $ from "jquery";
import { FunctionsBasics } from "src/app/HelperClass/FunctionBasics";
import { MessagingService } from "../services/messaging.service";
/**
 *
 *
 * @export
 * @class PersonaComponent
 * @implements {OnInit}
 */
@Component({
  selector: "app-persona",
  templateUrl: "./persona.component.html",
  styleUrls: ["./persona.component.css"]
})
export class PersonaComponent implements OnInit {
  personaLogeada: Observable<persona>;
  activarNavBar: boolean = false;
  listaIncidenciaCritco = new Array<incidencias>();
  colorMolienda = "#7b1fa2";
  Subscription: Subscription;
  idPerson: string;
  listIncidenciaNotificacion: Observable<incidencias[]>;
  message;

  /**
   *Creates an instance of PersonaComponent.
   * @param {PersonaService} personaService
   * @param {IncidenciaService} incidenciaService
   * @memberof PersonaComponent
   */

  constructor(
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private incidenciaService: IncidenciaService,
    private activatedRouter: ActivatedRoute,
    private permissionsService: NgxPermissionsService,
    private messagingService: MessagingService
  ) {
    navigator.geolocation.getCurrentPosition(position => {
      sessionStorage.setItem(
        FunctionsBasics.nombreLatitud,
        position.coords.latitude.toString()
      );
      sessionStorage.setItem(
        FunctionsBasics.nombreLongitud,
        position.coords.longitude.toString()
      );
    });
  }

  ngOnInit() {
    const userLoged = JSON.parse(
      sessionStorage.getItem("personaLoged")
    ) as persona;
    this.messagingService.requestPermission(userLoged);
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe(payload => {
      FunctionsBasics.getToast("nuevo mensaje" + payload.data.user);
    });
    this.activatedRouter.params.subscribe(params => {
      this.idPerson = params["id"];
    });
    this.getPersonFindId();
    //if (this.permissionsService.hasPermission("JEFE")) {
    this.listIncidenciaNotificacion = this.incidenciaService.getAllIncidencias();
    //}
  }

  /**
   *
   *
   * @memberof PersonaComponent
   */
  onlogout() {
    this.authService.logout().subscribe(respuesta => {
      if (respuesta) {
        this.router
          .navigateByUrl("/login", { relativeTo: this.route.parent })
          .then(() => {
            sweetAlertMensaje.getMensajeTransaccionExitosa();
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }
  toggleNavBar() {
    this.activarNavBar = !this.activarNavBar;
  }

  getItemsNotificacion(elemento: ElementRef) {
    $(elemento).slideToggle("slow");
  }
  getPersonFindId() {
    // tslint:disable-next-line:no-shadowed-variable
    this.personaLogeada = this.personaService.getPersonaFindId(this.idPerson);
    this.personaLogeada.subscribe(personPersmissions => {
      sessionStorage.setItem(
        "personaLoged",
        JSON.stringify(personPersmissions)
      );
      this.permissionsService.loadPermissions([
        personPersmissions.tipoPersona.nombre
      ]);
    });
  }
}
