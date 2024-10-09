import { Component } from '@angular/core';
import { Propietario } from '../propietario';
import { PropietarioService } from 'src/app/service/propietario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-propietario-form',
  templateUrl: './propietario-form.component.html',
  styleUrls: ['./propietario-form.component.css']
})
export class PropietarioFormComponent {

  propietario: Propietario = {
    id: 0,
    nombre: '',
    cedula: '',
    correo: '',
    celular: '',
    contrasena: '',
    mascotas: []
  };
  isEditing: boolean = false;

  constructor(
    private propietarioService: PropietarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  // Obtener el ID de la URL y buscar el propietario correspondiente para el formulario
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.propietarioService.findPropietarioById(+id).subscribe(
        data => this.propietario = data,
        error => console.error('Error fetching propietario', error)
      );
    }
  }

  // Enviando formulario
  updatePropietario(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        this.propietarioService.updatePropietario(this.propietario).subscribe(
          data => this.router.navigate(['/propietarios']),
          error => console.error('Error updating propietario', error)
        );
      } else {
        this.propietarioService.addPropietario(this.propietario).subscribe(
          data => this.router.navigate(['/propietarios']),
          error => console.error('Error adding propietario', error)
        );
      }
    }
  }
}
