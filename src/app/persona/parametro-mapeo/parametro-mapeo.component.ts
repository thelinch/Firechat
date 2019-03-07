import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../services/parametro.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { categoria } from '../../modelos/categoria';
import { parametro } from '../../modelos/parametro';
import { validateConfig } from '@angular/router/src/config';
import { Observable } from 'rxjs';
import { sweetAlertMensaje } from 'src/app/HelperClass/SweetAlertMensaje';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-parametro-mapeo',
  templateUrl: './parametro-mapeo.component.html',
  styleUrls: ['./parametro-mapeo.component.css']
})
export class ParametroMapeoComponent implements OnInit {
  activarFormParametro: boolean = false;
  formParametro: FormGroup;
  listaCategoria: Observable<categoria[]>
  listaParametros: Observable<parametro[]>
  parametroSeleccionado: parametro
  accion :boolean =false
  constructor(private parametroService: ParametroService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.formParametro = new FormGroup({
      id: new FormControl(""),
      nombre: new FormControl("", Validators.required),
      valor_maximo: new FormControl("", Validators.required),
      valor_minimo: new FormControl(""),
      nombreCorto: new FormControl("", Validators.required),
      unidadMedida: new FormControl("", Validators.required),
      descripcion: new FormControl("", Validators.required),
      categoria: new FormControl("", Validators.required),
      tipo: new FormControl("", Validators.required)
    })
    this.listaParametros = this.parametroService.getAllParametro();
    this.getAllCategoria()
  }
  cerraModal() {
    if (this.activarFormParametro) {
      this.toggleModalParametro();
    }
  }
  getAllCategoria() {
    this.listaCategoria = this.categoriaService.getAllCategoria()
  }
 
    saveParametro(parametro: parametro) {
    if (parametro.id !=null && this.parametroSeleccionado) {
        this.parametroService.updateParametro(this.parametroSeleccionado).subscribe(async respuesta =>{
          this.cerraModal(); 
        })
      } else {
        parametro.estado = true;
        this.parametroService.saveParametro(parametro)
        this.cerraModal(); 
      }
    }

 
  toggleModalParametro() {
    this.activarFormParametro = !this.activarFormParametro;
  }


  setParametro(parametros: parametro) {
    this.parametroSeleccionado = parametros;
  }
  eliminarParametro() {
    sweetAlertMensaje.getMensajeDelete("Desea eliminar el Parametro").then(respuesta => {
      if (respuesta.value) {
        this.parametroSeleccionado.estado = false;
        this.parametroService.updateEstadoParametro(this.parametroSeleccionado);
      }
    })
  }
  compareTipoParametro(parametro1: any, parametro2: any) {
    return parametro1 && parametro2 ? parametro1.id === parametro2.id : parametro1 === parametro2;
  }

  editarParametro() {
    this.accion=false
    this.formParametro.get("nombre").setValue(this.parametroSeleccionado.nombre)
    this.formParametro.get("nombreCorto").setValue(this.parametroSeleccionado.nombreCorto)
    this.formParametro.get("unidadMedida").setValue(this.parametroSeleccionado.unidadMedida)
    this.formParametro.get("tipo").setValue(this.parametroSeleccionado.tipo)
    this.formParametro.get("descripcion").setValue(this.parametroSeleccionado.descripcion)
    this.formParametro.get("valor_maximo").setValue(this.parametroSeleccionado.valor_maximo)
    this.formParametro.get("valor_minimo").setValue(this.parametroSeleccionado.valor_minimo)
    this.formParametro.get("id").patchValue(this.parametroSeleccionado.id)
    this.formParametro.get("tipo").patchValue(
      {
        id: this.parametroSeleccionado.tipo.id
      })
    this.formParametro.get("categoria").patchValue(
      {
        id: this.parametroSeleccionado.categoria.id
      })
  }
  nuevoParametro() {
    this.accion=true
    this.formParametro.reset()
  }
  toggleAccion() {
    this.accion = !this.accion;
  }
}
