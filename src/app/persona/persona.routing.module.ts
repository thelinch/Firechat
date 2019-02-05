import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonaComponent } from './persona.component';
import { MapComponent } from './map/map.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ParametroMapeoComponent } from './parametro-mapeo/parametro-mapeo.component';
import { PmaoComponent } from './pmao/pmao.component';
import { PersonaGuard } from '../guards/persona.guard';
import { HomeComponent } from './home/home.component';
import { AtividadIAComponent } from './atividad-ia/atividad-ia.component';

const routes: Routes = [
  {
    path: '', component: PersonaComponent, canActivate: [PersonaGuard], children: [
      { path: "home", component: HomeComponent },
      { path: "dashboard", component: DashboardComponent },
      { path: "map", component: MapComponent },
      { path: "parametros", component: ParametroMapeoComponent },
      { path: "indice/:idIndice/ICA/actividades", component: ActividadComponent },
      { path: "indice/:idIndice/IA/actividades", component: AtividadIAComponent }
      , { path: "indice/:idIndice/PMAO/actividades", component: PmaoComponent }]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
