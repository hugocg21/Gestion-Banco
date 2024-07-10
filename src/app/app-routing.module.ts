import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroMovimientosComponent } from './components/registro-movimientos/registro-movimientos.component';
import { ResumenFinancieroComponent } from './components/resumen-financiero/resumen-financiero.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { HistorialTransaccionesComponent } from './components/historial-transacciones/historial-transacciones.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Auth2FAComponent } from './components/auth2fa/auth2fa.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'registro-movimientos', component: RegistroMovimientosComponent },
  { path: 'resumen-financiero', component: ResumenFinancieroComponent },
  { path: 'presupuesto', component: PresupuestoComponent },
  { path: 'historial-transacciones', component: HistorialTransaccionesComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth-2fa', component: Auth2FAComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
