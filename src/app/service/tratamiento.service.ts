import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tratamiento } from '../tratamiento/tratamiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private apiUrl = 'http://localhost:8090/api/tratamientos'; // URL de la API REST

  constructor(private http: HttpClient) { }

  // Obtener todos los tratamientos
  findAll(): Observable<Tratamiento[]> {
    return this.http.get<Tratamiento[]>(`${this.apiUrl}/`);
  }

  // Obtener una tratamiento por su ID
  findTratamientoById(id: number): Observable<Tratamiento> {
    console.log(`Fetching tratamiento with ID: ${id}`);
    return this.http.get<Tratamiento>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un tratamiento
  updateTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.put<Tratamiento>(`${this.apiUrl}/${tratamiento.id}`, tratamiento);
  }

  // Agregar un nuevo tratamiento
  addTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    console.log('Creando tratamiento:', tratamiento); // Log del payload

    return this.http.post<Tratamiento>(`${this.apiUrl}/`, tratamiento);
  }


  // Eliminar un tratamiento
  deleteTratamiento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
