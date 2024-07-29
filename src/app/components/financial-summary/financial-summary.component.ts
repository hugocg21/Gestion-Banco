import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SummaryService } from '../../services/summary.service';

Chart.register(...registerables);

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css'],
})
export class FinancialSummaryComponent implements OnInit {
  monthlyIncome: number[] = [];
  monthlyExpenses: number[] = [];
  months: string[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  constructor(private summaryService: SummaryService) {}

  ngOnInit(): void {
    this.updateSummary();
  }

  updateSummary() {
    this.summaryService.getMonthlyTotals().subscribe((data) => {
      this.monthlyIncome = data.income;
      this.monthlyExpenses = data.expense;
      this.createChart();
    });
  }

  createChart() {
    const ctx = (document.getElementById('financialSummaryChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.months,
          datasets: [
            {
              label: 'Ingresos',
              data: this.monthlyIncome,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
            {
              label: 'Gastos',
              data: this.monthlyExpenses,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
