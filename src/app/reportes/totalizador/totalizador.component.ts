import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/domain/Categoria';
import { CategoriasService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';

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

  constructor(private categoriaService: CategoriasService, private router: Router) { }

  async ngOnInit() {
    try {
      this.listado_categorias = await this.categoriaService.solicitarListadoCategorias()
      this.listado_categorias.push(new Categoria("","Todos"))
    }
     catch (error) {
      console.log(error) // mostrar errores
    }
  }
  
  fechaDesdeFormateada() {
    return formatearFecha(this.fecha_desde)
  }
  
  fechaHastaFormateada() {
    return formatearFecha(this.fecha_hasta)
  }

  irATotalizadorList() {
    console.log(this.fecha_desde)
    this.router.navigate(['/reportes/totalizador-list', this.fechaDesdeFormateada(),this.fechaHastaFormateada(),this.categoria.idCategoria ]);
  }

}

function formatearFecha(fecha: Date) {
    // AA-MM-DD
    return `${fecha.getFullYear()}-${agregarCero(
      fecha.getMonth() + 1
    )}-${agregarCero(fecha.getDate())}`;
  }

function agregarCero(dia) {
    if (dia < 10) return `0${dia}`;
    else return dia;
  }