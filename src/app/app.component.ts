import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dogin';

  constructor(private router: Router) {}

  // Función para determinar si se deben mostrar el header y footer
  showHeaderAndFooter(): boolean {
    const currentUrl = this.router.url;
    // Oculta el header y footer en las rutas /mascotas y /mascota/detail/:id
    return !currentUrl.includes('/mascotas') && !currentUrl.includes('/mascota/detail') && !currentUrl.includes('/mascotaForm/update') && !currentUrl.includes('/mascotaForm/add');
  }
}
