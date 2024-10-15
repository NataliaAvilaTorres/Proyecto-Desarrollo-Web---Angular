import { Tratamiento } from "./tratamiento";

export interface Medicamento {
    id: number;
    nombre: string;
    precio: number;
    unidadesDisponibles: number;
    unidadesVendidas: number;
    tratamientos: Tratamiento[];
}