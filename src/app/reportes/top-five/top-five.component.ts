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
  server_error: String = ""

  constructor(private reporteService: ReporteService) { }

  ngOnInit() {
  }

  async fetchTop5() {
    this.server_error = ""
    this.cargando = true
    try {
      this.top_five_experiencias = await this.reporteService.topFive()
    } catch (error) {
      this.server_error = error
      console.log(error)
    }
    this.cargando = false
  }

}
