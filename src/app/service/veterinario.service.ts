// src/app/service/veterinario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Veterinario } from '../veterinario/veterinario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {
  private apiUrl = 'http://localhost:8090/api/veterinarios'; // Ajusta si es necesario

  constructor(private http: HttpClient) {}

  findAll(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}/`);
  }

  findVeterinarioById(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(`${this.apiUrl}/${id}`);
  }

  // Método para obtener todos los veterinarios
  getAllVeterinarios(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(`${this.apiUrl}`);
  }

  updateVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(`${this.apiUrl}/${veterinario.id}`, veterinario);
  }

  addVeterinario(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(`${this.apiUrl}/`, veterinario);
  }

  deleteVeterinario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
