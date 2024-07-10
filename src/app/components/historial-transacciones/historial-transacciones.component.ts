import { Component, OnInit } from '@angular/core';
import { MovimientosService, Movimiento } from '../../services/movimientos.service';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.component.html',
  styleUrls: ['./historial-transacciones.component.css']
})
export class HistorialTransaccionesComponent implements OnInit {
  movimientos: Movimiento[] = [];
  filtro: string = '';
  filtroCategoria: string = '';
  categorias: string[] = [];

  constructor(private movimientosService: MovimientosService) { }

  ngOnInit(): void {
    this.movimientos = this.movimientosService.obtenerMovimientos();
    this.categorias = [...new Set(this.movimientos.map(m => m.categoria))];
  }

  get movimientosFiltrados(): Movimiento[] {
    return this.movimientos.filter(m => {
      return (!this.filtro || m.descripcion.toLowerCase().includes(this.filtro.toLowerCase())) &&
             (!this.filtroCategoria || m.categoria === this.filtroCategoria);
    });
  }

  eliminarMovimiento(id: number) {
    this.movimientosService.eliminarMovimiento(id);
    this.movimientos = this.movimientosService.obtenerMovimientos();
  }
}
