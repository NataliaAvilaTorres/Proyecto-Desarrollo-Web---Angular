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
      forkJoin({
        mascota: this.mascotaService.findMascotaById(mascotaId),
        propietarios: this.propietarioService.findAll()
      }).subscribe(
        ({ mascota, propietarios }) => {
          // Asignar los datos de la mascota y la lista de propietarios
          this.mascota = mascota;
          this.propietarioList = propietarios;

          // Verificar si `propietario` está presente y tiene un `id`
          console.log('ID de propietario de la mascota:', this.mascota.propietario?.id);
          console.log('ID de propietarios en lista:', this.propietarioList.map(p => p.id));

          // Buscar y asignar el propietario seleccionado asegurando la comparación de `id`s como cadenas
          this.selectedPropietario = this.propietarioList.find(
            p => String(p.id) === String(this.mascota.propietario?.id)
          ) || null;

          // Si se encuentra el propietario, asegúrate de sincronizarlo
          if (this.selectedPropietario) {
            this.mascota.propietario = this.selectedPropietario;
          }

          console.log('Mascota:', this.mascota);
          console.log('Propietarios:', this.propietarioList);
          console.log('Selected Propietario:', this.selectedPropietario);
        },
        error => {
          console.error('Error fetching data', error);
        }
      );
    } else {
      // Si no se está editando una mascota, solo cargar la lista de propietarios
      this.propietarioService.findAll().subscribe(
        data => {
          this.propietarioList = data;
        },
        error => {
          console.error('Error fetching propietarios', error);
        }
      );
    }
  }

  updateMascota(form: NgForm): void {
    if (form.valid) {
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
