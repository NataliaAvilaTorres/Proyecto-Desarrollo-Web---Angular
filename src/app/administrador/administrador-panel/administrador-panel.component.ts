import { 
  Component, 
  OnInit, 
  AfterViewInit, 
  ChangeDetectorRef, 
  ViewChild 
} from '@angular/core';
import { AdministradorService } from '../../service/administrador.service';
import { ChartData, ChartOptions, Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Registrar componentes necesarios de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-administrador-panel',
  templateUrl: './administrador-panel.component.html',
  styleUrls: ['./administrador-panel.component.css']
})
export class AdministradorPanelComponent implements OnInit, AfterViewInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  kpis: any = {};

  // Configuración de Pie Chart para Mascotas Activas e Inactivas
  pieChartDataMascotas: ChartData<'pie'> = {
    labels: ['Activas', 'Inactivas'],
    datasets: [
      {
        data: [0, 0], // Placeholder inicial hasta que se carguen los datos reales
        backgroundColor: ['#42A5F5', '#EF5350']
      }
    ]
  };

  pieChartOptionsMascotas: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: true, // Mantén la proporción del gráfico
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    layout: { padding: 20 }
  };

  // Configuración del gráfico Doughnut para Veterinarios
  gaugeDataVeterinarios: ChartData<'doughnut'> = {
    labels: ['Activos', 'Inactivos'],
    datasets: [
      {
        data: [5, 3], // Valores predeterminados
        backgroundColor: ['#66BB6A', '#EF5350']
      }
    ]
  };

  gaugeOptionsVeterinarios: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true }
    },
    cutout: '70%' // Configuración para doughnut
  };

  // Configuración del Mini Bar Chart para Top 3 Tratamientos
  miniBarData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726']
      }
    ]
  };

  miniBarOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: { y: { beginAtZero: true } }
  };

  constructor(
    private administradorService: AdministradorService,
    private cdr: ChangeDetectorRef // Inyección de ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Retraso de 500ms para asegurar que todo esté cargado antes de obtener los datos
    setTimeout(() => this.loadKPIs(), 500);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges(); // Forzar la detección de cambios tras la carga de la vista
  }

  loadKPIs(): void {
    this.administradorService.getDashboardKPIs().subscribe(
      (data) => {
        console.log('Datos recibidos del backend:', data);

        this.kpis = data;

        // Datos para Veterinarios Activos e Inactivos
        const veterinariosActivos = this.kpis.veterinariosActivos ?? 5;
        const veterinariosInactivos = this.kpis.veterinariosInactivos ?? 3;
        this.gaugeDataVeterinarios.datasets[0].data = [
          veterinariosActivos,
          veterinariosInactivos
        ];

        // Datos para Mascotas Activas e Inactivas
        const totalMascotas = this.kpis.totalMascotas || 0;
        const mascotasActivas = this.kpis.mascotasActivas || 0;
        const mascotasInactivas = totalMascotas - mascotasActivas;

        this.pieChartDataMascotas.datasets[0].data = [
          mascotasActivas,
          mascotasInactivas
        ];

        // Datos para el Top 3 de Tratamientos
        const topTratamientos = this.kpis.topTratamientos || [];
        this.miniBarData.labels = topTratamientos.map((t: [string, number]) => t[0]);
        this.miniBarData.datasets[0].data = topTratamientos.map((t: [string, number]) => t[1]);

        console.log('Datos del gráfico de Veterinarios:', this.gaugeDataVeterinarios.datasets[0].data);
        console.log('Datos del Pie Chart de Mascotas:', this.pieChartDataMascotas.datasets[0].data);

        // Forzar la actualización del gráfico Pie Chart
        this.chart?.update();

        this.cdr.detectChanges(); // Asegura que los cambios se apliquen
      },
      (error) => {
        console.error('Error al cargar los KPIs:', error);
      }
    );
  }
}
