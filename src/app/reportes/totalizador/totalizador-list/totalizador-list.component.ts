import { Component, Input } from '@angular/core';
import { MatTableDataSource, Sort } from '@angular/material';
import { ReporteDescargas } from 'src/app/domain/ReporteDescargas';
import { compare } from 'src/app/functions/compare';

@Component({
  selector: 'totalizador-list',
  templateUrl: './totalizador-list.component.html',
  styleUrls: ['./totalizador-list.component.css']
})
export class TotalizadorListComponent {
  @Input() reportes_descargas: ReporteDescargas[]
  displayed_columns: String[] = ['archivo', 'puntaje', 'velocidad', 'total']

  constructor() {}

  sortData(sort: Sort) {
    const data = this.reportes_descargas.slice();
    if (!sort.active || sort.direction === '') {
      this.reportes_descargas = data
      return;
    }

    this.reportes_descargas = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'archivo': return compare(a.Titulo, b.Titulo, isAsc)
        case 'puntaje': return compare(a.Promedio_puntaje, b.Promedio_puntaje, isAsc)
        case 'velocidad': return compare(a.Velocidad_maxima, b.Velocidad_maxima, isAsc)
        case 'total': return compare(a.Total_descargas, b.Total_descargas, isAsc)
        default: return 0;
      }
    })
  }

}
