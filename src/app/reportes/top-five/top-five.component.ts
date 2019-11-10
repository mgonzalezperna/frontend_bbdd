import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/domain/Experiencia';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'top-five',
  templateUrl: './top-five.component.html',
  styleUrls: ['../reportes.component.css']
})
export class TopFiveComponent implements OnInit {

  top_five_experiencias: Experiencia[]
  cargando: boolean = false

  constructor(private reporteService: ReporteService) { }

  ngOnInit() {
  }

  async fetchTop5() {
    this.cargando = true
    this.top_five_experiencias = await this.reporteService.topFive()
    this.cargando = false
  }

}
