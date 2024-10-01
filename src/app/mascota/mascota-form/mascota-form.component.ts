import { Component, OnInit } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { NgForm } from '@angular/forms';
import { Propietario } from 'src/app/propietario/propietario';
import { PropietarioService } from 'src/app/service/propietario.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent implements OnInit {
  mascota: Mascota = {
    id: 0,
    nombre: '',
    raza: '',
    edad: 0,
    peso: 0,
    enfermedad: '',
    fotoUrl: '',
    estado: '',
    propietario: { id: 0, nombre: '', cedula: '', correo: '', celular: '', contrasena: '', mascotas: [] }
  };

  propietarioList: Propietario[] = [];
  selectedPropietario: Propietario | null = null;
  isEditing: boolean = false;

  constructor(
    private mascotaService: MascotaService,
    private propietarioService: PropietarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const mascotaId = +id;

      // Obtener la mascota y los propietarios
      console.log('Fetching mascota with ID:', mascotaId);
      forkJoin({
        mascota: this.mascotaService.findMascotaById(mascotaId),
        propietarios: this.propietarioService.findAll()
      }).subscribe(
        ({ mascota, propietarios }) => {
          // Asignar los datos de la mascota y la lista de propietarios
          console.log('Mascota data fetched:', mascota);
          this.mascota = mascota;
          console.log('Propietarios list fetched:', propietarios);
          this.propietarioList = propietarios;

          // Intentar encontrar el propietario de la mascota
          this.findAndSetOwner();
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      // Si no se está editando una mascota, solo cargar la lista de propietarios
      console.log('Not editing any mascota, fetching propietarios list only.');
      this.propietarioService.findAll().subscribe(
        data => {
          this.propietarioList = data;
          console.log('Propietarios list:', this.propietarioList);
        },
        error => {
          console.error('Error fetching propietarios', error);
        }
      );
    }
  }

  /**
   * Encuentra y asigna el propietario de la mascota.
   */
  private findAndSetOwner(): void {
    // Verificar si la mascota ya tiene un propietario asignado por ID
    console.log('Checking if the mascota has an existing propietario by ID...');
    this.selectedPropietario = this.propietarioList.find(
      p => p.id === this.mascota.propietario?.id
    ) || null;

    console.log('Selected propietario based on ID:', this.selectedPropietario);

    // Si no se encontró el propietario por ID, buscar en la lista de mascotas de cada propietario
    if (!this.selectedPropietario) {
      console.log('No propietario found by ID, searching through each propietario\'s mascotas...');
      this.selectedPropietario = this.propietarioList.find(propietario =>
        propietario.mascotas.some(m => m.id === this.mascota.id)
      ) || null;

      console.log('Selected propietario after checking mascotas:', this.selectedPropietario);
    }

    // Si no se encontró propietario y estamos editando, mostrar mensaje de error
    if (!this.selectedPropietario) {
      console.warn('Warning: No propietario found for this mascota!');
    }

    // Sincronizar el propietario con la mascota si se encontró uno
    if (this.selectedPropietario) {
      this.mascota.propietario = this.selectedPropietario;
    }

    console.log('Final selected propietario:', this.selectedPropietario);
  }

  updateMascota(form: NgForm): void {
    console.log('Form is valid:', form.valid);
    if (form.valid) {
      console.log('Selected propietario is:', this.selectedPropietario);
      if (this.selectedPropietario) {
        this.mascota.propietario = this.selectedPropietario;
      }

      if (this.isEditing) {
        console.log('Updating mascota:', this.mascota);
        console.log('Data being sent to the backend:', JSON.stringify(this.mascota));

        this.mascotaService.updateMascota(this.mascota).subscribe(
          data => {
            console.log('Mascota updated successfully:', data);
            this.router.navigate(['/mascotas']);
          },
          error => {
            console.error('Error updating mascota', error);
          }
        );
      } else {
        console.log('Adding new mascota:', this.mascota);
        console.log('Data being sent to the backend:', JSON.stringify(this.mascota));
        this.mascotaService.addMascota(this.mascota).subscribe(
          data => {
            console.log('Mascota added successfully:', data);
            this.router.navigate(['/mascotas']);
          },
          error => {
            console.error('Error adding mascota', error);
          }
        );
      }
    }
  }
}