import { Component, OnInit } from '@angular/core';
import { NotificacionesService, Notificacion } from '../../services/notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {
  notificaciones: Notificacion[] = [];

  constructor(private notificacionesService: NotificacionesService) { }

  ngOnInit(): void {
    this.notificacionesService.obtenerNotificaciones().subscribe(
      notificaciones => this.notificaciones = notificaciones
    );
  }

  eliminarNotificacion(id: number) {
    this.notificacionesService.eliminarNotificacion(id);
    this.notificacionesService.obtenerNotificaciones().subscribe(
      notificaciones => this.notificaciones = notificaciones
    );
  }
}
