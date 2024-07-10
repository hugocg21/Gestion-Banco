import { Component, OnInit } from '@angular/core';
import { PresupuestoService, Presupuesto } from '../../services/presupuesto.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.css']
})
export class PresupuestoComponent implements OnInit {
  presupuesto: Presupuesto = {
    categoria: '',
    monto: 0
  };
  presupuestos: Presupuesto[] = [];
  categoria: string = '';

  constructor(private presupuestoService: PresupuestoService) { }

  ngOnInit(): void {
    this.actualizarPresupuestos();
  }

  actualizarPresupuestos() {
    this.presupuestos = this.presupuestoService.obtenerPresupuestos();
  }

  agregarPresupuesto() {
    this.presupuestoService.agregarPresupuesto(this.presupuesto);
    this.actualizarPresupuestos();
    this.presupuesto = { categoria: '', monto: 0 };
  }

  eliminarPresupuesto(categoria: string) {
    this.presupuestoService.eliminarPresupuesto(categoria);
    this.actualizarPresupuestos();
  }
}
