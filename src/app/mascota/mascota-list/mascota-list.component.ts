import { Component } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.css'],
})
export class MascotaListComponent {

  //Inyectar dependencias
  constructor(
    private mascotaService: MascotaService
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
    this.selectedMascota = mascota;
  }

}
