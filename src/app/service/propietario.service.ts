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

  findAll(){
    return this.propietarioList;
  }

  findPropietarioById(id: number):Propietario{
    const propietario:Propietario = this.propietarioList.find(o => o.id === id)!;
    return propietario;
  }

  updatePropietario(propietario: Propietario): void {
    const index = this.propietarioList.findIndex(m => m.id === propietario.id);
    if (index !== -1) {
      this.propietarioList[index] = { ...propietario };
    }
  }

  addPropietario(propietario: Propietario): void {
    const newId = Math.max(...this.propietarioList.map(m => m.id)) + 1;
    propietario.id = newId;
    this.propietarioList.push({ ...propietario });
  }

}
