import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './persona/persona.component';

const routes: Routes = [
    { path: '', component: PersonaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
