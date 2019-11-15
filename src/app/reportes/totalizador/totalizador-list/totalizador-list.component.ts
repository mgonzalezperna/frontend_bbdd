import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ReporteDescargas } from 'src/app/domain/ReporteDescargas';
import { ReporteService } from 'src/app/services/reporte.service';
import { Categoria } from 'src/app/domain/Categoria';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'totalizador-list',
  templateUrl: './totalizador-list.component.html',
  styleUrls: ['./totalizador-list.component.css']
})
export class TotalizadorListComponent implements OnChanges {
  displayed_columns: String[] = ['archivo', 'puntaje', 'velocidad', 'total']
  @Input() reportes_descargas: ReporteDescargas[]
  info_descargas: MatTableDataSource<ReporteDescargas>
    
  @ViewChild(MatSort) sort: MatSort;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.info_descargas = new MatTableDataSource(this.reportes_descargas)
    this.info_descargas.sort = this.sort;
  }



}
