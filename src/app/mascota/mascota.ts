import { Propietario } from "../propietario/propietario";
import { Tratamiento } from "../tratamiento/tratamiento";

export interface Mascota {
    id: number;
    nombre: string;
    raza: string;
    edad: number;
    peso: number;
    enfermedad: string;
    fotoUrl: string;
    estado: string;
    propietario?: Propietario;
    tratamientos?: Tratamiento[];  // Corregido: "tratamientos" en lugar de "tratramientos"
}
