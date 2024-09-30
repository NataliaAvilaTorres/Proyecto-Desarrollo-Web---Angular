import { Propietario } from "../propietario/propietario";

export interface Mascota {
    id: number;
    nombre: string;
    raza: string;
    edad: number;
    peso: number;
    enfermedad: string;
    fotoUrl: string;
    estado: string;
    propietario?: Propietario
}