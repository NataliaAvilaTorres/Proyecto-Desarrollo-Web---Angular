import { Component, Input } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-mascota-detail',
  templateUrl: './mascota-detail.component.html',
  styleUrls: ['./mascota-detail.component.css']
})
export class MascotaDetailComponent {

  @Input()
  mascota!: Mascota;

  constructor(
    private route: ActivatedRoute,
    private mascotaService: MascotaService // Inyecta el servicio para obtener la mascota
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL
    if (id) {
      this.mascota = this.mascotaService.findMascotaById(+id); // Llama al servicio para obtener la mascota por ID
    }
  }

}
