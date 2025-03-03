import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/mascota/mascota';
import { Veterinario } from 'src/app/veterinario/veterinario';
import { Medicamento } from 'src/app/tratamiento/medicamento';
import { Tratamiento } from 'src/app/tratamiento/tratamiento';
import { TratamientoService } from 'src/app/service/tratamiento.service';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { MedicamentoService } from 'src/app/service/medicamento.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-asignar-tratamiento',
  templateUrl: './asignar-tratamiento.component.html',
  styleUrls: ['./asignar-tratamiento.component.css']
})
export class AsignarTratamientoComponent implements OnInit {

  tratamiento: Tratamiento = {
    id: 0,
    fecha: new Date(),
    mascota: null,
    veterinario: null,
    medicamento: null,
    cantidad: 0  // Asegúrate de incluir la propiedad `cantidad`
  };
  

  mascotas: Mascota[] = [];
  medicamentos: Medicamento[] = [];
  unidadesSuministrar: number = 0; // Nueva propiedad para las unidades a suministrar

  constructor(
    private mascotaService: MascotaService,
    private tratamientoService: TratamientoService,
    private medicamentoService: MedicamentoService,
    private veterinarioService: VeterinarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMascotas(); // Llamar al método que carga las mascotas
    this.loadMedicamentos(); // Cargar los medicamentos
  }
  loadMascotas(): void {
    this.mascotaService.findAll().subscribe(
      (data: Mascota[]) => {
        // Filtrar las mascotas con estado "Activo"
        this.mascotas = data.filter(mascota => mascota.estado === 'Activo');
      },
      (error) => {
        console.error('Error fetching mascotas:', error);
      }
    );
  }

  loadMedicamentos(): void {
    this.medicamentoService.findAll().subscribe(
      (data: Medicamento[]) => {
        this.medicamentos = data; // Asignar los medicamentos obtenidos
      },
      (error) => {
        console.error('Error fetching medicamentos:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.tratamiento.fecha && this.tratamiento.mascota && this.tratamiento.medicamento) {
      const medicamentoSeleccionado = this.tratamiento.medicamento;
      if (medicamentoSeleccionado) {
        if (this.unidadesSuministrar > medicamentoSeleccionado.unidadesDisponibles) {
          alert('No hay suficientes unidades disponibles.');
          return;
        } else {
          // Restar las unidades suministradas
          console.log('Unidades a suministrar:', this.unidadesSuministrar);
          console.log('Unidades disponibles:', medicamentoSeleccionado.unidadesDisponibles);
          console.log('Unidades vendidas:', medicamentoSeleccionado.unidadesVendidas);
          medicamentoSeleccionado.unidadesDisponibles -= this.unidadesSuministrar;
          medicamentoSeleccionado.unidadesVendidas += this.unidadesSuministrar;
          // Asignar la cantidad de unidades suministradas al tratamiento
          this.tratamiento.cantidad = this.unidadesSuministrar;  // Asignar correctamente la cantidad
          console.log('Unidades disponibles:', medicamentoSeleccionado.unidadesDisponibles);
          console.log('Unidades vendidas:', medicamentoSeleccionado.unidadesVendidas);
          // Ajuste de fecha: suma un día
          const adjustedDate = new Date(this.tratamiento.fecha);
          adjustedDate.setDate(adjustedDate.getDate() + 1);
          this.tratamiento.fecha = adjustedDate;
          
          // Obtener el ID del veterinario del localStorage
          const veterinarioId = localStorage.getItem('currentVeterinarioId');
          if (veterinarioId) {
            this.veterinarioService.findVeterinarioById(+veterinarioId).subscribe({
              next: (veterinario) => {
                this.tratamiento.veterinario = veterinario;
  
                // Actualizar el medicamento en la base de datos
                this.medicamentoService.updateMedicamento(medicamentoSeleccionado).subscribe({
                  next: () => {
                    // Proceder a crear el tratamiento después de actualizar el medicamento
                    this.tratamientoService.addTratamiento(this.tratamiento).subscribe({
                      next: (response) => {
                        console.log('Tratamiento creado con éxito:', response);
                        alert('Tratamiento creado correctamente');
                        this.router.navigate(['/historial/ver']);
                      },
                      error: (error) => {
                        console.error('Error al crear tratamiento:', error);
                      }
                    });
                  },
                  error: (error) => {
                    console.error('Error al actualizar medicamento:', error);
                  }
                });
              },
              error: (error) => {
                console.error('Error al obtener veterinario:', error);
              }
            });
          }
        }
      }
    } else {
      console.error('Todos los campos son requeridos');
    }
  }
  
}