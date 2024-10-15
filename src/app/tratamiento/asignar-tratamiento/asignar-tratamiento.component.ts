import { Component, OnInit } from '@angular/core';
import { Mascota } from 'src/app/mascota/mascota';
import { Veterinario } from 'src/app/veterinario/veterinario';
import { Medicamento } from 'src/app/tratamiento/medicamento';
import { Tratamiento } from 'src/app/tratamiento/tratamiento';
import { MascotaService } from 'src/app/service/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicamentoService } from 'src/app/service/medicamento.service';

@Component({
  selector: 'app-asignar-tratamiento',
  templateUrl: './asignar-tratamiento.component.html',
  styleUrls: ['./asignar-tratamiento.component.css']
})
export class AsignarTratamientoComponent implements OnInit {
  tratamiento: Tratamiento = {
    id: 0,
    fecha: new Date(), // Se inicializa con la fecha actual o puede ser null si lo prefieres
    mascota: {} as Mascota, // Un objeto vacío o la estructura inicial de la mascota
    veterinario: {} as Veterinario,
    medicamento: {} as Medicamento // Un objeto vacío o la estructura inicial del medicamento
  };

  mascotas: Mascota[] = []; // Variable para almacenar las mascotas
  medicamentos: Medicamento[] = []; // Variable para almacenar los medicamentos

  constructor(
    private mascotaService: MascotaService,
    private medicamentoService: MedicamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadMascotas(); // Llamar al método que carga las mascotas}
    this.loadMedicamentos(); // Llamar al método que carga los medicamentos
  }

  loadMascotas(): void {
    this.mascotaService.findAll().subscribe(
      (data: Mascota[]) => {
        this.mascotas = data; // Asignar las mascotas obtenidas
      },
      (error) => {
        console.error('Error fetching mascotas:', error);
      }
    );
  }

  loadMedicamentos(): void {
    this.medicamentoService.findAll().subscribe(
      (data) => {
        this.medicamentos = data;
      },
      (error) => {
        console.error('Error al cargar medicamentos:', error);
      }
    );
  }
}
