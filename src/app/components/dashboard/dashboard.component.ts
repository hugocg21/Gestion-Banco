import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import { Chart, registerables } from 'chart.js';
import { MatTabChangeEvent } from '@angular/material/tabs';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit, AfterViewInit {
  monthlyIncome: number[] = [];
  monthlyExpenses: number[] = [];
  annualExpensesByCategory: { [category: string]: number } = {};
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

  @ViewChild('financialSummaryChart') financialSummaryChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expenseDistributionChart') expenseDistributionChart!: ElementRef<HTMLCanvasElement>;

  private summaryChartInstance: Chart | undefined;
  private expenseChartInstance: Chart | undefined;

  constructor(private transactionsService: TransactionsService) {}

  ngOnInit(): void {

    this.transactionsService.transactionsChanged.subscribe(() => {
      this.updateSummary();
      this.updateExpenseDistribution();
    });


    this.updateSummary();
    this.updateExpenseDistribution();
  }

  ngAfterViewInit(): void {
    if (this.financialSummaryChart) {
      this.createChart(this.financialSummaryChart.nativeElement);
    }
  }

  updateSummary() {
    this.transactionsService.getAnnualIncomeExpense().subscribe((data) => {
      console.log('Datos de ingresos y gastos:', data);
      this.monthlyIncome = data.map((item) => item.income);
      this.monthlyExpenses = data.map((item) => item.expense);

      if (this.financialSummaryChart) {
        this.createChart(this.financialSummaryChart.nativeElement);
      }
    });
  }

  updateExpenseDistribution() {
    this.transactionsService.getAnnualExpensesByCategory().subscribe((data) => {
      console.log('Datos de gastos por categoría:', data);
      this.annualExpensesByCategory = data;

      if (this.expenseDistributionChart) {
        this.createExpenseDistributionChart(this.expenseDistributionChart.nativeElement);
      }
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    const tabIndex = event.index;
    if (tabIndex === 1 && this.expenseDistributionChart) {
      this.createExpenseDistributionChart(this.expenseDistributionChart.nativeElement);
    }
  }

  createChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.summaryChartInstance) {
        this.summaryChartInstance.destroy();
      }
      this.summaryChartInstance = new Chart(ctx, {
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
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }

  createExpenseDistributionChart(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    if (ctx) {
      if (this.expenseChartInstance) {
        this.expenseChartInstance.destroy();
      }

      if (Object.keys(this.annualExpensesByCategory).length === 0) {
        console.warn('No hay datos para mostrar en el gráfico de gastos por categoría.');
        return;
      }

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.annualExpensesByCategory),
          datasets: [
            {
              label: 'Gastos por Categoría',
              data: Object.values(this.annualExpensesByCategory),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }
}
