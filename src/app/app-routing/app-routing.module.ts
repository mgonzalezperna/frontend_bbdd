import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasListComponent } from '../categorias-list/categorias-list.component';
import { MainMenuComponent } from '../main-menu/main-menu.component';
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
    { path: 'totalizador-list/:fecha_desde/:fecha_hasta/:idCategoria', component: TotalizadorListComponent },
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
]
