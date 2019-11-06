import { Locacion } from "./Locacion";
import { Usuario } from "./Usuario";
import { Invitacion } from "./Invitacion";
import { userLoggedIn, userLoggedInId } from "../services/configuration";

export abstract class Evento {
    descripcion: String
    fechaHoraInicio: Date
    locacion: Locacion
    organizador: Usuario
    cancelado: Boolean
    tipoEvento: String

    capacidadMaxima() { } //no puedo definirle el tipo sin devolver algo

    cantidadConfirmados() { }
    cantidadRechazados() { }
    cantidadInvitados() { }

    static fromJson(eventoJson) {
        if (eventoJson.tipoEvento == "Abierto") {
            var nuevoEvento = Object.assign(new Abierto(), eventoJson)
        }
        else if (eventoJson.tipoEvento == "Cerrado") {
            var nuevoEvento = Object.assign(new Cerrado(), eventoJson)
        }
        nuevoEvento.fechaHoraInicio = new Date(eventoJson.fechaHoraInicio)
        nuevoEvento.organizador = new Usuario(eventoJson.organizador)
        return nuevoEvento
    }

    toJSON(): any {
        const result: any = Object.assign({}, this)
        return result
    }

    toFlatJson(): any {
        var result = this.toJSON()
        result.locacion = result.locacion.id
        result.organizador = userLoggedInId
        return result
    }
}

export class Abierto extends Evento {

    edadMinima: Number
    precioEntrada: Number
    entradasVendidas: Number

    constructor() {
        super()
        this.tipoEvento = "Abierto"
    }

    capacidadMaxima(): Number {
        return this.locacion.capacidadMaximaEventosAbiertos()
    }

    cantidadConfirmados() {
        this.entradasVendidas
    }
    cantidadRechazados() {
        return "n/a" //podría mostrar entradas devueltas
    }
    cantidadInvitados() {
        return "n/a" //podría mostrar capacidad máxima?
    }
}

export class Cerrado extends Evento {
    confirmarInvitacion(usuario: Usuario, cantidadAcompaniantes: number): any {
        this.confirmados.push(usuario)
        this.totalPersonasConfirmadas += cantidadAcompaniantes
    }
    rechazarInvitacion(usuario: Usuario, invitacion: Invitacion): any {
        this.rechazados.push(usuario)
    }
    confirmados: Usuario[] = []
    rechazados: Usuario[] = []
    invitados: Usuario[] = []
    _capacidadMaxima: Number //no puedo tener un field
    totalPersonasConfirmadas: number = 0
    fechaHoraFin: Date
    fechaMaximaConfirmacion: Date

    constructor() {
        super()
        this.tipoEvento = "Cerrado"
    }

    capacidadMaxima(): Number {
        return this._capacidadMaxima
    }

    cantidadConfirmados(): number {
        return this.confirmados.length
    }

    cantidadRechazados() {
        return this.rechazados.length
    }
    cantidadInvitados() {
        return this.invitados.length
    }
    toFlatJson(): any {
        var result = super.toFlatJson()
        delete result.confirmados
        delete result.rechazados
        delete result.invitados
        return result
    }

}