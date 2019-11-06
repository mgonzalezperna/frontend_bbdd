import { Injectable } from '@angular/core';
import { Evento, Cerrado, Abierto } from "../domain/Evento";
import { API_URL, userLoggedIn, userLoggedInId } from './configuration';
import { Http } from '@angular/http';
import { Invitacion } from '../domain/Invitacion';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
//import { eventos } from "../bootstrap"


@Injectable({
  providedIn: 'root'
})
export class EventosService {
  eventos: Evento[]

  constructor(private http: Http) {
  }

  async organizadosPorMi() {
    const url = API_URL + "/usuarios/id/" + userLoggedIn + "/eventosPorOrganizar"
    const resp = await this.http.get(url).toPromise()
    return { status: resp.status , data: resp.json().map(Evento.fromJson) }
  }

  async organizadosPorMiAbiertos() {
    const organizadosAbiertos = await this.organizadosPorMi()
    return organizadosAbiertos.data.filter(evento => evento.tipoEvento === 'Abierto')
  }
  async organizadosPorMiCerrados() {
    const organizadosCerrados = await this.organizadosPorMi()
    return organizadosCerrados.data.filter(evento => evento.tipoEvento === 'Cerrado')
  }

  async invitacionesPendientes() {
    const url = API_URL + "/usuarios/id/" + userLoggedIn + "/invitacionesPendientes"
    const resp = await this.http.get(url).toPromise()
    return { status: resp.status , data: resp.json().map(Invitacion.fromJson) } 
  }

  async invitacionesEnAgenda() {
    const url = API_URL + "/usuarios/id/" + userLoggedIn + "/invitacionesParaAgenda"
    const resp = await this.http.get(url).toPromise()
    return { status: resp.status , data: resp.json().map(Invitacion.fromJson) } 
  }

  async eventosConInvitacionPendiente() {
    var invitaciones = await this.invitacionesPendientes()
    var invitacionesArray: Invitacion[] = invitaciones.data
    return invitacionesArray.map(inv => inv.evento)
  }

  rechazarInvitacion(usuario: number, invitacion: number) {
    const url = API_URL + "/usuario/invitaciones/rechazar/"
    const json = { idUsuarioLoggeado: usuario, idInvitacionRechazar: invitacion }
    return this.http.put(url, json).toPromise().catch(this.errorHandlerPut)
  }

  aceptarInvitacion(usuario: number, invitacion: number, acompaniantes: number) {
    const url = API_URL + "/usuario/invitaciones/aceptar/"
    const json = { idUsuarioLoggeado: usuario, idInvitacionAceptar: invitacion, acompaniantes: acompaniantes }
    return this.http.put(url, json).toPromise().catch(this.errorHandlerPut)
  }

  nuevoCerrado(cerrado: Cerrado) {
    const url = API_URL + "/eventos/nuevo/cerrado"
    const cerradoJson = cerrado.toFlatJson()
    return this.http.put(url, cerradoJson).toPromise().catch(this.errorHandlerPut)
  }

  nuevoAbierto(abierto: Abierto) {
    const url = API_URL + "/eventos/nuevo/abierto"
    const abiertoJson = abierto.toFlatJson()
    return this.http.put(url, abiertoJson).toPromise().catch(this.errorHandlerPut)
  }

  errorHandlerPut(response: any) {
    return(response)
  }

  eventosDesdeHasta(filtrar_eventos: Evento[], desde: Date, hasta: Date): Evento[] {
    return filtrar_eventos.filter(evento => evento.fechaHoraInicio > desde && evento.fechaHoraInicio <= hasta)
  }

}
