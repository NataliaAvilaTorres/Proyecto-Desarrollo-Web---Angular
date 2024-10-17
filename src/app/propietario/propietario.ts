import { Mascota } from "../mascota/mascota";

export interface Propietario {
    id: number;
    nombre: string;
    cedula: string;
    correo: string;
    celular: string;
    contrasena: string;
    mascotas?: Mascota[];  // Agregamos la lista de mascotas
}