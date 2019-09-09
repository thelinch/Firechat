import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PersonaRoutingModule } from "./persona.routing.module";
import { PersonaService } from "../services/persona.service";
import { ActividadService } from "../services/actividad.service";
import { PersonaComponent } from "./persona.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MapComponent } from "./map/map.component";
import { ActividadComponent } from "./actividad/actividad.component";
import { TipoIncidenciaService } from "../services/tipo-incidencia.service";
import { AreaService } from "../services/area.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ParametroMapeoComponent } from "./parametro-mapeo/parametro-mapeo.component";
import { ParametroService } from "../services/parametro.service";
import { IncidenciaService } from "../services/incidencia.service";
import { ChartsModule } from "ng2-charts";
import { AgmCoreModule } from "@agm/core";
import { ResultadoService } from "../services/resultado.service";
import { PmaoComponent } from "./pmao/pmao.component";
import { PmaoDirective } from "../directivas/pmao.directive";
import { FilterNamePipe } from "../pipes/filter-name.pipe";
import { SubActivityComponent } from "./sub-activity/sub-activity.component";
import { PersonaGuard } from "./../guards/persona.guard";
import { PersonaResolver } from "../resolvers/PersonaResolver";
import { HomeComponent } from "./home/home.component";
import { NgxPermissionsModule } from "ngx-permissions";
import { BlockUIModule } from "ng-block-ui";
import { ActividadIAComponent } from "./actividad-ia/actividad-ia.component";
import { PruebaDirective } from "../directivas/prueba.directive";
import { NgxPaginationModule } from "ngx-pagination";
import { FilterProgramcionPipe } from "../pipes/filter-programcion.pipe";
import { TransformSubactividadesPipe } from "../pipes/transform-subactividades.pipe";
import { SendMessageService } from "../services/send-message.service";
import { MessagingService } from "../services/messaging.service";
@NgModule({
  declarations: [
    PersonaComponent,
    TransformSubactividadesPipe,
    FilterProgramcionPipe,
    PruebaDirective,
    ActividadIAComponent,
    HomeComponent,
    SubActivityComponent,
    FilterNamePipe,
    PmaoDirective,
    DashboardComponent,
    MapComponent,
    ActividadComponent,
    ParametroMapeoComponent,
    PmaoComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BlockUIModule.forRoot(),
    PersonaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPermissionsModule.forChild(),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyDjUlVzErtcnc8NA2PY4SyxDOcZf3az6DY"
    })
  ],

  exports: [PersonaComponent],
  providers: [
    PersonaService,
    SendMessageService,
    MessagingService,
    PersonaResolver,
    PersonaGuard,
    ResultadoService,
    IncidenciaService,
    ActividadService,
    TipoIncidenciaService,
    AreaService,
    ParametroService
  ]
})
export class PersonaModule {}
