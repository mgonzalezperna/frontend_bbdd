import { Injectable } from '@angular/core';
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
    return resp.json().map(Categoria.fromJson)
    // return { status: resp.status , data: resp.json().map(Categoria.fromJson) }
  }

  async actualizarCategoria(categoria: Categoria) {
    const url = API_URL + `/categorias/${categoria.idCategoria}/update`
    await this.http.post(url, categoria.toJSON()).toPromise()
  }

  async crearCategoria(categoria: Categoria) {
    const url = API_URL + `/categorias/create`
    return await this.http.post(url, categoria.toJSON()).toPromise()
  }

  async eliminar(categoria: Categoria) {
    const url = API_URL + `/categorias/${categoria.idCategoria}/delete`
    await this.http.post(url, {}).toPromise()
  }
}