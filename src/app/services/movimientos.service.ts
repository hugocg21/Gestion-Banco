import { Injectable } from '@angular/core';

export interface Movimiento {
  id: number;
  tipo: 'ingreso' | 'gasto';
  categoria: string;
  monto: number;
  fecha: Date;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private movimientos: Movimiento[] = [
    { id: 1, tipo: 'ingreso', categoria: 'Salario', monto: 3000, fecha: new Date('2024-01-01'), descripcion: 'Salario de enero' },
    { id: 2, tipo: 'gasto', categoria: 'Alquiler', monto: 1000, fecha: new Date('2024-01-05'), descripcion: 'Pago de alquiler' },
    { id: 3, tipo: 'gasto', categoria: 'Supermercado', monto: 150, fecha: new Date('2024-01-06'), descripcion: 'Compra en supermercado' },
    { id: 4, tipo: 'gasto', categoria: 'Transporte', monto: 50, fecha: new Date('2024-01-07'), descripcion: 'Gastos de transporte' },
    { id: 5, tipo: 'ingreso', categoria: 'Freelance', monto: 500, fecha: new Date('2024-01-10'), descripcion: 'Trabajo freelance' },
    { id: 6, tipo: 'gasto', categoria: 'Entretenimiento', monto: 100, fecha: new Date('2024-01-12'), descripcion: 'Cine y cena' },
    { id: 7, tipo: 'gasto', categoria: 'Salud', monto: 200, fecha: new Date('2024-01-15'), descripcion: 'Compra de medicamentos' },
    { id: 8, tipo: 'ingreso', categoria: 'Venta', monto: 300, fecha: new Date('2024-01-18'), descripcion: 'Venta de artículos usados' },
    { id: 9, tipo: 'gasto', categoria: 'Educación', monto: 250, fecha: new Date('2024-01-20'), descripcion: 'Curso online' },
    { id: 10, tipo: 'gasto', categoria: 'Restaurante', monto: 80, fecha: new Date('2024-01-22'), descripcion: 'Cena en restaurante' },
    // Añadir más datos de prueba aquí
  ];

  constructor() { }

  agregarMovimiento(movimiento: Movimiento): void {
    movimiento.id = this.movimientos.length ? Math.max(...this.movimientos.map(m => m.id)) + 1 : 1;
    this.movimientos.push(movimiento);
  }

  obtenerMovimientos(): Movimiento[] {
    return this.movimientos;
  }

  filtrarMovimientos(categoria: string): Movimiento[] {
    return this.movimientos.filter(m => m.categoria === categoria);
  }

  eliminarMovimiento(id: number): void {
    this.movimientos = this.movimientos.filter(m => m.id !== id);
  }

  obtenerTotales(): { ingresos: number, gastos: number } {
    const ingresos = this.movimientos.filter(m => m.tipo === 'ingreso').reduce((sum, m) => sum + m.monto, 0);
    const gastos = this.movimientos.filter(m => m.tipo === 'gasto').reduce((sum, m) => sum + m.monto, 0);
    return { ingresos, gastos };
  }

  obtenerTotalesPorCategoria(): { [categoria: string]: number } {
    return this.movimientos.reduce((acc, m) => {
      if (!acc[m.categoria]) {
        acc[m.categoria] = 0;
      }
      acc[m.categoria] += m.monto;
      return acc;
    }, {} as { [categoria: string]: number });
  }
}
