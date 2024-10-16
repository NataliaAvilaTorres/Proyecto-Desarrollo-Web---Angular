import { Mascota } from "../mascota/mascota";
import { Veterinario } from "../veterinario/veterinario";
import { Medicamento } from "./medicamento";

export interface Tratamiento {
    id: number;
    fecha?: Date;
    mascota?: Mascota | null;  // Hacer que sea opcional
    veterinario?: Veterinario | null;  // Opcional y null
    medicamento?: Medicamento | null;  // Opcional y null
}