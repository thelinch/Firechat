import { PersonaService } from "./persona.service";
import { Injectable } from "@angular/core";
import * as firebase from "firebase";
import { AngularFireDatabase } from "@angular/fire/database";
import { AngularFireAuth } from "angularfire2/auth";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { BehaviorSubject } from "rxjs";
import { take } from "rxjs/operators";
import { persona } from "../modelos/persona";
import { incidencias } from "../modelos/incidencias";

@Injectable()
export class MessagingService {
  messaging = firebase.messaging();
  currentMessage = new BehaviorSubject(null);
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private angularFireAuth: AngularFireAuth,
    private angularFireDB: AngularFireDatabase,
    private http: HttpClient,
    private personaService: PersonaService
  ) {}
  updateToken(user: persona, token) {
    // we can change this function to request our backend service
    this.angularFireAuth.authState.pipe(take(1)).subscribe(() => {
      const data = {};
      user.token = token;
      console.log("USER ", user, "token", token);
      this.personaService.update(user);
    });
  }
  requestPermission(userId) {
    this.angularFireMessaging.requestToken.subscribe(
      token => {
        console.log(token);
        localStorage.setItem("tokenNotification", token);
        this.updateToken(userId, token);
      },
      err => {
        console.error("Unable to get permission to notify.", err);
      }
    );
  }
  sentMessage(message, incidencia: incidencias) {
    let header = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set(
        "Authorization",
        "key=AAAAn8cp8Tk:APA91bEU3ZrDGTkbW7RrLJCwavvpSJo8UOqWk2x90OmlI6rlFy6UAM4StNpIWgUZ_-Vz541_zLohiAU38GsViLaCHn7btSgKLBCX4Cteol0c-G3RFaoOPHj2y3oyZhOFGDy5x2tdfgfb7PAfpSzMl0DttXbGAP1f1g"
      );
    let notification = {
      title: "APPQC",
      body: message,
      click_action:
        "localhost:4200/persona/ZLrWK5DXkP5s296ZeXkW/area/D8a5UgSogRhTreAED5BG/map",
      data: {
        landing_page: "second",
        incidencia: incidencia.tipoIncidencia.tipo,
        user: JSON.parse(sessionStorage.getItem("personaLoged")).nombre
      },
      to: localStorage.getItem("tokenNotification")
    };
    this.http
      .post("https://fcm.googleapis.com/fcm/send ", notification, {
        headers: header
      })
      .subscribe();
  }
  receiveMessage() {
    this.messaging.onMessage(payload => {
      this.currentMessage.next(payload);
    });
  }
}
