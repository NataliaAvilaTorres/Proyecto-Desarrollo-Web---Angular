import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../administrador/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  private apiUrl = 'http://localhost:8090/api/administradores'; // URL de la API para administrador

  constructor(private http: HttpClient) { }

    // Obtener todas los admin
    findAll(): Observable<Administrador[]> {
      return this.http.get<Administrador[]>(`${this.apiUrl}/`);
    }
  
    // Obtener un admin por su ID
    findAdministradorById(id: number): Observable<Administrador> {
      return this.http.get<Administrador>(`${this.apiUrl}/${id}`);
    }
  
    // Actualizar un admin
    updateAdministrador(administrador: Administrador): Observable<Administrador> {
      return this.http.put<Administrador>(`${this.apiUrl}/${administrador.id}`, administrador);
    }
  
    // Agregar un nuevo admin
    addAdministrador(administrador: Administrador): Observable<Administrador> {
      return this.http.post<Administrador>(`${this.apiUrl}`, administrador);
    }
  
    // Eliminar un admin
    deleteAdministrador(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getDashboardKPIs(): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/dashboard`);
    }
}
