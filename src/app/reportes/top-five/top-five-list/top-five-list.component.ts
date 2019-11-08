import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/domain/Experiencia';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'app-top-five-list',
  templateUrl: './top-five-list.component.html',
  styleUrls: ['./top-five-list.component.css']
})
export class TopFiveListComponent implements OnInit {

  top_five_experiencias: Experiencia[]

  constructor(private reporteService: ReporteService) { }

  async ngOnInit() {
    this.top_five_experiencias = await this.reporteService.topFive()
  }

}
