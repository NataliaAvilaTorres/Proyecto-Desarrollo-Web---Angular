import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';
import { Veterinario } from '../veterinario';

@Component({
  selector: 'app-veterinario-form',
  templateUrl: './veterinario-form.component.html',
  styleUrls: ['./veterinario-form.component.css']
})
export class VeterinarioFormComponent {

  veterinario: Veterinario = {
    id: 0,
    nombre: '',
    cedula: '',
    especialidad: '',
    correo: '',
    contrasena: '',
    estado: ''
  };

  isEditing: boolean = false;

  constructor(
    private veterinarioService: VeterinarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Obtener el ID de la URL y buscar el veterinario correspondiente para el formulario
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.veterinarioService.findVeterinarioById(+id).subscribe(
        data => this.veterinario = data,
        error => console.error('Error fetching veterinario', error)
      );
    }
  }

  // Enviando formulario
  updateVeterinario(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        this.veterinarioService.updateVeterinario(this.veterinario).subscribe(
          data => this.router.navigate(['/veterinarios']),
          error => console.error('Error updating veterinario', error)
        );
      } else {
        this.veterinarioService.addVeterinario(this.veterinario).subscribe(
          data => this.router.navigate(['/veterinarios']),
          error => console.error('Error adding veterinario', error)
        );
      }
    }
  }
}