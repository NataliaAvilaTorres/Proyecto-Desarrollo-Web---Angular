import { Mascota } from "../mascota/mascota";
import { Veterinario } from "../veterinario/veterinario";
import { Medicamento } from "./medicamento";

export interface Tratamiento {
    id: number;
    fecha?: Date;
    mascota?: Mascota | null;
    veterinario?: Veterinario | null;
    medicamento?: Medicamento | null;
    cantidad: number;
}
