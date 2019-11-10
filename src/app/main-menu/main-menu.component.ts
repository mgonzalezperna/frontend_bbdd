import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  crud_message: String
  crud_button: String
  top_five_report_message: String
  top_five_report_button: String
  surveys_report_message: String
  surveys_report_button: String

  ngOnInit() {
    this.crud_message = 'Ver listado de categorías existentes. Desde aquí, se puede Crear, Editar o Eliminar categorías.'
    this.crud_button = 'Categoría'
    this.top_five_report_message = 'Generar reporte Top 5 de experiencias de descargas.'
    this.top_five_report_button = 'Reporte Top 5'
    this.surveys_report_message = 'Generar reportes sobre total de descargas, filtrar las mejores experiencias entre fechas y según categoría.'
    this.surveys_report_button = 'Reporte Total Descargas'
  }

}
