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
import { LoginComponent } from './components/login/login.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { ActiveLinkDirective } from './directives/active-link.directive';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    Auth2FAComponent,
    HeaderComponent,
    DateFormatPipe,
    FinancialSummaryComponent,
    BudgetComponent,
    NotificationsComponent,
    ActiveLinkDirective,
    TransactionsComponent,
    FooterComponent
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
