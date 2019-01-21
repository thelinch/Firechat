import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './persona/persona.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    {
        path: "persona/:id/area/:idarea", component: PersonaComponent
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
