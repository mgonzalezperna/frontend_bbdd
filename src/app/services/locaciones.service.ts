import { Injectable } from '@angular/core';
import { API_URL } from './configuration';
import { Http } from '@angular/http';
import { Locacion } from '../domain/Locacion';

@Injectable({
  providedIn: 'root'
})
export class LocacionesService {

  constructor(private http: Http) { }

  async getTodasLasLocaciones() {
    const url = API_URL + "/locaciones/"
    const resp = await this.http.get(url).toPromise()
    return resp.json().map(Locacion.fromJson)
  }

}
