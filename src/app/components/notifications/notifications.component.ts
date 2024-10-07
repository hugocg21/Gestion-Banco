import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationsService, Notification } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html'
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  @Output() close = new EventEmitter<void>();

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notificationsService.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }

  deleteNotification(id: number): void {
    this.notificationsService.deleteNotification(id);
    this.loadNotifications();
  }

  closeNotifications(): void {
    this.close.emit();
  }
}
