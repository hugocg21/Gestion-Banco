import { Injectable } from '@angular/core';
import { NotificacionesService } from './notificaciones.service';

export interface Presupuesto {
  categoria: string;
  monto: number;
}

@Injectable({
  providedIn: 'root'
})
export class PresupuestoService {
  private presupuestos: Presupuesto[] = [
    { categoria: 'Alquiler', monto: 1000 },
    { categoria: 'Supermercado', monto: 500 },
    { categoria: 'Transporte', monto: 200 },
    { categoria: 'Entretenimiento', monto: 150 },
    { categoria: 'Salud', monto: 300 },
    { categoria: 'Educación', monto: 400 },
    { categoria: 'Restaurante', monto: 200 },
    // Añadir más presupuestos de prueba aquí
  ];

  constructor(private notificacionesService: NotificacionesService) { }

  agregarPresupuesto(presupuesto: Presupuesto): void {
    this.presupuestos.push(presupuesto);
  }

  obtenerPresupuestos(): Presupuesto[] {
    return this.presupuestos;
  }

  eliminarPresupuesto(categoria: string): void {
    this.presupuestos = this.presupuestos.filter(p => p.categoria !== categoria);
  }

  obtenerPresupuestoPorCategoria(categoria: string): number {
    const presupuesto = this.presupuestos.find(p => p.categoria === categoria);
    return presupuesto ? presupuesto.monto : 0;
  }

  verificarExcesoPresupuesto(categoria: string, monto: number): void {
    const presupuesto = this.obtenerPresupuestoPorCategoria(categoria);
    if (monto > presupuesto) {
      this.notificacionesService.agregarAlertaSaldoBajo(`Se ha excedido el presupuesto para la categoría ${categoria}`);
    }
  }
}
