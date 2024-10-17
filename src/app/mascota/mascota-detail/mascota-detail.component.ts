import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { Tratamiento } from 'src/app/tratamiento/tratamiento';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent {

  mascota!: Mascota;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // Cargar detalles de la mascota
      console.log(`Fetching details for mascota with ID: ${id}`);
      this.mascotaService.findMascotaById(+id).subscribe(
        data => {
          this.mascota = data;
          console.log('Mascota details fetched:', this.mascota);
        },
        error => {
          console.error('Error fetching mascota', error);
        }
      );

      // Cargar historial de tratamientos
      console.log(`Fetching historial de tratamientos for mascota with ID: ${id}`);
      this.mascotaService.getHistorialMedico(+id).subscribe(
        (tratamientos: Tratamiento[]) => {
          this.mascota.tratamientos = tratamientos;
          console.log('Tratamientos fetched:', this.mascota.tratamientos);
        },
        error => {
          console.error('Error fetching historial médico', error);
        }
      );
    }
  }
}
