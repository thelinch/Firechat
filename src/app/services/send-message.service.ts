import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SendMessageService {
  private urlControlador = "http://157.230.208.35:8042/api/";
  constructor(private _http: HttpClient) {}
  sendMessagingDevices(message, title, data, user) {
    let notification = {
      message: message,
      title: title,
      data: data,
      user: user
    };
    this._http
      .post(this.urlControlador + "sendMessaging", notification)
      .subscribe();
  }
  registeredAndUpdateToken(userLoged) {
    let data = {
      user: userLoged
    };
    console.log(userLoged);
    this._http
      .post(this.urlControlador + "registerAndUpdateTokenUser", data)
      .subscribe();
  }
}
