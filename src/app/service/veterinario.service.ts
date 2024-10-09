// src/app/service/veterinario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veterinario } from '../veterinario/veterinario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = 'http://localhost:8090/api/veterinarios'; // URL de la API de veterinarios

  constructor(private http: HttpClient) {}

  // Método para obtener todos los veterinarios
  findAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/`);
  }

  // Método para obtener un veterinario por su ID
  findVeterinarioById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener todos los veterinarios
  getAllVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}`);
  }

  // Método para actualizar un veterinario
  updateVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.apiUrl}/${veterinario.id}`, veterinario);
  }

  // Método para agregar un nuevo veterinario
  addVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.apiUrl}/`, veterinario);
  }

  // Método para eliminar un veterinario
  deleteVeterinario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
