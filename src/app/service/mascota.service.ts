import { Injectable } from '@angular/core';
import { Mascota } from '../mascota/mascota';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  private apiUrl = 'http://localhost:8090/api/mascotas'; // Adjust the port if necessary

  constructor(private http: HttpClient) { }

  findAll(): Observable<Mascota[]> {
    return this.http.get<Mascota[]>(`${this.apiUrl}/`);
  }

  findMascotaById(id: number): Observable<Mascota> {
    console.log(`Fetching mascota with ID: ${id}`);
    return this.http.get<Mascota>(`${this.apiUrl}/${id}`);
}

  updateMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.put<Mascota>(`${this.apiUrl}/${mascota.id}`, mascota);
  }

  addMascota(mascota: Mascota): Observable<Mascota> {
    return this.http.post<Mascota>(`${this.apiUrl}/`, mascota);
  }

  deleteMascota(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
