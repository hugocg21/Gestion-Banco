import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SummaryService } from '../../services/summary.service';

Chart.register(...registerables);

@Component({
  selector: 'app-financial-summary',
  templateUrl: './financial-summary.component.html',
  styleUrls: ['./financial-summary.component.css']
})
export class FinancialSummaryComponent implements OnInit {
  income: number = 0;
  expense: number = 0;
  totalsByCategory: { [category: string]: number } = {};

  constructor(private summaryService: SummaryService) { }

  ngOnInit(): void {
    this.updateSummary();
  }

  updateSummary() {
    const totals = this.summaryService.getTotals();
    this.income = totals.income;
    this.expense = totals.expense;
    this.totalsByCategory = this.summaryService.getTotalsByCategory();
    this.createChart();
  }

  createChart() {
    const ctx = (document.getElementById('myChart') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.totalsByCategory),
          datasets: [{
            label: 'Expenses by Category',
            data: Object.values(this.totalsByCategory),
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
