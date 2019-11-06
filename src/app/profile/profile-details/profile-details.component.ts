import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../domain/Usuario";
import { UsuariosService } from "../../services/usuarios.service";


@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.css']
})
export class ProfileDetailsComponent implements OnInit {
  current_user: Usuario
  cantidadAmigos: number
  constructor(private usuariosService: UsuariosService) {
  }

  async ngOnInit() {
    try {
      this.current_user = await this.usuariosService.current_user()
    } catch (error) {
      console.log(error) // mostrar errores
    }
  }

}
