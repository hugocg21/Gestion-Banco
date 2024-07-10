import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { Auth2FAComponent } from './components/auth2fa/auth2fa.component';
import { TransactionFormComponent } from './components/transaction-form/transaction-form.component';
import { FinancialSummaryComponent } from './components/financial-summary/financial-summary.component';
import { BudgetComponent } from './components/budget/budget.component';
import { TransactionsHistoryComponent } from './components/transactions-history/transactions-history.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'registro-movimientos', component: TransactionFormComponent },
  { path: 'resumen-financiero', component: FinancialSummaryComponent },
  { path: 'presupuesto', component: BudgetComponent },
  { path: 'historial-transacciones', component: TransactionsHistoryComponent },
  { path: 'notificaciones', component: NotificationsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auth-2fa', component: Auth2FAComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
