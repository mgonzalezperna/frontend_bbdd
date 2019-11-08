import { Component, OnInit, Input } from '@angular/core';
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

  fecha_desde: String
  fecha_hasta: String
  idCategoria: String
  reportes_descargas: ReporteDescargas[]

  constructor(private reporteService: ReporteService, private route: ActivatedRoute) { 
    this.route.paramMap.subscribe(params => { 
      this.route.snapshot.paramMap.get("fecha_desde")
      console.log(params['fecha_desde'])
    })
  }

  async ngOnInit() {
    this.reportes_descargas = await this.reporteService.reporteDescargas(this.fecha_desde,this.fecha_hasta,this.idCategoria)
  }

}
