import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReporteDescargas } from 'src/app/domain/ReporteDescargas';
import { ReporteService } from 'src/app/services/reporte.service';
import { Categoria } from 'src/app/domain/Categoria';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'totalizador-list',
  templateUrl: './totalizador-list.component.html',
  styleUrls: ['./totalizador-list.component.css']
})
export class TotalizadorListComponent implements OnInit {

  @Input() reportes_descargas: ReporteDescargas[]

  constructor() {
  }

  ngOnInit() {
  }

}
