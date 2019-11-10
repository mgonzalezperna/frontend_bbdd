import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/domain/Categoria';
import { ReporteDescargas } from 'src/app/domain/ReporteDescargas';
import { CategoriasService } from 'src/app/services/categoria.service';
import { ReporteService } from 'src/app/services/reporte.service';

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
  fechaDesdeValidator: FormControl = new FormControl('', [Validators.required]);
  fechaHastaValidator: FormControl = new FormControl('', [Validators.required]);
  categoriaValidator: FormControl = new FormControl('', [Validators.required]);
  server_error: String = ""
  reportes_descargas: ReporteDescargas[]
  cargando: boolean = false

  constructor(private categoriaService: CategoriasService, private reporteService: ReporteService) { }

  async ngOnInit() {
    try {
      this.listado_categorias = await this.categoriaService.solicitarListadoCategorias()
      this.listado_categorias.push(new Categoria("", "Todos"))
    }
    catch (error) {
      this.server_error = error
      console.log(error) // mostrar errores
    }
  }

  get error() {
    return this.fechaDesdeMayorAFechaHastaError ? this.fechaDesdeMayorAFechaHastaError : this.server_error
  }

  get fechaDesdeMayorAFechaHastaError() {
    return this.fechaDesdeMayorAFechaHasta() ? 'Fecha desde debe ser anterior a fecha hasta' : ''
  }

  get errorMsgFechaDesde() {
    return this.fechaDesdeValidator.hasError('required') ? "Debe ingresar fecha desde" : ''
  }

  get errorMsgFechaHasta() {
    return this.fechaHastaValidator.hasError('required') ? "Debe ingresar fecha hasta" : ''
  }

  fechaDesdeMayorAFechaHasta() {
    return this.fecha_desde > this.fecha_hasta
  }

  cantSubmit() {
    return this.fechaDesdeMayorAFechaHasta() || this.fechaDesdeValidator.hasError('required') || this.fechaHastaValidator.hasError('required') || this.categoriaValidator.hasError('required')
  }

  fechaDesdeFormateada() {
    return formatearFecha(this.fecha_desde)
  }

  fechaHastaFormateada() {
    return formatearFecha(this.fecha_hasta)
  }

  irATotalizadorList() {
    console.log(this.fecha_desde)
    this.router.navigate(['/totalizador/totalizador-list', this.fechaDesdeFormateada(),this.fechaHastaFormateada(),this.categoria.idCategoria ]);
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