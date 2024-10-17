import { Tratamiento } from "./tratamiento";

export interface Medicamento {
    id: number;
    nombre: string;
    precioCompra: number;  // Agregar
    precioVenta: number;   // Agregar
    unidadesDisponibles: number;
    unidadesVendidas: number;
    tratamientos?: Tratamiento[];  // Opcional
}
