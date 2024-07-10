import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Movimiento, MovimientosService } from '../../services/movimientos.service';

@Component({
  selector: 'app-registro-movimientos',
  templateUrl: './registro-movimientos.component.html',
  styleUrls: ['./registro-movimientos.component.css']
})
export class RegistroMovimientosComponent {
  movimiento: Movimiento = {
    id: 0,
    tipo: 'ingreso',
    categoria: '',
    monto: 0,
    fecha: new Date(),
    descripcion: ''
  };

  constructor(private movimientosService: MovimientosService) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.movimientosService.agregarMovimiento(this.movimiento);
      form.resetForm();
      this.movimiento = {
        id: 0,
        tipo: 'ingreso',
        categoria: '',
        monto: 0,
        fecha: new Date(),
        descripcion: ''
      };
    }
  }
}
