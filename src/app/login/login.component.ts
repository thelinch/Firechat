import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { sweetAlertMensaje } from '../HelperClass/SweetAlertMensaje';
import { PersonaService } from './../services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup
  emailLoged: string
  constructor(private authService: AuthService, private personaService: PersonaService, private router: Router) { }

  ngOnInit() {
    this.authService.logout()
    this.user = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("", Validators.compose([Validators.required]))
    })
    this.authService.getAuth().auth.onAuthStateChanged(userLoged => {
      if (userLoged) {
        this.emailLoged = userLoged.email

      }
    })
  }
  logIn() {
    this.authService.onLogin(this.user.get("email").value, this.user.get("password").value).then(re => {
      if (this.emailLoged) {
        this.personaService.getPersonaFindCorreo(this.authService.getAuth().auth.currentUser.email).subscribe(persona => {
          sweetAlertMensaje.getMensajeTransaccionExitosa();
          this.router.navigateByUrl("/persona/" + persona[0].id + "/area/" + persona[0].area.id + "/map")
        })
      }

    }).catch((error) => {
      sweetAlertMensaje.getMensajeTransaccionErronea(error);
    })
  }


}

