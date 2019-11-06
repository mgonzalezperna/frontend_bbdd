import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormNuevoEventoComponent } from '../form-nuevo-evento.component';
import { Abierto } from '../../domain/Evento'
import { EventosService } from 'src/app/services/eventos.service';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-form-nuevo-evento-abierto',
  templateUrl: './form-nuevo-evento-abierto.component.html',
  styleUrls: ['./form-nuevo-evento-abierto.component.css']
})

export class FormNuevoEventoAbiertoComponent {

  errores:String[] = []
  @Input() fechaHoraInicio: Date
  edadMinima: Number
  precioEntrada: Number
  entradasVendidas: Number
  precioEntradaValidator:FormControl = new FormControl('', [Validators.required, Validators.min(0)]);
  edadMinimaValidator:FormControl = new FormControl('', [Validators.required, Validators.min(0)]);
  
  //Guardo las validaciones en un array para no complicarme la vida
  validaciones:FormControl[] = [
    this.parentComponent.nombreValidator,
    this.parentComponent.locacionValidator,
    this.parentComponent.fechaInicioValidator,
    this.precioEntradaValidator,
    this.edadMinimaValidator,
  ]

  constructor(private parentComponent: FormNuevoEventoComponent, private eventosService: EventosService) {
    this.parentComponent.tipoEvento = 'Abierto'  
  }

  getErrorMsgPrecioEntrada() {
    return this.precioEntradaValidator.hasError('required') ? "Se precisa precio de entrada" :
        this.precioEntradaValidator.hasError('min') ? "El precio de la entrada no puede ser menor a 0" :
        '';
  }

  getErrorMsgEdadMinima() {
    return this.edadMinimaValidator.hasError('required') ? "Debe ingresar una edad mínima" :
        this.edadMinimaValidator.hasError('min') ? "La edad minima no puede ser menor a 0" :
        '';
  }

  async submit() {
    this.errores = []
    var abierto = new Abierto()
    abierto.fechaHoraInicio = this.parentComponent.fechaHoraInicio
    abierto.edadMinima = this.edadMinima
    abierto.precioEntrada = this.precioEntrada
    abierto.descripcion = this.parentComponent.descripcion
    abierto.locacion = this.parentComponent.locacion
    abierto.organizador = this.parentComponent.organizador
    const response = await this.eventosService.nuevoAbierto(abierto)

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
