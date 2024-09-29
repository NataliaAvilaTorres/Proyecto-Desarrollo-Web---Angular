import { Injectable } from '@angular/core';
import { Propietario } from '../propietario/propietario';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  constructor() { }

  propietarioList: Propietario[] = [
    {
      id: 1,
      nombre: "Cristian",
      cedula: "1234567890",
      correo: "jXUeh@example.com",
      celular: "3001234567",
      contrasena: "pass1234"
    },
    {
      id: 2,
      nombre: "Camila",
      cedula: "9876543210",
      correo: "camila@example.com",
      celular: "3019876543",
      contrasena: "camila5678"
    },
    {
      id: 3,
      nombre: "Andrés",
      cedula: "1122334455",
      correo: "andres@example.com",
      celular: "3021122334",
      contrasena: "andres4321"
    }
  ];
  
}
