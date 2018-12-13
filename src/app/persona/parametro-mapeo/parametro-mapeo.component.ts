import { Component, OnInit } from '@angular/core';
import { ParametroService } from '../../services/parametro.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/categoria.service';
import { categoria } from '../../modelos/categoria';
import { parametro } from '../../modelos/parametro';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-parametro-mapeo',
  templateUrl: './parametro-mapeo.component.html',
  styleUrls: ['./parametro-mapeo.component.css']
})
export class ParametroMapeoComponent implements OnInit {
  activarFormParametro: boolean = false;
  formParametro: FormGroup;
  listaCategoria: categoria[]
  constructor(private parametroService: ParametroService, private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.formParametro = new FormGroup({
      nombre: new FormControl("", Validators.required),
      valor_maximo: new FormControl("", Validators.required),
      valor_minimo: new FormControl(""),
      nombreCorto: new FormControl("", Validators.required),
      unidadMedida: new FormControl("", Validators.required),
      descripcion:new FormControl("",Validators.required),
      categoria: new FormControl("", Validators.required)
    })

    this.parametroService.getAllActividadesFindParametros("k3j2g3RlGbYu2HCt4XKA")
  }
  cerraModal() {
    setTimeout(() => {
      if (this.activarFormParametro) {
        this.toggleModalParametro();
      }
    }, 1500)
  }
  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe(categorias => {
      this.listaCategoria = categorias;
    })
  }
  saveParametro(parametro: parametro) {
    this.parametroService.saveParametro(parametro).then(documentoParametro => {
      documentoParametro.get().then(dataParametro => {
        console.log((dataParametro.data() as parametro).nombre)
        this.formParametro.reset()
      //  this.cerraModal();
      })
    })
  }
  toggleModalParametro() {
    this.activarFormParametro = !this.activarFormParametro;
    if (this.activarFormParametro) {
      this.getAllCategoria()
    }
  }


}
