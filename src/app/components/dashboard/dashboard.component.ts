import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../../services/movimientos.service';
import { PresupuestoService } from '../../services/presupuesto.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ingresos: number = 0;
  gastos: number = 0;
  presupuesto: number = 0;

  constructor(
    private movimientosService: MovimientosService,
    private presupuestoService: PresupuestoService
  ) { }

  ngOnInit(): void {
    this.actualizarDashboard();
  }

  actualizarDashboard() {
    const totales = this.movimientosService.obtenerTotales();
    this.ingresos = totales.ingresos;
    this.gastos = totales.gastos;
    this.presupuesto = this.presupuestoService.obtenerPresupuestos().reduce((acc, p) => acc + p.monto, 0);
  }
}
