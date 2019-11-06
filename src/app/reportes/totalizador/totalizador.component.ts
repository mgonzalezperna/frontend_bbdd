import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/domain/Categoria';

@Component({
  selector: 'totalizador',
  templateUrl: './totalizador.component.html',
  styleUrls: ['../reportes.component.css']
})
export class TotalizadorComponent implements OnInit {
  fecha_desde: Date
  fecha_hasta: Date
  listado_categorias: Categoria[]
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
