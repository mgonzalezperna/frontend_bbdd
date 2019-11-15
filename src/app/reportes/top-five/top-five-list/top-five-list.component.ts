import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Experiencia } from 'src/app/domain/Experiencia';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'top-five-list',
  templateUrl: './top-five-list.component.html',
  styleUrls: ['./top-five-list.component.css']
})
export class TopFiveListComponent implements OnChanges, OnInit {
  displayed_columns: String[] = ['titulo', 'puntaje', 'comentario']
  @Input() top_five_experiencias: Experiencia[]
  experiencias: MatTableDataSource<Experiencia>
  
  @ViewChild(MatSort) sort: MatSort;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    this.experiencias = new MatTableDataSource(this.top_five_experiencias)
    this.experiencias.sort = this.sort;
  }

  ngOnInit() {
    
  }

}
