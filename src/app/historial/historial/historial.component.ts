import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { SidebarService } from 'src/app/service/sidebar.service';
import { Router } from '@angular/router';
import { Mascota } from 'src/app/mascota/mascota';
import { TratamientoService } from 'src/app/service/tratamiento.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit{


  constructor(
    private sidebarService: SidebarService,
    private mascotaService: MascotaService,
    private tratamientoservice: TratamientoService,
    private router: Router
  ) { }

  mascotaList: Mascota[] = [];
  originalMascotaList: Mascota[] = [];
  isAdminRoute: boolean = false;


  ngOnInit(): void {

    // Usar el servicio para verificar la ruta
    this.sidebarService.checkIfAdminRoute();
    this.isAdminRoute = this.sidebarService.isAdminRoute();

    this.mascotaService.findAll().subscribe(
      data => {
        this.mascotaList = data;
        this.originalMascotaList = [...this.mascotaList];
      },
      error => {
        console.error('Error fetching mascotas', error);
      }
    );
  }

}
