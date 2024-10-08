import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private adminRoute: boolean = false;

  constructor(private router: Router) {}

  checkIfAdminRoute(): void {
    this.adminRoute = this.router.url.includes('/admin');
  }

  isAdminRoute(): boolean {
    return this.adminRoute;
  }
}
