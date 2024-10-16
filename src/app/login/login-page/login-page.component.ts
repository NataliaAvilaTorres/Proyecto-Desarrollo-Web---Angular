import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from 'src/app/service/administrador.service';
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
    private veterinarioService: VeterinarioService,
    private administradorService: AdministradorService
  ) { }

  // Función para iniciar sesión ayuda a guardar el correo y contraseña en el localStorage
  onSubmit() {
    if (this.role === 'dueno') {
      this.propietarioService.findAll().subscribe(propietarios => {
        const propietario = propietarios.find(p => p.correo === this.correo && p.contrasena === this.contrasena);
        if (propietario) {
          // Guardar el correo en el localStorage
          localStorage.setItem('currentUserEmail', this.correo);
          this.router.navigate(['/propietarioPanel']);
        } else {
          alert('Credenciales inválidas para dueño de mascota');
        }
      });
    } else if (this.role === 'veterinario') {
      this.veterinarioService.findAll().subscribe(veterinarios => {
        const veterinario = veterinarios.find(v => v.correo === this.correo && v.contrasena === this.contrasena);
        if (veterinario) {
        // Guardar el correo en el localStorage
        localStorage.setItem('currentUserEmail', this.correo);
        localStorage.setItem('currentVeterinarioId', veterinario.id.toString()); // Guardar el ID del veterinario
          this.router.navigate(['/veterinarioPanel']);
        } else {
          alert('Credenciales inválidas para veterinario');
        }
      });
    } else if (this.role === 'admin') {
      this.administradorService.findAll().subscribe(administradores => {
        const administrador = administradores.find(v => v.correo === this.correo && v.contrasena === this.contrasena);
        if (administrador) {
          this.router.navigate(['/adminPanel']);
        } else {
          alert('Credenciales inválidas para administrador');
        }
      });
    }else {
      alert('Por favor, seleccione un rol');
    }
  }
}
