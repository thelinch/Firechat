import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonaComponent } from './persona.component';
import { MapComponent } from './map/map.component';
import { ActividadComponent } from './actividad/actividad.component';
import { ParametroMapeoComponent } from './parametro-mapeo/parametro-mapeo.component';
import { parametro } from '../modelos/parametro'
import { PmaoComponent } from './pmao/pmao.component';

const routes: Routes = [
    {
        path: 'persona/:id/area/:idarea', component: PersonaComponent, children: [{
            path: "dashboard", component: DashboardComponent
        }, { path: "map", component: MapComponent }, {
            path: "map/parametros", component: ParametroMapeoComponent
        },
        { path: "indice/:idIndice/actividades", component: ActividadComponent }
            , {
            path: "indice/:idIndice/Pmao/actividades", component: PmaoComponent
        }]
    }


];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonaRoutingModule { }
