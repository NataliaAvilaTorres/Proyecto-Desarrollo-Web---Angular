import { Component, OnInit } from '@angular/core';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { Tratamiento } from 'src/app/tratamiento/tratamiento';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  tratamientosList: Tratamiento[] = [];
  originalTratamientosList: Tratamiento[] = [];
  veterinarioId: number | null = null;
  isAdmin: boolean = false; // Verificar si el usuario es administrador

  constructor(
    private tratamientoService: TratamientoService
  ) { }

  ngOnInit(): void {
    // Obtener el rol del usuario
    const userRole = localStorage.getItem('userRole');
    this.isAdmin = userRole === 'ADMIN';

    if (this.isAdmin) {
      // Si es administrador, cargar todos los tratamientos
      this.cargarTodosLosTratamientos();
    } else {
      // Si es veterinario, cargar los tratamientos por veterinario
      this.veterinarioId = Number(localStorage.getItem('currentVeterinarioId'));
      if (this.veterinarioId) {
        this.cargarTratamientosDelVeterinario();
      }
    }
  }

  cargarTodosLosTratamientos(): void {
    this.tratamientoService.findAll().subscribe(
      (data: Tratamiento[]) => {
        this.tratamientosList = data;
        this.originalTratamientosList = [...this.tratamientosList];
      },
      (error) => {
        console.error('Error al obtener todos los tratamientos:', error);
      }
    );
  }

  cargarTratamientosDelVeterinario(): void {
    this.tratamientoService.getTratamientosByVeterinario(this.veterinarioId!).subscribe(
      (data: Tratamiento[]) => {
        this.tratamientosList = data;
        this.originalTratamientosList = [...this.tratamientosList];
      },
      (error) => {
        console.error('Error al obtener los tratamientos del veterinario:', error);
      }
    );
  }

  buscarTratamientos(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      this.tratamientosList = [...this.originalTratamientosList];
    } else {
      this.tratamientosList = this.originalTratamientosList.filter(tratamiento =>
        tratamiento.mascota?.nombre.toLowerCase().includes(searchTerm) ||
        tratamiento.medicamento?.nombre.toLowerCase().includes(searchTerm)
      );
    }
  }
}
