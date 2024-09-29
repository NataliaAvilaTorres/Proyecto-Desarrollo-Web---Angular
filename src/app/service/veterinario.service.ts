import { Injectable } from '@angular/core';
import { Veterinario } from '../veterinario/veterinario';

@Injectable({
  providedIn: 'root'
})
export class VeterinarioService {

  constructor() { }

  veterinarioList: Veterinario[] = [
    {
      id: 1,
      cedula: '1234567890',
      nombre: 'John Doe',
      especialidad: 'Peluquero',
      numAtenciones: 0,
      contrasena: 'password123',
      correo: 'john@example.com'
    },
    {
      id: 2,
      cedula: '9876543210',
      nombre: 'Jane Smith',
      especialidad: 'Veterinario',
      numAtenciones: 0,
      contrasena: 'password456',
      correo: 'jane@example.com'
    },
    {
      id: 3,
      cedula: '5555555555',
      nombre: 'Michael Johnson',
      especialidad: 'Nutricionista',
      numAtenciones: 0,
      contrasena: 'password789',
      correo: 'michael@example.com'
    }
  ];
}
