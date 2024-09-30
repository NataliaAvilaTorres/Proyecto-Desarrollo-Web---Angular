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
  selectedPropietario: string = '';  // Añadimos la variable
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
      this.mascota = this.mascotaService.findMascotaById(mascotaId);
    }
  
    // Cargar lista de propietarios directamente si findAll() devuelve un arreglo
    this.propietarioList = this.propietarioService.findAll();
  }

  updateMascota(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        // Actualizar la mascota existente
        this.mascotaService.updateMascota(this.mascota);
      } else {
        // Crear una nueva mascota
        this.mascotaService.addMascota(this.mascota);
      }
      this.router.navigate(['/mascotas']);
    }
  }
}
