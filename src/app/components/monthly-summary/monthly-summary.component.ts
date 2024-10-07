import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-monthly-summary',
  templateUrl: './monthly-summary.component.html'
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
    // Obtener las transacciones anuales
    this.transactionsService.getTransactions().subscribe((transactions) => {
      const monthlyTotals: { [key: number]: { income: number; expense: number; ahorro: number } } = {};

      // Filtrar solo las transacciones que correspondan a los sueldos "Sueldo N1" o "Sueldo INDRA"
      const sueldoTransactions = transactions.filter(
        (t) =>
          t.type === 'income' &&
          (t.category === 'Sueldo N1' || t.category === 'Sueldo INDRA')
      );

      // Filtrar las transacciones de gastos
      const expenseTransactions = transactions.filter(t => t.type === 'expense');

      // Agrupar las transacciones de ingresos por mes
      sueldoTransactions.forEach((transaction) => {
        const month = new Date(transaction.date).getMonth(); // Obtener el mes de la transacción

        if (!monthlyTotals[month]) {
          monthlyTotals[month] = { income: 0, expense: 0, ahorro: 0 };
        }

        // Sumar los ingresos para ese mes
        monthlyTotals[month].income += transaction.amount;
      });

      // Agrupar las transacciones de gastos por mes
      expenseTransactions.forEach((transaction) => {
        const month = new Date(transaction.date).getMonth(); // Obtener el mes de la transacción

        if (!monthlyTotals[month]) {
          monthlyTotals[month] = { income: 0, expense: 0, ahorro: 0 };
        }

        // Sumar los gastos para ese mes
        monthlyTotals[month].expense += transaction.amount;
      });

      // Calcular el porcentaje de ahorro por mes
      Object.keys(monthlyTotals).forEach((monthKey) => {
        const monthData = monthlyTotals[+monthKey];

        // Verifica si hay ingresos para ese mes
        if (monthData.income > 0) {
          // Calcular el porcentaje de ahorro basado en ingresos y gastos reales
          monthData.ahorro = ((monthData.income - monthData.expense) / monthData.income) * 100;
        } else {
          // Si no hay ingresos, el porcentaje de ahorro es 0
          monthData.ahorro = 0;
        }
      });

      // Guardar los resultados en la propiedad para mostrar en el template
      this.monthlyTotals = monthlyTotals;
    });
  }
}
