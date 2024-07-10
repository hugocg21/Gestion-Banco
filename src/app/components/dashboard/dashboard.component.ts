import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { BudgetService } from '../../services/budget.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  income: number = 0;
  expenses: number = 0;
  totalBudget: number = 0;

  constructor(
    private transactionsService: TransactionsService,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.updateDashboard();
  }

  updateDashboard() {
    const totals = this.transactionsService.getTotals();
    this.income = totals.income;
    this.expenses = totals.expense;
    this.totalBudget = this.budgetService.getBudgets().reduce((acc, b) => acc + b.amount, 0);
  }
}
