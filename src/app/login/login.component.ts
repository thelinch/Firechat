import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { sweetAlertMensaje } from '../HelperClass/SweetAlertMensaje';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup
  email: string
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl("", Validators.compose([Validators.required, Validators.email])),
      password: new FormControl("", Validators.compose([Validators.required]))
    })
    this.authService.logout().then(() => {
      console.log("logout")
    })
    this.authService.getAuth().auth.onAuthStateChanged(s => {
      if (s) {

        this.email = s.email

      }
    })
  }
  logIn() {
    this.authService.onLogin(this.user.get("email").value, this.user.get("password").value).then(re => {
      sweetAlertMensaje.getMensajeTransaccionExitosa()
    }).catch((error) => {
      sweetAlertMensaje.getMensajeTransaccionErronea(error)
    })
  }


}

