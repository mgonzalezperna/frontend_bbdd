import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
//import { current_user, usuarios } from "../bootstrap";
import { Usuario } from "../domain/Usuario";
import { API_URL, userLoggedIn } from "./configuration";


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  cantidadAmigos: number

  constructor(private http: Http) {
    this.actualizarCantidadAmigos()
  }

  async actualizarCantidadAmigos() {
    this.cantidadAmigos = await this.getCantidadAmigos()
  }

  async current_user() {
    const url = API_URL + "/usuarios/id/" + userLoggedIn
    const resp = await this.http.get(url).toPromise()
    return Usuario.fromJson(resp.json())
  }

  async userFromId(id: number) {
    const url = API_URL + "/usuarios/id/" + id
    const resp = await this.http.get(url).toPromise()
    return Usuario.fromJson(resp.json())
  }

  async amigos() {
    const url = API_URL + "/usuarios/id/" + userLoggedIn + "/amigos"
    //console.log(url)
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Usuario.fromJson)
  }

  async getCantidadAmigos() {
    const url = API_URL + "/usuarios/id/" + userLoggedIn + "/amigos"
    const resp = await this.http.get(url).toPromise()
    const amigos = resp.json().map(Usuario.fromJson)
    return amigos.length
  }

  actualizarUsuario(usuario: Usuario) {
    const url = API_URL + "/usuarios/id/" + userLoggedIn
    return this.http.put(url, usuario.toJSON()).toPromise()
  }

  eliminarAmigo(usuario: number, amigo: number) {
    const url = API_URL + "/usuario/eliminarAmigo"
    const json = { idUsuarioLoggeado: usuario, idAmigoAEliminar: amigo }
    return this.http.put(url, json).toPromise()
  }

}
