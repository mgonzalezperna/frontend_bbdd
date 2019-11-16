import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';
import { Experiencia } from 'src/app/domain/Experiencia';
import { compare } from 'src/app/functions/compare';

@Component({
  selector: 'top-five-list',
  templateUrl: './top-five-list.component.html',
  styleUrls: ['./top-five-list.component.css']
})
export class TopFiveListComponent implements OnInit {
  displayed_columns: String[] = ['titulo', 'puntaje', 'comentario']
  @Input() top_five_experiencias: Experiencia[]

  constructor() { }

  ngOnInit() { }

  sortData(sort: Sort) {
    const data = this.top_five_experiencias.slice();
    if (!sort.active || sort.direction === '') {
      this.top_five_experiencias = data
      return;
    }

    this.top_five_experiencias = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc'
      switch (sort.active) {
        case 'titulo': return compare(a.Titulo, b.Titulo, isAsc)
        case 'puntaje': return compare(a.Puntaje, b.Puntaje, isAsc)
        case 'comentario': return compare(a.Comentario, b.Comentario, isAsc)
        default: return 0;
      }
    })
  }

}

