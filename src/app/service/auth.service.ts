// File: src/app/service/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {}

  // Método para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/auth/login', credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.redirectUserByRole(response.token);
        }
      })
    );
  }

  // Método para redirigir basado en roles
  private redirectUserByRole(token: string) {
    const decoded: any = jwt_decode(token);
    const roles = decoded.roles;

    if (roles.includes('ROLE_ADMIN')) {
      this.router.navigate(['/adminPanel']);
    } else if (roles.includes('ROLE_VETERINARIO')) {
      this.router.navigate(['/veterinarioPanel']);
    } else if (roles.includes('ROLE_PROPETARIO')) {
      this.router.navigate(['/propietarioPanel']);
    } else {
      this.router.navigate(['/home']);
    }
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  // Método para obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const decoded: any = jwt_decode(token);
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(decoded.exp);

    return expirationDate > new Date();
  }

  // Método para verificar si el usuario tiene un rol específico
  hasRole(role: string): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    const decoded: any = jwt_decode(token);
    return decoded.roles.includes(role);
  }
}
