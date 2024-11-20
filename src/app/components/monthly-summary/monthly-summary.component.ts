import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html',
})
export class MonthlySummaryComponent implements OnInit {
  ingresoFijo: number = 3000; // Ingreso fijo para calcular el ahorro
  monthlyTotals: { [key: number]: { income: number; expense: number; ahorro: number } } = {};
  months = [
    { value: 1, name: 'Enero' },
    { value: 2, name: 'Febrero' },
    { value: 3, name: 'Marzo' },
    { value: 4, name: 'Abril' },
    { value: 5, name: 'Mayo' },
    { value: 6, name: 'Junio' },
    { value: 7, name: 'Julio' },
    { value: 8, name: 'Agosto' },
    { value: 9, name: 'Septiembre' },
    { value: 10, name: 'Octubre' },
    { value: 11, name: 'Noviembre' },
    { value: 12, name: 'Diciembre' },
  ];

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {
    this.calculateAverages();
  }

  calculateAverages(): void {
    this.transactionsService.getMonthlyIncomeAndExpenses().subscribe((data) => {
      const monthlyTotals: { [key: number]: { income: number; expense: number; ahorro: number } } = {};

      data.income.forEach((income, month) => {
        const expense = data.expense[month];
        const ahorro = income > 0 ? ((income - expense) / income) * 100 : 0;

        monthlyTotals[month] = {
          income,
          expense,
          ahorro,
        };
      });

      this.monthlyTotals = monthlyTotals;
    });
  }
}
