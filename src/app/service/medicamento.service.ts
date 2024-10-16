import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from '../tratamiento/medicamento';

@Injectable({
  providedIn: 'root'
})

export class MedicamentoService {

  private apiUrl = 'http://localhost:8090/api/medicamentos'; // URL de la API REST
  constructor(private http: HttpClient) { }

    // Obtener todas los medicamentos
    findAll(): Observable<Medicamento[]> {
      return this.http.get<Medicamento[]>(`${this.apiUrl}/`);
    }
  
    // Obtener un medicamento por su ID
    findMedicamentoById(id: number): Observable<Medicamento> {
      console.log(`Fetching medicamento with ID: ${id}`);
      return this.http.get<Medicamento>(`${this.apiUrl}/${id}`);
    }
  
    // Actualizar una medicamento
    updateMedicamento(medicamento: Medicamento): Observable<Medicamento> {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json' // Sin charset=UTF-8
        })
      };

      console.log('Actualizando medicamento:', medicamento);

      return this.http.put<Medicamento>(
        `${this.apiUrl}/${medicamento.id}`,
        medicamento,
        httpOptions
      );
    }
  
    // Agregar una nuevo medicamento
    addMedicamento(medicamento: Medicamento): Observable<Medicamento> {
      return this.http.post<Medicamento>(`${this.apiUrl}/`, medicamento);
    }
  
    // Eliminar una medicamento
    deleteMedicamento(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
