import { Component, OnInit, Input } from '@angular/core';
import { Experiencia } from 'src/app/domain/Experiencia';
import { ReporteService } from 'src/app/services/reporte.service';

@Component({
  selector: 'top-five-list',
  templateUrl: './top-five-list.component.html',
  styleUrls: ['./top-five-list.component.css']
})
export class TopFiveListComponent implements OnInit {

  @Input() top_five_experiencias: Experiencia[]

  constructor() { }

  async ngOnInit() {

  }

}
