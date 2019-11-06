import { Cerrado } from "./Evento";
import { Usuario } from "./Usuario";

export class Invitacion {
    id: number
    evento: Cerrado
    cantidadAcompaniantes: number
    maxCantidadAcompaniantes: number
    pendiente: boolean
    enAgenda: boolean

    estaPendiente() {
        return this.pendiente
    }

    rechazar(): void {
        this.pendiente = false
        this.enAgenda = false
    }

    aceptar(cantidadAcompaniantes: number): void {
        this.pendiente = false
    }

    static fromJson(invitacionJson) {
        var nuevaInvitacion = Object.assign(new Invitacion(), invitacionJson)
        nuevaInvitacion.evento = Cerrado.fromJson(invitacionJson.evento)
        return nuevaInvitacion
    }

}
