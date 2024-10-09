import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private adminRoute: boolean = false;

  constructor(private router: Router) {}

  // Verifica si la URL actual incluye '/admin'
  checkIfAdminRoute(): void {
    this.adminRoute = this.router.url.includes('/admin');
  }

  // Retorna 'true' si la URL actual incluye '/admin'
  isAdminRoute(): boolean {
    return this.adminRoute;
  }
}
