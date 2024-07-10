import { Component, OnInit } from '@angular/core';
import { NotificationsService, Notification } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.notificationsService.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }

  deleteNotification(id: number) {
    this.notificationsService.deleteNotification(id);
    this.notificationsService.getNotifications().subscribe(
      notifications => this.notifications = notifications
    );
  }
}
