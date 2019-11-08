import { Injectable } from '@angular/core';
import { API_URL, userLoggedIn, userLoggedInId } from './configuration';
import { Http } from '@angular/http';
import { Categoria } from '../domain/Categoria';
import { Experiencia } from '../domain/Experiencia';
import { ReporteDescargas } from '../domain/ReporteDescargas';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  categoria: Categoria[]

  constructor(private http: Http) {
  }

  async topFive() {
    const url = API_URL + "/experiencias-descargas"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Experiencia.fromJson)
  }

  async reporteDescargas(fecha_desde: String, fecha_hasta: String, idCategoria: String) {
    const url = API_URL + "/cantidad-descargas"
    const json : any = {}
    json.fecha_desde = fecha_desde 
    json.fecha_hasta = fecha_hasta
    json.idCategoria = idCategoria
    console.log(json)
    const resp = await this.http.post(url, json).toPromise()
    return resp.json().map(ReporteDescargas.fromJson)
 }

   async crearCategoria(categoria: Categoria) {
    const url = API_URL + `/categorias/create`
    await this.http.post(url, categoria.toJSON()).toPromise()
  }
}
