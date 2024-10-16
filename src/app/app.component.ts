import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dogin';

  constructor(private router: Router) { }

  // Función para determinar si se deben mostrar el header y footer
  showHeaderAndFooter(): boolean {
    const currentUrl = this.router.url;
    return !currentUrl.includes('/mascotas') && !currentUrl.includes('/mascota/detail') && !currentUrl.includes('/mascotaForm/update') && !currentUrl.includes('/mascotaForm/add') && !currentUrl.includes('/login') && !currentUrl.includes('/veterinarioPanel') && !currentUrl.includes('/propietarioForm/add') && !currentUrl.includes('/propietarioForm/update') && !currentUrl.includes('/propietarios') && !currentUrl.includes('/propietario/detail') && !currentUrl.includes('/propietarioPanel') && !currentUrl.includes('/propietarioMascotas') && !currentUrl.includes('/adminPanel') && !currentUrl.includes('/adminPanel/mascotaForm/add') && !currentUrl.includes('veterinarioForm/add') && !currentUrl.includes('veterinarios') && !currentUrl.includes('veterinarioForm/update') && !currentUrl.includes('veterinario/detail') && !currentUrl.includes('tratamiento/add') && !currentUrl.includes('historial/ver') ;
  }
}
