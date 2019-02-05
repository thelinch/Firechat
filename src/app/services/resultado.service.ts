import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentData } from 'angularfire2/firestore';
import { resultado } from '../modelos/resultadoICa';
import { Observable } from 'rxjs';
import { actividades } from '../modelos/actividades';
import { ActividadService } from './actividad.service';
import { parametro } from '../modelos/parametro';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {
  arrayRiesgo = [
    {
      parametro: "PM10",
      listaRiesgo: [
        {
          riesgo: "Muy Alto",
          valor: 1,
          rango: [{ inicio: 100, fin: 80 }]
        }, {
          riesgo: "ALTO",
          valor: 2,
          rango: [{ inicio: 80, fin: 60 }]
        }, {
          riesgo: "Medio",
          valor: 3,
          rango: [{ inicio: 60, fin: 40 }]
        }, {
          riesgo: "Bajo",
          valor: 4,
          rango: [{ inicio: 40, fin: 20 }]
        }, {
          riesgo: "Muy Bajo",
          valor: 5,
          rango: [{ inicio: 20, fin: 0 }]
        }],
    }, {
      parametro: "SO2",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [
          { inicio: 80, fin: 65 }]
      }, {
        riesgo: "ALTO", valor: 2, rango: [{
          inicio: 65,
          fin: 50
        }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{
          inicio: 50,
          fin: 30
        }, {
          riesgo: "Bajo",
          valor: 4,
          rango: [{
            inicio: 30,
            fin: 15
          }]
        }, {
          riesgo: "Muy Bajo",
          valor: 5,
          rango: [{
            inicio: 15,
            fin: 0
          }]
        }],

      }]
    }, {
      parametro: "NO2",
      listaRiesgo: [
        {
          riesgo: "Muy Alto",
          valor: 1,
          rango: [{ inicio: 200, fin: 160 }]
        }, {
          riesgo: "ALTO",
          valor: 2,
          rango: [{ inicio: 160, fin: 120 }]
        },
        {
          riesgo: "Medio",
          valor: 3,
          rango: [{ inicio: 120, fin: 80 }]
        }
        , {
          riesgo: "Bajo",
          valor: 4,
          rango: [{ inicio: 80, fin: 40 }]
        }, {
          riesgo: "Muy Bajo",
          valor: 5,
          rango: [{ inicio: 40, fin: 0 }]
        }],

    }
    , {
      parametro: "CO",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 10000, fin: 8000 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 8000, fin: 6000 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 6000, fin: 4000 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 4000, fin: 2000 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 2000, fin: 0 }]
      }],
    }, {
      parametro: "PM2.5",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [
          { inicio: 50, fin: 40 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 40, fin: 30 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 30, fin: 20 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 20, fin: 10 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 10, fin: 0 }]
      }],

    }, {
      parametro: "PH",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 9, fin: 8.7 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 8.7, fin: 8.4 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 8.4, fin: 8.1 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 8.1, fin: 7.8 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 7.8, fin: 0 }]
      }],
    }, {
      parametro: "T",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 35, fin: 28 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 28, fin: 21 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 21, fin: 14 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 14, fin: 7 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 7, fin: 0 }]
      }],
    }, {
      parametro: "TSS",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 50, fin: 40 }]
      },
      {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 40, fin: 30 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 30, fin: 20 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 20, fin: 10 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 10, fin: 0 }]
      }],
    }, {
      parametro: "DBO5",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 100, fin: 80 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 80, fin: 60 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 60, fin: 40 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 40, fin: 20 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 20, fin: 0 }]
      }]
    },
    {
      parametro: "Aceites y Grasas",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 20, fin: 16 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 16, fin: 12 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{ inicio: 12, fin: 8 }]
      },
      {
        riesgo: "Bajo",
        valor: 4,
        rango: [{ inicio: 8, fin: 4 }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{ inicio: 4, fin: 0 }]
      }],
    }, {
      parametro: "Coliformes Fecales",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [{ inicio: 10000, fin: 8000 }]
      }, {
        riesgo: "ALTO",
        valor: 2,
        rango: [{ inicio: 8000, fin: 6000 }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{
          inicio: 6000,
          fin: 4000
        }]
      }, {
        riesgo: "Bajo",
        valor: 4,
        rango: [{
          inicio: 4000,
          fin: 2000
        }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{
          inicio: 2000,
          fin: 0
        }]
      }],
    }, {
      parametro: "Horario Diurno",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [
          { inicio: 80, fin: 65 }]
      }, {
        riesgo: "ALTO", valor: 2, rango: [{
          inicio: 65,
          fin: 50
        }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{
          inicio: 50,
          fin: 30
        }]
      }, {
        riesgo: "Bajo",
        valor: 4,
        rango: [{
          inicio: 30,
          fin: 15
        }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{
          inicio: 15,
          fin: 0
        }]
      }],
    }, {
      parametro: "Horario Nocturno",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [
          { inicio: 70, fin: 55 }]
      }, {
        riesgo: "ALTO", valor: 2, rango: [{
          inicio: 55,
          fin: 40
        }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{
          inicio: 40,
          fin: 25
        }]
      }, {
        riesgo: "Bajo",
        valor: 4,
        rango: [{
          inicio: 25,
          fin: 10
        }]
      }, {
        riesgo: "Muy Bajo",
        valor: 5,
        rango: [{
          inicio: 10,
          fin: 0
        }]
      }],
    }, {
      parametro: "DBO5",
      listaRiesgo: [{
        riesgo: "Muy Alto",
        valor: 1,
        rango: [
          { inicio: 100, fin: 80 }]
      }, {
        riesgo: "ALTO", valor: 2, rango: [{
          inicio: 80,
          fin: 60
        }]
      },
      {
        riesgo: "Medio",
        valor: 3,
        rango: [{
          inicio: 60,
          fin: 40
        }, {
          riesgo: "Bajo",
          valor: 4,
          rango: [{
            inicio: 40,
            fin: 20
          }]
        }, {
          riesgo: "Muy Bajo",
          valor: 5,
          rango: [{
            inicio: 20,
            fin: 0
          }]
        }],

      }]
    }]

  constructor(private afs: AngularFirestore, private actividadService: ActividadService) { }
  getAllResultadoFindIdActividad(idActividad: string): Observable<DocumentData[]> {
    return this.afs.collection<resultado>("actividad").doc(idActividad).collection("resultado").valueChanges();
  }
  getAllParametroResultadoIncumplido(): Observable<resultado[]> {
    return this.afs.collection("resultadosIncumplidos").snapshotChanges().pipe(map(listResult => listResult.map(result => {
      const resultado = result.payload.doc.data() as resultado
      resultado.id = result.payload.doc.id
      return resultado;
    })))
  }
  guardarResultado(listaParametro: parametro[], actividad: actividades): Observable<boolean> {
    return Observable.create(observer => {
      listaParametro.forEach(parametro => {
        let resultado: resultado = { parametro: parametro, resultado: parametro.resultado };
        resultado.lat = sessionStorage.getItem("latitud")
        resultado.lng = sessionStorage.getItem("longitud")
        this.getCumplimientoOIncumplimiento(parametro.resultado, parametro, resultado)
        resultado.actividad = actividad
        resultado.persona = JSON.parse(sessionStorage.getItem("personaLoged"));
        if (!resultado.cumplio || resultado.riesgo == "Muy Alto") {
          this.saveResultadoIncumplido(resultado)
        }
        resultado.fecha_registro = new Date()
        this.saveResultado(resultado, actividad.id)
      })
      actividad.isResultado = true

      this.actividadService.updateAtividad(actividad)

      observer.next(true)
    })
  }
  saveResultadoIncumplido(resultado: resultado) {
    this.afs.collection("resultadosIncumplidos").add(resultado)
  }
  saveResultado(resultado: resultado, idActividad: string) {
    this.afs.collection("actividad").doc(idActividad).collection("resultado").add(resultado)
  }
  getEstadisticaParametroFinIdActividad(idActividad: string): Observable<any[]> {
    return Observable.create(observer => {
      let data = new Array<any>()
      let dataResultado = new Array<number>()
      this.afs.collection("actividad").doc(idActividad).collection("resultado").snapshotChanges().pipe(map(actions => actions.map(documentoResultado => {
        const dataResultado = documentoResultado.payload.doc.data() as resultado
        dataResultado.id = documentoResultado.payload.doc.id
        return dataResultado
      }))).subscribe(listaResultado => {
        console.log(listaResultado)
        listaResultado.forEach(resultado => {

          listaResultado.filter(resultadoNew => resultadoNew.parametro.nombre == resultado.parametro.nombre).forEach(r => {
            dataResultado.push(parseFloat(r.resultado.toString()))
          })
          let indice = data.findIndex(re => re.label == resultado.parametro.nombre)
          if (indice != -1) {
            data[indice].data = dataResultado;
          } else {
            data.push({ label: resultado.parametro.nombre, data: dataResultado, fecha: resultado.fecha_registro })
          }
          dataResultado = new Array<number>()
        })

        observer.next(data)
      })
    })
  }
  getCumplimientoOIncumplimiento(resultado: number, parametro: parametro, resultadoObjeto: resultado) {
    if (resultado >= parametro.valor_maximo) {
      resultadoObjeto.cumplio = false
      resultadoObjeto.valor = 0;
    } else {
      resultadoObjeto.cumplio = true
      let riesgoObjeto = this.getRiesgo(resultado, parametro)
      resultadoObjeto.riesgo = riesgoObjeto.riesgo
      resultadoObjeto.valor = riesgoObjeto.valor
      console.log(riesgoObjeto)
    }

  }

  getRiesgo(resultado: number, parametro: parametro): any {
    let riesgo;

    let elemento = this.arrayRiesgo.find(elemento => elemento.parametro == parametro.nombreCorto)
    if (elemento) {
      console.log(elemento)
      riesgo = elemento.listaRiesgo.find(riesgo => resultado < riesgo.rango[0]["inicio"] && resultado >= riesgo.rango[0]["fin"])
    }
    return riesgo
  }
}
