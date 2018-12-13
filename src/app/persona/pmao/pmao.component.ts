import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { timingSafeEqual } from 'crypto';
import { ActividadPmaoService } from 'src/app/services/actividad-pmao.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pmao',
  templateUrl: './pmao.component.html',
  styleUrls: ['./pmao.component.css']
})
export class PmaoComponent implements OnInit {
  opcionSeleccionado: any;
  activarModalFormPMAO: boolean = false
  activarModalFormEjecucion: boolean = false
  listaAspectosAmbientales = [
    {
      nombre: "RIESGO E IMPACTO EN EL AGUA",
      opciones: [
        { nombre: "Uso de agua superficial" },
        { nombre: "Uso de agua subterranea" },
        { nombre: "Descargas de agua al mar (Efluentes)" },
        { nombre: "Descargas de agua a rios y quebradas (Efluentes)" },
        { nombre: "Descargas a pozos subterraneos (Acuiferos)" },
        { nombre: "Potencial de contacto con el nivel freatico" },
        { nombre: "Generacion de lodos y sedimentos (movimiento de tierra, cruces en cuerpos de agua, etc)" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN AIRE",
      opciones: [
        { nombre: "Generacion de polvo (Uso de vias no pavimentadas)" },
        { nombre: "Generacion de gases / humos / olores" },
        { nombre: "Generacion de ruido" },
        { nombre: "Generacion de vibraciones" },
        { nombre: "Potencial impacto en una estacion de calidad de aire (Indicar cuales)" },
        { nombre: "Uso de equipos con fuerte radioactividad" },
        { nombre: "Uso de equipos con fuerte radiacion no ionizante (Antenas de radio, ceular, lineas electricas)" },
        { nombre: "Consumo de energia electrica (cambio climatico)" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN BIOLOGIA Y RECURSOS NATURALES",
      opciones: [
        { nombre: "Perturbacion o disturbacion de cobertura vegetal (Colles, quenuales, pastos, etc)" },
        { nombre: "Perturbacion o disturbacion de habitats acuaticos o terrestres" },
        { nombre: "Reubicacion de especies de flora y fauna" },
        { nombre: "Consumo de papel" },
        { nombre: " Consumo de hidrocarburos" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN SUELOS",
      opciones: [
        { nombre: "Generacion de suelos organico (Retiro de Top soil)" },
        { nombre: "Generacion de material inerte" },
        { nombre: "Uso de canteras internas (autorizadas)" },
        { nombre: "Generacion de erosion" },
        { nombre: "Agregar otros +" },
      ]

    },
    {
      nombre: "RIESGO E IMPACTO EN DESMONTES",
      opciones: [
        { nombre: " Uso de desmonte para actividades como lastrado (indicar clase)" },
        { nombre: "Uso de suelos organico" },
        { nombre: "Agregar otros +" },
      ]
    },
    {
      nombre: "RIESGO E IMPACTO EN RESIDUOS",
      opciones: [
        { nombre: "Generacion de residuos peligrosos" },
        { nombre: "Generacion de residuos no peligrosos" },
        { nombre: " Uso de insumos quimicos fiscalizados" },
        { nombre: "Uso de insumos quimicos / reactivos" },
        { nombre: "Uso de baños (portatiles u otros)" },
        { nombre: "Potencial derrame de hidrocarburos (transporte / almacenamiento y/o abastecimiento)" },
        { nombre: "Potencial derrame de productos quimicos / reactivos (Transporte / almacenamiento y/o abastecimiento)" },
        { nombre: "Agregar otros +" },
      ]

    },

    {
      nombre: "RIESGO E IMPACTO POR INFRAESTRUCTURA Y EQUIPAMIENTO",
      opciones: [
        { nombre: "Uso de talleres temporales" },
        { nombre: "Uso de instalaciones temporales (campamento / almacenes / oficinas)" },
        { nombre: " Uso de equipos pesados y/o auxiliares" },
        { nombre: "Agregar otros +" },
      ]

    },

    {
      nombre: "RIESGO E IMPACTO POR FUERA DE LA PROPIEDAD",
      opciones: [
        { nombre: "Ejecucion de actividades fuera del limite de propiedad" },
        { nombre: "Comunicaciones a las pobaciones vecinas, comunidades y/o autoridades locales" },
        { nombre: "Contratacion de personal local" },
        { nombre: "Agregar otros +" },
      ]

    },
    {
      nombre: "AGREGAR OTROS ",
      opciones: [

        { nombre: "Agregar otros +" },
      ]

    }
  ]






  serveridadLista = [
    { item: "CATASTROFICO", valor: 1 },
    { item: "FATALIDAD", valor: 2 },
    { item: "PERMANENTE", valor: 3 },
    { item: "TEMPORAL", valor: 4 },
    { item: "MENOR", valor: 5 }
  ]

  frecuenciaLista = [
    { item: "COMUN", valor: 1 },
    { item: "HA SUCEDIDO", valor: 2 },
    { item: "PODRIA SUCEDER", valor: 3 },
    { item: "RARO QUE SUCEDA", valor: 4 },
    { item: "IMPOSIBLE QUE SUCEDA", valor: 5 }
  ]


  significanciLista = [

    { item: "Positivo", valor: 1, icon: "(+)" },
    { item: "Negativo", valor: -1, icon: "(-)" },

  ]


  matrizIper = [
    { frecuencia: 1, severidad: 5, valor: 15 },
    { frecuencia: 1, severidad: 4, valor: 10 },
    { frecuencia: 1, severidad: 3, valor: 6 },
    { frecuencia: 1, severidad: 2, valor: 3 },
    { frecuencia: 1, severidad: 1, valor: 1 },
    { frecuencia: 2, severidad: 5, valor: 19 },
    { frecuencia: 2, severidad: 4, valor: 14 },
    { frecuencia: 2, severidad: 3, valor: 3 },
    { frecuencia: 2, severidad: 2, valor: 5 },
    { frecuencia: 2, severidad: 1, valor: 2 },
    { frecuencia: 3, severidad: 5, valor: 22 },
    { frecuencia: 3, severidad: 4, valor: 18 },
    { frecuencia: 3, severidad: 3, valor: 13 },
    { frecuencia: 3, severidad: 2, valor: 8 },
    { frecuencia: 3, severidad: 1, valor: 4 },
    { frecuencia: 4, severidad: 5, valor: 24 },
    { frecuencia: 4, severidad: 4, valor: 21 },
    { frecuencia: 4, severidad: 3, valor: 17 },
    { frecuencia: 4, severidad: 2, valor: 12 },
    { frecuencia: 4, severidad: 1, valor: 7 },
    { frecuencia: 5, severidad: 5, valor: 25 },
    { frecuencia: 5, severidad: 4, valor: 23 },
    { frecuencia: 5, severidad: 3, valor: 20 },
    { frecuencia: 5, severidad: 2, valor: 16 },
    { frecuencia: 5, severidad: 1, valor: 11 }
  ]
  clasificacion = [
    { name: "ALTO", inicio: -1, fin: -8, color: "red" },
    { name: "Medio", inicio: -9, fin: -15, color: "yellow" },
    { name: "Bajo", inicio: -16, fin: -25, color: "green" },
    { name: "ALTO", inicio: 1, fin: 8, color: "teal" },
    { name: "Medio", inicio: 9, fin: 15, color: "blue" },
    { name: "Bajo", inicio: 16, fin: 25, color: "#c4bfbd" }]
  idIndice: string
  @ViewChild("clasificacion") clasificacionE: ElementRef
  listaActividades: Observable<any[]>
  constructor(private render: Renderer2, private pmaoService: ActividadPmaoService, private router: ActivatedRoute) { }
  seleccionarOpcion(opcion: any) {
    this.opcionSeleccionado = opcion;
  }
  ngOnInit() {
    this.router.params.subscribe(dataUrl => {
      this.idIndice = dataUrl.idIndice;
      this.getAllActividades(this.idIndice)
    })
  }
  evaluarImpacto(impacto: string) {

  }
  toogleFormEjecucion() {
    this.activarModalFormEjecucion = !this.activarModalFormEjecucion
  }
  calcularClasificacion(formulario) {
    if (formulario.Frecuencia !== undefined && formulario.Severidad !== undefined && formulario.Significancia !== undefined) {
      console.log(this.getRiesgoMatrizIper(formulario.Frecuencia.valor, formulario.Severidad.valor))
      this.getClasificacion(this.getRiesgoMatrizIper(formulario.Frecuencia.valor, formulario.Severidad.valor).valor, formulario.Significancia.valor)

    }
  }
  toggleModalFormularioPMAO() {
    this.activarModalFormPMAO = !this.activarModalFormPMAO
  }
  getAllActividades(idIndice) {
    this.listaActividades = this.pmaoService.getAllActividadPMAO(idIndice)
  }
  resetForm(form) {
    form.reset({ nombre: this.opcionSeleccionado.nombre })
  }
  getClasificacion(valor: number, significancia: number) {

    let significanciaValor;

    if (significancia > 0) {
      significanciaValor = this.clasificacion.find(cl => valor >= cl.inicio && valor <= cl.fin)

    } else {
      significanciaValor = this.clasificacion.find(cl => -1 * valor <= cl.inicio && -1 * valor >= cl.fin)
    }
    this.clasificacionE.nativeElement.value = significanciaValor.name
    this.render.setStyle(this.clasificacionE.nativeElement, "backgroundColor", significanciaValor.color)
  }

  getRiesgoMatrizIper(frecuencia: number, severidad: number): any {
    return this.matrizIper.find(i => i.frecuencia == frecuencia && i.severidad == severidad)
  }
  save(form) {
    this.pmaoService.saveActividadPMAO(this.idIndice, form.value).subscribe(respuesta => {
      if (respuesta) {
        this.toggleModalFormularioPMAO()
      }
    })
  }
}
