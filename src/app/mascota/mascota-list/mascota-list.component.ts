import { Component } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { Mascota } from '../mascota';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.css'],
})
export class MascotaListComponent {

  //Inyectar dependencias
  constructor(
    private mascotaService: MascotaService,
    private router: Router
  ) {

  }

  //Realizo llamados cuando ya esta cargada la interfaz
  ngOnInit(): void {
    this.mascotaList = this.mascotaService.findAll();
  }

  //Atributos
  mascotaList!: Mascota[];
  selectedMascota!: Mascota;

  eliminarMascota(mascota: Mascota) {
    var index = this.mascotaList.indexOf(mascota);
    this.mascotaList.splice(index, 1);
  }

  mostrarMascota(mascota: Mascota) {
    this.router.navigate(['/mascota/detail', mascota.id]); // Navega a la ruta de detalles con el ID de la mascota.
  }

  editarMascota(mascota: Mascota) {
    this.router.navigate(['/mascotaForm/update', mascota.id]); // Navega a la ruta de formulario con el ID de la mascota.
  }

  
}
