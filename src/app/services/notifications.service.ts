import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  type: 'reminder' | 'alert';
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private notifications: Notification[] = [
    { id: 1, message: 'Pago de alquiler', type: 'reminder', date: new Date('2024-02-01') },
    { id: 2, message: 'Compra en supermercado', type: 'alert', date: new Date('2024-02-05') },
    { id: 3, message: 'Gastos de transporte', type: 'reminder', date: new Date('2024-02-07') },
    { id: 4, message: 'Trabajo freelance', type: 'alert', date: new Date('2024-02-10') },
    { id: 5, message: 'Cine y cena', type: 'reminder', date: new Date('2024-02-12') },
    { id: 6, message: 'Compra de medicamentos', type: 'alert', date: new Date('2024-02-15') },
    // Añadir más notificaciones de prueba aquí
  ];

  constructor() { }

  addNotification(notification: Notification): void {
    notification.id = this.notifications.length ? Math.max(...this.notifications.map(n => n.id)) + 1 : 1;
    this.notifications.push(notification);
  }

  getNotifications(): Observable<Notification[]> {
    return of(this.notifications);
  }

  deleteNotification(id: number): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
  }

  addPaymentReminder(message: string, date: Date): void {
    const notification: Notification = {
      id: 0,
      message: `Recordatorio de pago: ${message}`,
      type: 'reminder',
      date: date
    };
    this.addNotification(notification);
  }

  addLowBalanceAlert(message: string): void {
    const notification: Notification = {
      id: 0,
      message: `Alerta de saldo bajo: ${message}`,
      type: 'alert',
      date: new Date()
    };
    this.addNotification(notification);
  }
}
