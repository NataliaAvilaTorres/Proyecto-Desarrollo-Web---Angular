import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { NgForm } from '@angular/forms';
import { Propietario } from 'src/app/propietario/propietario';
import { PropietarioService } from 'src/app/service/propietario.service';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent {
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
  selectedPropietario: Propietario | null = null; // Propiedad añadida
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
      this.mascotaService.findMascotaById(mascotaId).subscribe(
        data => {
          this.mascota = data;
          this.selectedPropietario = data.propietario ?? null; // Asignar el propietario de la mascota actual o null si es undefined
        },
        error => {
          console.error('Error fetching mascota', error);
        }
      );
    }

    this.propietarioService.findAll().subscribe(
      data => {
        this.propietarioList = data;
      },
      error => {
        console.error('Error fetching propietarios', error);
      }
    );
  }

  updateMascota(form: NgForm): void {
    if (form.valid) {
      // Asignar el propietario seleccionado a la mascota
      if (this.selectedPropietario) {
        this.mascota.propietario = this.selectedPropietario;
      }

      if (this.isEditing) {
        this.mascotaService.updateMascota(this.mascota).subscribe(
          data => {
            this.router.navigate(['/mascotas']);
          },
          error => {
            console.error('Error updating mascota', error);
          }
        );
      } else {
        this.mascotaService.addMascota(this.mascota).subscribe(
          data => {
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
