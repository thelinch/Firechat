import Swal from 'sweetalert2'
export class sweetAlertMensaje {
  static getMensajeTransaccionExitosa() {
    return Swal({
      title: "Operacion Exitosa",
      position: "top-end",
      type: "success",
      timer: 2000,
      showConfirmButton: false
    })
  }
  static getMensajeTransaccionErronea(error: string) {
    return Swal({
      title: "Error",
      type: "error",
      text: error,
      showConfirmButton: true
    })
}
  static getMensajeLogin() {
  return Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,

  })
}
  static getMessageInfo(title: string, html: any) {
  return Swal({
    title: title,
    type: "info",
    html: html,
    showCancelButton: true
  })
}


}
