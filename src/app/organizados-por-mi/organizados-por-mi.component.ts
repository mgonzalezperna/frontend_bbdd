import { Component, OnInit, Output } from '@angular/core';
import { UsuariosService } from "../services/usuarios.service";
import { Evento } from "../domain/Evento"
import { EventosService } from '../services/eventos.service';
import { isEmpty } from "lodash"

@Component({
  selector: 'app-organizados-por-mi',
  templateUrl: './organizados-por-mi.component.html',
  styleUrls: ['./organizados-por-mi.component.css']
})
export class OrganizadosPorMiComponent{

  constructor() { }
}
