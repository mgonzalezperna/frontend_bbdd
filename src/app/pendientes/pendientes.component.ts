import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { Invitacion } from '../domain/Invitacion';
import { userLoggedInId } from '../services/configuration';
import { isEmpty } from "lodash"

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {
  errores: String[] = []

  invitaciones: Invitacion[]
  hayDatos: boolean
  constructor(private eventosService: EventosService) { }

  displayedColumns: string[] = ['fecha', 'evento', 'lugar', 'organizador', 'acompañantes', 'acciones'];

  async ngOnInit() {
    this.invitaciones = await this.eventosService.invitacionesPendientes().then(response => response.data)
    this.hayDatos = !isEmpty(this.invitaciones)
  }

  //Fuerza al control a solo poder contener como valor los que se encuentren en el dominio definido para el.
  validateAcompaniantes(invitacion) {
    console.log(invitacion)
    console.log(invitacion.maxCantidadAcompaniantes)
    console.log(invitacion.cantidadAcompaniantes)
    invitacion.cantidadAcompaniantes > invitacion.maxCantidadAcompaniantes ?
      (invitacion.cantidadAcompaniantes = invitacion.maxCantidadAcompaniantes, this.errores.push("La cantidad de acompañantes del evento" +
        invitacion.evento.descripcion + " no puede superar el máximo de " + invitacion.maxCantidadAcompaniantes)) :
      invitacion.cantidadAcompaniantes < 0 ?
        (invitacion.cantidadAcompaniantes = 0, this.errores.push("La cantidad de acompañantes del evento " + invitacion.evento.descripcion +
          " no puede ser menor a cero")) :
        '';
  }
  puedeAceptar(invitacion) {
    return !(invitacion.cantidadAcompaniantes == '')
  }

  rechazar(invitacion: Invitacion) {
    this.eventosService.rechazarInvitacion(userLoggedInId, invitacion.id).then(result => { this.ngOnInit() })
  }
  aceptar(invitacion: Invitacion) {
    this.eventosService.aceptarInvitacion(userLoggedInId, invitacion.id, invitacion.cantidadAcompaniantes).then(result => { this.ngOnInit() })
  }

}
