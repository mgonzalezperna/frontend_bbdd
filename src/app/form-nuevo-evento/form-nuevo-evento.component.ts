import { Component, OnInit, Output, Input } from '@angular/core';
import { Evento } from "../domain/Evento"
import { Locacion } from "../domain/Locacion";
import { Usuario } from "../domain/Usuario";
import { UsuariosService } from "../services/usuarios.service";
import { EventosService } from '../services/eventos.service';
import { Router } from '@angular/router';
import { LocacionesService } from '../services/locaciones.service';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-form-nuevo-evento',
  templateUrl: './form-nuevo-evento.component.html',
  styleUrls: ['./form-nuevo-evento.component.css']
})
export class FormNuevoEventoComponent implements OnInit {

  tipoEvento: String
  descripcion: String
  fechaHoraInicio: Date
  locaciones: Locacion[]
  locacion: Locacion
  organizador: Usuario
  cancelado: Boolean
  nombreValidator:FormControl = new FormControl('', [Validators.required]);
  locacionValidator:FormControl = new FormControl('', [Validators.required]);
  fechaInicioValidator:FormControl = new FormControl('', [Validators.required, this.validarFecha()]);

  constructor(private usuariosService: UsuariosService, private eventosService: EventosService, private router: Router, private locacionesService: LocacionesService, public snackBar: MatSnackBar) { }

  async ngOnInit() {
    this.organizador = await this.usuariosService.current_user()
    this.locaciones = await this.locacionesService.getTodasLasLocaciones()
  }

  validarFecha():ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      return ( new Date() > new Date(control.value)) ? { valid:true } : null 
    }
  }

  getErrorMsgFechaInicio() {
    console.log()
    return this.fechaInicioValidator.hasError('required') ? "Se precisa una fecha-hora correcta (formato AM/PM)" :
        this.fechaInicioValidator.hasError('valid') ? "La fecha de inicio no puede ser previa a hoy" :
        '';
  }


  getErrorMsgNombre() {
    return this.nombreValidator.hasError('required') ? "Se requiere ingresar un nombre para el Evento" :
        '';
  }

  getErrorMsgLocacion() {
    return this.locacionValidator.hasError('required') ? "Se precisa indicar la locacion del Evento" :
        '';
  }
    
  openSnackBar() {
    this.snackBar.open("Se ha creado el nuevo evento " + this.tipoEvento + " " + this.descripcion + " con exito!", null ,{
      duration: 2000,
    });
  }

  return(){
    this.router.navigate(['/mis-eventos/organizados-por-mi']);
  }

  onLoad(tipoEvento: String){
    console.log(tipoEvento)
    return tipoEvento
  }

}
