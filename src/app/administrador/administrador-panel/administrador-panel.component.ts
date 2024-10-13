import { Component, OnInit } from '@angular/core';
import { AdministradorService } from '../../service/administrador.service';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-administrador-panel',
  templateUrl: './administrador-panel.component.html',
  styleUrls: ['./administrador-panel.component.css']
})
export class AdministradorPanelComponent implements OnInit {
  kpis: any = {};
  barChartLabels: string[] = [];
  barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [],
        label: 'Unidades Vendidas',
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      }
    ]
  };

  barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  constructor(private administradorService: AdministradorService) {}

  ngOnInit(): void {
    this.loadKPIs();
  }

  loadKPIs(): void {
    this.administradorService.getDashboardKPIs().subscribe(
      (data) => {
        this.kpis = data;
        const topTratamientos = data.topTratamientos;

        // Ajustar los datos para el gráfico
        this.barChartLabels = topTratamientos.map((t: any) => t[0]);
        this.barChartData.datasets[0].data = topTratamientos.map((t: any) => t[1]);
      },
      (error) => {
        console.error('Error al cargar los KPIs:', error);
      }
    );
  }
}
