import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../../domain/Evento';
import { UsuariosService } from '../../services/usuarios.service';
import { EventosService } from '../../services/eventos.service';
import { isEmpty } from "lodash"

@Component({
  selector: 'app-cerrados',
  templateUrl: './cerrados.component.html',
  styleUrls: ['./cerrados.component.css']
})
export class CerradosComponent {

  @Input() hayDatos: boolean
  @Input() eventos: Evento[]

  displayedColumns: string[] = ['fecha', 'evento', 'lugar', 'invitados', 'confirmados', 'rechazados'];

  constructor(private usuariosService: UsuariosService, private eventosService: EventosService) { }

  async ngOnInit() {
    this.eventos = await this.eventosService.organizadosPorMiCerrados()
    this.hayDatos = !isEmpty(this.eventos)
  }
}
