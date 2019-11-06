import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasListComponent } from '../categorias-list/categorias-list.component';
import { FormNuevoEventoAbiertoComponent } from '../form-nuevo-evento/form-nuevo-evento-abierto/form-nuevo-evento-abierto.component';
import { FormNuevoEventoCerradoComponent } from '../form-nuevo-evento/form-nuevo-evento-cerrado/form-nuevo-evento-cerrado.component';
import { FormNuevoEventoComponent } from '../form-nuevo-evento/form-nuevo-evento.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
import { PendientesComponent } from '../pendientes/pendientes.component';
import { ProfileComponent } from "../profile/profile.component";
import { ReportesComponent } from '../reportes/reportes.component';
import { TopFiveListComponent } from '../reportes/top-five/top-five-list/top-five-list.component';
import { TotalizadorListComponent } from '../reportes/totalizador/totalizador-list/totalizador-list.component';

//TODO: falta agregar el routing a 404
const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: MainMenuComponent },
  { path: 'categorias', component: CategoriasListComponent },
  { path: 'reportes', component: ReportesComponent, children: [
    { path: 'top-5-list', component: TopFiveListComponent },
    { path: 'totalizador-list', component: TotalizadorListComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }

//buena práctica según el indio:
export const routingComponents = [MainMenuComponent, 
  CategoriasListComponent,
  PendientesComponent,
  ProfileComponent,
  FormNuevoEventoComponent,
  FormNuevoEventoAbiertoComponent,
  FormNuevoEventoCerradoComponent,
]
