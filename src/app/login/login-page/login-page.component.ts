import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

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
    private authService: AuthService
  ) {}

  // Función para iniciar sesión
  onSubmit() {
    if (!this.role) {
      alert('Por favor, seleccione un rol');
      return;
    }

    // Enviar credenciales al AuthService
    const credentials = {
      correo: this.correo,
      contrasena: this.contrasena,
      role: this.role  // role ahora está en el formato correcto, como "ROLE_ADMIN", "ROLE_VETERINARIO" o "ROLE_PROPETARIO"
    };

    this.authService.login(credentials).subscribe(
      () => {
        // La redirección se maneja en el AuthService según el rol
      },
      error => {
        console.error('Error de autenticación', error);
        alert('Credenciales inválidas');
      }
    );
  }
}
