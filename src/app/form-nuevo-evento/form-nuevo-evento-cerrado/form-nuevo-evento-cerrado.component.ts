import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormNuevoEventoComponent } from '../form-nuevo-evento.component';
import { Cerrado } from '../../domain/Evento'
import { EventosService } from 'src/app/services/eventos.service';
import { FormControl, ValidatorFn, AbstractControl, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-form-nuevo-evento-cerrado',
  templateUrl: './form-nuevo-evento-cerrado.component.html',
  styleUrls: ['./form-nuevo-evento-cerrado.component.css']
})
export class FormNuevoEventoCerradoComponent {

  errores:String[] = []
  fechaHoraFin: Date
  fechaMaximaConfirmacion: Date
  fechaFinValidator:FormControl = new FormControl('', [Validators.required, this.validarFechaFin()]);
  fechaConfirmacionValidator:FormControl = new FormControl('', [Validators.required, this.validarFechaConfirmacion()]);  
  validaciones:FormControl[] = [
    this.parentComponent.nombreValidator,
    this.parentComponent.locacionValidator,
    this.parentComponent.fechaInicioValidator,
    this.fechaFinValidator,
    this.fechaConfirmacionValidator,
  ]

  @Output() notifyError: EventEmitter<String> = new EventEmitter();

  constructor(private parentComponent: FormNuevoEventoComponent, private eventosService: EventosService) {
    this.parentComponent.tipoEvento = 'Cerrado'  
  }

  //validador customizado, costo adaptarlo desde reactiveForms pero salio
  validarFechaFin():ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      return (new Date(this.parentComponent.fechaHoraInicio) >= new Date(control.value)) ? {valid:true} : null 
    }
  }

  validarFechaConfirmacion():ValidatorFn{
    return (control: AbstractControl): { [key: string]: any } | null => {
      return (new Date(this.parentComponent.fechaHoraInicio) < new Date(control.value)) ?
      {valid:true} : null 
    }
  }

  getErrorMsgFechaFin() {
    return this.fechaFinValidator.hasError('required') ? "Se precisa una fecha-hora correcta (formato AM/PM)" :
        this.fechaFinValidator.hasError('valid') ? "Debe ser posterior a la fecha de inicio" :
        '';
  }

  getErrorMsgFechaConfirmacion() {
    return this.fechaConfirmacionValidator.hasError('required') ? "Se precisa la fecha de confirmacion" :
        this.fechaConfirmacionValidator.hasError('valid') ? "Debe ser anterior a la fecha de inicio" :
        '';
  }

  async submit() {
    this.errores = []
    var cerrado = new Cerrado()
    cerrado.fechaHoraFin = this.fechaHoraFin
    cerrado.fechaHoraInicio = this.parentComponent.fechaHoraInicio
    cerrado.descripcion = this.parentComponent.descripcion
    cerrado.locacion = this.parentComponent.locacion
    cerrado.organizador = this.parentComponent.organizador
    cerrado.fechaMaximaConfirmacion = this.fechaMaximaConfirmacion
    const response = await this.eventosService.nuevoCerrado(cerrado)

    response.ok ? ( this.parentComponent.openSnackBar() , this.parentComponent.return() ):
      this.errores.push(response._body)
  }
  
  return(){
    this.parentComponent.return()
  }

  canAccept(){
    return !this.validaciones.every(item => item.valid === true)
  }

}
