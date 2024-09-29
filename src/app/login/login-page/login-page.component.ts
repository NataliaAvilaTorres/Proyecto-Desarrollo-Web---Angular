import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  correo: string = '';
  contrasena: string = '';
  role: string = '';

  constructor(
    private router: Router,
    private propietarioService: PropietarioService,
    private veterinarioService: VeterinarioService
  ) { }

  onSubmit() {
    if (this.role === 'dueno') {
      const propietario = this.propietarioService.findAll().find(
        p => p.correo === this.correo && p.contrasena === this.contrasena
      );
      if (propietario) {
        this.router.navigate(['/propietarioPanel']);
      } else {
        alert('Credenciales inválidas para dueño de mascota');
      }
    } else if (this.role === 'veterinario') {
      const veterinario = this.veterinarioService.veterinarioList.find(
        v => v.correo === this.correo && v.contrasena === this.contrasena
      );
      if (veterinario) {
        this.router.navigate(['/veterinarioPanel']);
      } else {
        alert('Credenciales inválidas para veterinario');
      }
    } else {
      alert('Por favor, seleccione un rol');
    }
  }

}
