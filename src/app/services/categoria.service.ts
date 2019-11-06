import { Injectable } from '@angular/core';
import { Evento, Cerrado, Abierto } from "../domain/Evento";
import { API_URL, userLoggedIn, userLoggedInId } from './configuration';
import { Http } from '@angular/http';
import { Categoria } from '../domain/Categoria';
//import { eventos } from "../bootstrap"


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  categoria: Categoria[]

  constructor(private http: Http) {
  }

  async solicitarListadoCategorias() {
    const url = API_URL + "/categorias"
    const resp = await this.http.get(url).toPromise()
    return { status: resp.status , data: resp.json().map(Categoria.fromJson) }
  }

  actualizarCategoria(categoria: Categoria) {
    const url = API_URL + "/categoria/id/" + userLoggedIn
    return this.http.put(url, categoria.toJSON()).toPromise()
  }

  eliminar(categoria: Categoria) {
    const url = API_URL + "/categoria/eliminar"
    const json = { idCategoria: categoria }
    return this.http.put(url, json).toPromise()
  }
}