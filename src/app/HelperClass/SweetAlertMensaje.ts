import Swal from "sweetalert2";
export class sweetAlertMensaje {
  static getMensajeTransaccionExitosa() {
    return Swal({
      title: "Operacion Exitosa",
      position: "top-end",
      type: "success",
      timer: 2000,
      showConfirmButton: false
    });
  }
  static getMensajeTransaccionErronea(error: string) {
    return Swal({
      title: "Error",
      type: "error",
      text: error,
      showConfirmButton: true
    });
  }
  static getMensajeLogin() {
    return Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000
    });
  }
  static getMensajeDelete(title: string) {
    return Swal({
      title: title,
      type: "warning",
      showCancelButton: true
    });
  }
  static getMessageInfo(title: string, html: any) {
    return Swal({
      title: title,
      type: "info",
      html: html,
      showCancelButton: true
    });
  }
  static getMessageNotifiction(title: string, body, url, urlImage) {
    return Swal({
      type: "warning",
      html: `
      <h1>${title}</h1>
      <img src=${urlImage}/>
      <a href=${url}>Go!</a>`
    });
  }
}
