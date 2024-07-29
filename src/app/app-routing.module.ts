import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinancialSummaryComponent } from './components/financial-summary/financial-summary.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { BudgetComponent } from './components/budget/budget.component';
import { LoginComponent } from './components/login/login.component';
import { Auth2FAComponent } from './components/auth2fa/auth2fa.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'financialSummary', component: FinancialSummaryComponent },
  { path: 'transactions', component: TransactionsComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
