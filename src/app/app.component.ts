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
    return this.router.url !== '/mascotas';
  }
}
