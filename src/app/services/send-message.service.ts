import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class SendMessageService {
  private urlControlador = "https://api.appecc.tk/api/";
  constructor(private _http: HttpClient) {}
  sendMessagingDevices(message, title, data, user) {
    let notification = {
      messageBody: message,
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
    this._http
      .post(this.urlControlador + "registerAndUpdateTokenUser", data)
      .subscribe();
  }
}
