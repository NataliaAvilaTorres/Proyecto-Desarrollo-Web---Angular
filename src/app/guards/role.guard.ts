import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Redirigir al panel correspondiente si el usuario ya está autenticado y en el login
    if (state.url === '/login') {
      this.redirectUserByRole();
      return false;
    }

    const hasRole = expectedRoles.some((role: string) => this.authService.hasRole(role));
    
    if (!hasRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }
    
    return true;
  }

  // Redirección basada en el rol
  private redirectUserByRole() {
    if (this.authService.hasRole('ROLE_ADMIN')) {
      this.router.navigate(['/adminPanel']);
    } else if (this.authService.hasRole('ROLE_VETERINARIO')) {
      this.router.navigate(['/veterinarioPanel']);
    } else if (this.authService.hasRole('ROLE_PROPETARIO')) {
      this.router.navigate(['/propietarioPanel']);
    }
  }
}
