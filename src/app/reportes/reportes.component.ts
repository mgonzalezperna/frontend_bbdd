import { Component, OnInit } from '@angular/core';
import { Categoria } from '../domain/Categoria';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  listado_categorias: Categoria[]
  fecha_desde: Date
  fecha_hasta: Date
  categoria: Categoria

  constructor() { }

  ngOnInit() {
    try {
      this.listado_categorias = [new Categoria('Rock', 'Genero musical'), new Categoria('Accion', 'Peliculas trepidantes')]
    } catch (error) {
      console.log(error) // mostrar errores
    }
  }

}
