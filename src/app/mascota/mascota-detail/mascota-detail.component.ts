import { Component } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';

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

  // Obtiene el ID de la URL y busca la mascota correspondiente para el detalle de la mascota
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.mascotaService.findMascotaById(+id).subscribe(
        data => {
          this.mascota = data;
        },
        error => {
          console.error('Error fetching mascota', error);
        }
      );
    }
  }
}
