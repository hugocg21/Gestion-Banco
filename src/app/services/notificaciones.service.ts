import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Notificacion {
  id: number;
  mensaje: string;
  tipo: 'recordatorio' | 'alerta';
  fecha: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificaciones: Notificacion[] = [
    { id: 1, mensaje: 'Pago de alquiler', tipo: 'recordatorio', fecha: new Date('2024-02-01') },
    { id: 2, mensaje: 'Compra en supermercado', tipo: 'alerta', fecha: new Date('2024-02-05') },
    { id: 3, mensaje: 'Gastos de transporte', tipo: 'recordatorio', fecha: new Date('2024-02-07') },
    { id: 4, mensaje: 'Trabajo freelance', tipo: 'alerta', fecha: new Date('2024-02-10') },
    { id: 5, mensaje: 'Cine y cena', tipo: 'recordatorio', fecha: new Date('2024-02-12') },
    { id: 6, mensaje: 'Compra de medicamentos', tipo: 'alerta', fecha: new Date('2024-02-15') },
    // Añadir más notificaciones de prueba aquí
  ];

  constructor() { }

  agregarNotificacion(notificacion: Notificacion): void {
    notificacion.id = this.notificaciones.length ? Math.max(...this.notificaciones.map(n => n.id)) + 1 : 1;
    this.notificaciones.push(notificacion);
  }

  obtenerNotificaciones(): Observable<Notificacion[]> {
    return of(this.notificaciones);
  }

  eliminarNotificacion(id: number): void {
    this.notificaciones = this.notificaciones.filter(n => n.id !== id);
  }

  agregarRecordatorioPago(mensaje: string, fecha: Date): void {
    const notificacion: Notificacion = {
      id: 0,
      mensaje: `Recordatorio de pago: ${mensaje}`,
      tipo: 'recordatorio',
      fecha: fecha
    };
    this.agregarNotificacion(notificacion);
  }

  agregarAlertaSaldoBajo(mensaje: string): void {
    const notificacion: Notificacion = {
      id: 0,
      mensaje: `Alerta de saldo bajo: ${mensaje}`,
      tipo: 'alerta',
      fecha: new Date()
    };
    this.agregarNotificacion(notificacion);
  }
}
