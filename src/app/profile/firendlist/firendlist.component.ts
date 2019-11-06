import { Component, OnInit } from '@angular/core';
import { Usuario } from "../../domain/Usuario";
import { UsuariosService } from "../../services/usuarios.service";
import { Http } from '@angular/http';

@Component({
  selector: 'app-firendlist',
  templateUrl: './firendlist.component.html',
  styleUrls: ['./firendlist.component.css']
})
export class FirendlistComponent implements OnInit {
  current_user: Usuario
  constructor(private usuariosService: UsuariosService, private http: Http) {
  }

  async ngOnInit() {
    try {
      this.current_user = await this.usuariosService.current_user()
      this.current_user.amigos = await this.usuariosService.amigos()
    } catch (error) {
      console.log(error) // mostrar errores
    }
  }

  async eliminarAmigo(amigo: Usuario) {
    try {
      await this.usuariosService.eliminarAmigo(this.current_user.id, amigo.id)
      this.current_user.eliminarAmigo(amigo)
      this.usuariosService.actualizarCantidadAmigos()
    } catch (error) {
      console.log(error) //mostrar errores
    }
  }


}
