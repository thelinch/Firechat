export class FunctionsBasics {
  static valueEficiencyOne: number = 0.1;
  static valueEficiencyTwo: number = 0.9
  static nombreLatitud: string = "latitud"
  static nombreLongitud: string = "longitud"
  static openModal(variable: boolean): boolean {
    console.log("entro al modal")
    variable = true;
    return variable
  }
  static closeModal(variable: boolean): boolean {
    variable = false;
    return variable;
  }
  static getCurrentDate(): string {

    var fecha = new Date();
    let mes: number | string = fecha.getMonth() + 1
    let dia: number | string = fecha.getDate()
    var año = fecha.getFullYear()
    if (dia < 10)
      dia = '0' + dia;
    if (mes < 10)
      mes = '0' + mes
    return año + "-" + mes + "-" + dia


  }
}
