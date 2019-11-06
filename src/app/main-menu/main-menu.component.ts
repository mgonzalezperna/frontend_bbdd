import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  crud_message: String
  crud_button: String
  report_message: String
  report_button: String
  
  ngOnInit() {
    this.crud_message = 'Ver listado de categorías existentes. Desde aquí, se puede Crear, Editar o Eliminar categorías.'
    this.crud_button = 'Categoría'
    this.report_message = 'Generar reportes sobre descargas. Top 5 de descargas o filtrar mejores experiencias entre fechas y según categoría.'
    this.report_button = 'Reportes'
  }

}
