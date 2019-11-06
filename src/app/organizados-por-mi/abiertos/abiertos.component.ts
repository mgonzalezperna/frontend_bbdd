import { Component, OnInit, Input } from '@angular/core';
import { Evento } from '../../domain/Evento';
import { UsuariosService } from '../../services/usuarios.service';
import { EventosService } from '../../services/eventos.service';
import { isEmpty } from "lodash"

@Component({
  selector: 'app-abiertos',
  templateUrl: './abiertos.component.html',
  styleUrls: ['./abiertos.component.css']
})
export class AbiertosComponent {

  @Input() hayDatos: boolean
  @Input() eventos: Evento[]

  displayedColumns: string[] = ['fecha', 'evento', 'lugar', 'edadMinima', 'precioEntrada'];

  constructor(private usuariosService: UsuariosService, private eventosService: EventosService) { }

  async ngOnInit() {
    this.eventos = await this.eventosService.organizadosPorMiAbiertos()
    this.hayDatos = !isEmpty(this.eventos)
  }

}
