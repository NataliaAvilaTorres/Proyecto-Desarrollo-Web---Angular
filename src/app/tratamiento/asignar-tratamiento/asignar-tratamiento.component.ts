// AsignarTratamientoComponent.ts
import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/mascota/mascota';
import { Veterinario } from 'src/app/veterinario/veterinario';
import { Medicamento } from 'src/app/tratamiento/medicamento';
import { Tratamiento } from 'src/app/tratamiento/tratamiento';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoService } from 'src/app/service/medicamento.service';
import { TratamientoService } from 'src/app/service/tratamiento.service';

@Component({
  selector: 'app-asignar-tratamiento',
  templateUrl: './asignar-tratamiento.component.html',
  styleUrls: ['./asignar-tratamiento.component.css']
})
export class AsignarTratamientoComponent implements OnInit {
  tratamiento: Tratamiento = {
    id: 0,
    fecha: new Date(), 
    mascota: {} as Mascota, 
    veterinario: {} as Veterinario,
    medicamento: {} as Medicamento 
  };

  mascotas: Mascota[] = [];
  medicamentos: Medicamento[] = [];
  cantidad: number = 1;
  errorMensaje: string = '';
  cantidadValida: boolean = false;
  veterinario: Veterinario | null = null;

  constructor(
    private mascotaService: MascotaService,
    private medicamentoService: MedicamentoService,
    private tratamientoService: TratamientoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.loadMascotas(); // Llamar al método que carga las mascotas
    this.loadMedicamentos(); // Llamar al método que carga los medicamentos
=======
    console.log('Inicializando el componente AsignarTratamiento...');
    this.loadMascotas();
    this.loadMedicamentos();
>>>>>>> Stashed changes
  }

  loadMascotas(): void {
    console.log('Cargando mascotas...');
    this.mascotaService.findAll().subscribe(
      (data: Mascota[]) => {
        console.log('Mascotas obtenidas:', data);
        this.mascotas = data;
      },
      (error) => {
        console.error('Error al obtener las mascotas:', error);
        this.errorMensaje = 'Error al cargar las mascotas.';
      }
    );
  }

  loadMedicamentos(): void {
    console.log('Cargando medicamentos...');
    this.medicamentoService.findAll().subscribe(
      (data) => {
        console.log('Medicamentos obtenidos:', data);
        this.medicamentos = data;
      },
      (error) => {
        console.error('Error al cargar los medicamentos:', error);
        this.errorMensaje = 'Error al cargar los medicamentos.';
      }
    );
  }

  onMedicamentoChange(): void {
    console.log('Cambio en el medicamento seleccionado.');
    this.cantidad = 0;
    this.cantidadValida = false;
    this.errorMensaje = '';
  }

  verificarDisponibilidad(): void {
    console.log('Verificando disponibilidad...');
    console.log('ID del medicamento seleccionado:', this.tratamiento.medicamento.id);
    console.log('Cantidad solicitada:', this.cantidad);

    if (this.tratamiento.medicamento.id && this.cantidad > 0) {
      this.medicamentoService.findMedicamentoById(this.tratamiento.medicamento.id).subscribe(
        (medicamento) => {
          console.log('Medicamento obtenido:', medicamento);

          if (medicamento.unidadesDisponibles >= this.cantidad) {
            console.log('Suficientes unidades disponibles.');
            this.cantidadValida = true;
            console.log('Cantidad válida:', this.cantidadValida);
            this.errorMensaje = '';
          } else {
            console.warn(`Solo hay ${medicamento.unidadesDisponibles} unidades disponibles.`);
            this.cantidadValida = false;
            this.errorMensaje = `Solo hay ${medicamento.unidadesDisponibles} unidades disponibles.`;
          }
        },
        (error) => {
          console.error('Error al verificar disponibilidad:', error);
          this.errorMensaje = 'Error al verificar disponibilidad.';
          this.cantidadValida = false;
        }
      );
    } else {
      console.warn('ID de medicamento o cantidad inválida.');
      this.cantidadValida = false;
    }
  }

  onSubmit(): void {
    console.log('Formulario enviado.');
    console.log('Tratamiento:', this.tratamiento);
    console.log('Formulario enviado.');
    console.log('Tratamiento:', JSON.stringify(this.tratamiento, null, 2)); // Validación del JSON


    if (!this.cantidadValida) {
      console.warn('Cantidad no válida.');
      this.errorMensaje = 'Por favor, verifica la disponibilidad del medicamento.';
      return;
    }

    const storedVeterinario = localStorage.getItem('currentVeterinario');
    console.log('Veterinario almacenado en localStorage:', storedVeterinario);

    if (!storedVeterinario) {
      console.error('No se encontró veterinario en localStorage.');
      this.errorMensaje = 'Debe iniciar sesión como veterinario para asignar un tratamiento.';
      return;
    }

    const veterinario: Veterinario = JSON.parse(storedVeterinario);
    this.tratamiento.veterinario = veterinario;

    if (!this.tratamiento.mascota || !this.tratamiento.mascota.id) {
      console.warn('Mascota no seleccionada.');
      this.errorMensaje = 'Por favor, selecciona una mascota válida.';
      return;
    }

    if (!this.tratamiento.medicamento || !this.tratamiento.medicamento.id) {
      console.warn('Medicamento no seleccionado.');
      this.errorMensaje = 'Por favor, selecciona un medicamento válido.';
      return;
    }
    console.log('Tratamiento listo para guardar:', this.tratamiento); 
    this.actualizarInventarioYGuardarTratamiento();
  }

  private actualizarInventarioYGuardarTratamiento(): void {
    console.log('Actualizando inventario y guardando tratamiento...');
    this.medicamentoService.findMedicamentoById(this.tratamiento.medicamento.id).subscribe(
      (medicamento) => {
        console.log('Inventario antes de actualizar:', medicamento);
        medicamento.unidadesDisponibles -= this.cantidad;
        medicamento.unidadesVendidas += this.cantidad;

        this.medicamentoService.updateMedicamento(medicamento).subscribe(
          (updatedMedicamento) => {
            console.log('Inventario actualizado:', updatedMedicamento);
            this.guardarTratamiento();
          },
          (error) => {
            console.error('Error al actualizar inventario:', error);
            this.errorMensaje = `Error ${error.status}: ${error.message}`;
          }
        );
      },
      (error) => {
        console.error('Error al obtener medicamento:', error);
        this.errorMensaje = 'Error al obtener información del medicamento.';
      }
    );
  }

  testFunction(): void {
    console.log('¡Evento de prueba ejecutado!');
  }


  private guardarTratamiento(): void {
    console.log('Guardando tratamiento...');
    this.tratamientoService.addTratamiento(this.tratamiento).subscribe(
      (tratamientoCreado) => {
        console.log('Tratamiento creado:', tratamientoCreado);
        this.router.navigate(['/adminPanel']);
      },
      (error) => {
        console.error('Error al crear tratamiento:', error);
        this.errorMensaje = 'Error al crear el tratamiento.';
      }
    );
  }
}
