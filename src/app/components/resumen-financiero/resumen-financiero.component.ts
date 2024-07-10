import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MovimientosService } from '../../services/movimientos.service';

Chart.register(...registerables);

@Component({
  selector: 'app-resumen-financiero',
  templateUrl: './resumen-financiero.component.html',
  styleUrls: ['./resumen-financiero.component.css']
})
export class ResumenFinancieroComponent implements OnInit {
  ingresos: number = 0;
  gastos: number = 0;
  totalesPorCategoria: { [categoria: string]: number } = {};

  constructor(private movimientosService: MovimientosService) { }

  ngOnInit(): void {
    this.actualizarResumen();
  }

  actualizarResumen() {
    const totales = this.movimientosService.obtenerTotales();
    this.ingresos = totales.ingresos;
    this.gastos = totales.gastos;
    this.totalesPorCategoria = this.movimientosService.obtenerTotalesPorCategoria();
    this.crearGrafico();
  }

  crearGrafico() {
    const ctx = (document.getElementById('miGrafico') as HTMLCanvasElement).getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(this.totalesPorCategoria),
          datasets: [{
            label: 'Gastos por Categoría',
            data: Object.values(this.totalesPorCategoria),
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
