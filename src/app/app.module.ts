import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Auth2FAComponent } from './components/auth2fa/auth2fa.component';
import { BudgetComponent } from './components/budget/budget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinancialSummaryComponent } from './components/financial-summary/financial-summary.component';
import { HeaderComponent } from './components/header/header.component';
import { HistorialTransaccionesComponent } from './components/historial-transacciones/historial-transacciones.component';
import { LoginComponent } from './components/login/login.component';
import { NotificacionesComponent } from './components/notificaciones/notificaciones.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { RegistroMovimientosComponent } from './components/registro-movimientos/registro-movimientos.component';
import { ResumenFinancieroComponent } from './components/resumen-financiero/resumen-financiero.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { DateFormatPipe } from './pipes/date-format.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegistroMovimientosComponent,
    ResumenFinancieroComponent,
    PresupuestoComponent,
    HistorialTransaccionesComponent,
    NotificacionesComponent,
    DashboardComponent,
    LoginComponent,
    Auth2FAComponent,
    HeaderComponent,
    DateFormatPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
