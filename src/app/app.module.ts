import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BudgetComponent } from './components/budget/budget.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FinancialSummaryComponent } from './components/financial-summary/financial-summary.component';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { TransactionsService } from './services/transactions.service';
import { BudgetService } from './services/budget.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { MonthlySummaryComponent } from './components/monthly-summary/monthly-summary.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    DateFormatPipe,
    FinancialSummaryComponent,
    BudgetComponent,
    NotificationsComponent,
    TransactionsComponent,
    MonthlySummaryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatTooltipModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgbModule,
    NgbDatepickerModule
  ],
  providers: [provideAnimationsAsync(), TransactionsService, BudgetService],
  bootstrap: [AppComponent],
})
export class AppModule {}
