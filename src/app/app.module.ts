import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

//imports de Material2
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
//forms components
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule, MAT_DATE_LOCALE, MatDialogModule, MatSortModule }  from '@angular/material'

import { AppRoutingModule, routingComponents } from "./app-routing/app-routing.module";
import { MainMenuComponent } from './main-menu/main-menu.component';
import { OptionsComponent } from './main-menu/options/options.component';
import { CategoriasListComponent, CategoriasDetailComponent, CategoriaDeleteConfirmComponent } from './categorias-list/categorias-list.component';
import { ReportesComponent } from './reportes/reportes.component';
import { TotalizadorComponent } from './reportes/totalizador/totalizador.component';
import { TopFiveComponent } from './reportes/top-five/top-five.component';
import { TopFiveListComponent } from './reportes/top-five/top-five-list/top-five-list.component';
import { TotalizadorListComponent } from './reportes/totalizador/totalizador-list/totalizador-list.component';


export default function imports_list() {
  let imports = [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatMenuModule,
    MatButtonModule,
    MatListModule,
    MatButtonToggleModule,
    AppRoutingModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    HttpModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatSnackBarModule,
    MatGridListModule,
    MatTableModule,
    MatSortModule,
  ]
  return (imports)
}

@NgModule({
   declarations: [
      AppComponent,
      routingComponents,
      MainMenuComponent,
      OptionsComponent,
      CategoriasListComponent,
      CategoriasDetailComponent,
      CategoriaDeleteConfirmComponent,
      ReportesComponent,
      TopFiveComponent,
      TopFiveListComponent,
      TotalizadorComponent,
      TotalizadorListComponent,
   ],
   imports: [
      imports_list()
   ],
   entryComponents: [
      CategoriasDetailComponent,
      CategoriaDeleteConfirmComponent,
   ],
   providers: [{provide: MAT_DATE_LOCALE, useValue: 'es-ES'}],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
