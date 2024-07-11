import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { BudgetService } from '../../services/budget.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  income: number = 0;
  expenses: number = 0;
  totalBudget: number = 0;
  balance: number = 0;

  constructor(
    private transactionsService: TransactionsService,
    private budgetService: BudgetService
  ) { }

  ngOnInit(): void {
    this.updateDashboard();
  }

  updateDashboard() {
    this.transactionsService.getTotals().subscribe(totals => {
      this.income = totals.income;
      this.expenses = totals.expense;
      this.totalBudget = this.budgetService.getBudgets().reduce((acc, b) => acc + b.amount, 0);
      this.balance = this.income - this.expenses;
      this.createIncomeExpenseChart();
    });

    this.transactionsService.getTotalsByCategory().subscribe(totalsByCategory => {
      this.createExpenseDistributionChart(totalsByCategory);
    });
  }

  createIncomeExpenseChart() {
    const ctx = (document.getElementById('incomeExpenseChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Ingresos', 'Gastos'],
          datasets: [{
            label: 'Monto',
            data: [this.income, this.expenses],
            backgroundColor: [
              'rgba(75, 192, 192, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  createExpenseDistributionChart(totalsByCategory: { [category: string]: number }) {
    const ctx = (document.getElementById('expenseDistributionChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(totalsByCategory),
          datasets: [{
            label: 'Gastos por Categoría',
            data: Object.values(totalsByCategory),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    }
  }
}
