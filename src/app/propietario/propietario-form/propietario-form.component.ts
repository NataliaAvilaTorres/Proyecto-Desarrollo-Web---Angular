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
    contrasena: ''
  };
  isEditing: boolean = false;

  constructor(
    private propietarioService: PropietarioService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const propietarioId = +id;
      this.propietario = this.propietarioService.findPropietarioById(propietarioId);
    }
  }

  updatePropietario(form: NgForm): void {
    if (form.valid) {
      if (this.isEditing) {
        // Actualizar la mascota existente
        this.propietarioService.updatePropietario(this.propietario);
      } else {
        // Crear una nueva mascota
        this.propietarioService.addPropietario(this.propietario);
      }
      this.router.navigate(['/propietarios']);
    }
  }

}
