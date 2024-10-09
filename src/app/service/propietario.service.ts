import { Injectable } from '@angular/core';
import { Propietario } from '../propietario/propietario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private apiUrl = 'http://localhost:8090/api/propietarios'; // URL de la API para propietarios

  constructor(private http: HttpClient) { }

  // Obtener todas los propietarios
  findAll(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.apiUrl}/`);
  }

  // Obtener un propietario por su ID
  findPropietarioById(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un propietario
  updatePropietario(propietario: Propietario): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.apiUrl}/${propietario.id}`, propietario);
  }

  // Agregar un nuevo propietario
  addPropietario(propietario: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(`${this.apiUrl}`, propietario);
  }

  // Eliminar un propietario
  deletePropietario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
