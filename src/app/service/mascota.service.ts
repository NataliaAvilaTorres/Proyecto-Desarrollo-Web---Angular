import { Injectable } from '@angular/core';
import { Mascota } from '../mascota/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor() { }

  //BD quemada de mascotas
  mascotaList: Mascota[] = [
    {
      id: 1,
      nombre: 'Lorenzo',
      raza: 'Sabueso',
      edad: 2,
      peso: 5.5,
      enfermedad: 'Gripe',
      fotoUrl: 'assets/images/General/mascotas.jpg',
      estado: 'Activo'
    },

    {
      id: 2,
      nombre: 'Toby',
      raza: 'Persa',
      edad: 3,
      peso: 6.78,
      enfermedad: 'Gripe',
      fotoUrl: 'assets/images/General/mascotas.jpg',
      estado: 'Activo'
    },

    {
      id: 3,
      nombre: 'Kovo',
      raza: 'Bulldog Frances',
      edad: 4,
      peso: 11,
      enfermedad: 'Gripe',
      fotoUrl: 'assets/images/General/mascotas.jpg',
      estado: 'Inactivo'
    },

    {
      id: 4,
      nombre: 'Bella',
      raza: 'Persa',
      edad: 3,
      peso: 4.2,
      enfermedad: 'Dermatitis',
      fotoUrl: 'assets/images/General/mascotas.jpg',
      estado: 'Activo'
    },

    {
      id: 5,
      nombre: 'Simba',
      raza: 'Golden Retriever',
      edad: 5,
      peso: 29.5,
      enfermedad: 'Otitis',
      fotoUrl: 'assets/images/General/mascotas.jpg',
      estado: 'Activo'
    },

    {
      id: 6,
      nombre: 'Milo',
      raza: 'Siamés',
      edad: 2,
      peso: 4.8,
      enfermedad: 'Conjuntivitis',
      fotoUrl: 'assets/images/General/mascotas.jpg',
      estado: 'Inactivo'
    }

  ];

  findAll(){
    return this.mascotaList;
  }
}
