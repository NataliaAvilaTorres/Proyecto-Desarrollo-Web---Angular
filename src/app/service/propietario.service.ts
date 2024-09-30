import { Injectable } from '@angular/core';
import { Propietario } from '../propietario/propietario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private apiUrl = 'http://localhost:8090/api/propietarios'; // Ajusta el puerto si es necesario

  constructor(private http: HttpClient) { }

  findAll(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.apiUrl}/`);
  }

  findPropietarioById(id: number): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}/${id}`);
  }

  updatePropietario(propietario: Propietario): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.apiUrl}/${propietario.id}`, propietario);
  }

  addPropietario(propietario: Propietario): Observable<Propietario> {
    return this.http.post<Propietario>(`${this.apiUrl}`, propietario);
  }

  deletePropietario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
