import { Evento } from "./Evento"
import { Locacion } from "./Locacion"
import { Invitacion } from "./Invitacion"
import { remove, concat } from "lodash";

export class Usuario {
    id: number
    invitaciones: Invitacion[] = []
    edad: number
    userName: String
    nombreApellido: String
    email: String
    fecha_nacimiento: Date
    tipoUsuario: TipoUsuario

    eventosPorOrganizar: Evento[] = []
    amigos: Usuario[] = []

    constructor(init?: Partial<Usuario>) {
        Object.assign(this, init)
    }

    organizar(evento: Evento) {
        evento.organizador = this
        this.eventosPorOrganizar.push(evento)
    }

    cantidadAmigos() {
        return this.amigos.length
    }

    invitacionesPendientes() {
        return this.invitaciones.filter(invitacion => invitacion.estaPendiente())
    }

    eventosConInvitacion() {
        return (this.invitaciones.map(inv => inv.evento)) as Evento[]
    }

    todosLosPendientes() {
        return concat(this.eventosConInvitacion(), this.eventosPorOrganizar)
    }

    eliminarAmigo(usuario: Usuario) {
        remove(this.amigos, usuario)
    }

    static fromJson(UsuarioJson) {
        return Object.assign(new Usuario(), UsuarioJson)
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }
}

export interface TipoUsuario {
    tipoNombre: String

    tieneMaximoEventosMensuales()
    tieneMaximoEventosSimultaneos()
    maximoEventosMensuales()
    maximoEventosSimultaneos()
    maximoInvitaciones()
    tieneMaximoAsistentes()
    tieneMaximoInvitaciones()
    puedeHacerEventosAbiertos()
    puedeCancelar()
    puedePostergar()
}

export class Profesional implements TipoUsuario {
    tipoNombre: String = "Profesional"

    tieneMaximoEventosMensuales() {
        true
    }
    tieneMaximoEventosSimultaneos() {
        false
    }
    maximoEventosMensuales() {
        20
    }
    maximoEventosSimultaneos() {
        throw new Error("Method not implemented.")
    }
    maximoInvitaciones() {
        throw new Error("Method not implemented.")
    }
    tieneMaximoAsistentes() {
        false
    }
    tieneMaximoInvitaciones() {
        false
    }
    puedeHacerEventosAbiertos() {
        true
    }
    puedeCancelar() {
        true
    }
    puedePostergar() {
        true
    }
}
export class Amateur implements TipoUsuario {
    tipoNombre: String = "Amateur"

    tieneMaximoEventosMensuales() {
        false
    }
    tieneMaximoEventosSimultaneos() {
        true
    }
    maximoEventosMensuales() {
        20
    }
    maximoEventosSimultaneos() {
        5
    }
    maximoInvitaciones() {
        50
    }
    tieneMaximoAsistentes() {
        false
    }
    tieneMaximoInvitaciones() {
        true
    }
    puedeHacerEventosAbiertos() {
        true
    }
    puedeCancelar() {
        true
    }
    puedePostergar() {
        true
    }
}

export class Free implements TipoUsuario {
    tipoNombre: String = "Free"

    tieneMaximoEventosMensuales() {
        true
    }
    tieneMaximoEventosSimultaneos() {
        true
    }
    maximoEventosMensuales() {
        3
    }
    maximoEventosSimultaneos() {
        1
    }
    maximoInvitaciones() {
        50
    }
    tieneMaximoAsistentes() {
        true
    }
    tieneMaximoInvitaciones() {
        true
    }
    puedeHacerEventosAbiertos() {
        false
    }
    puedeCancelar() {
        false
    }
    puedePostergar() {
        false
    }

}