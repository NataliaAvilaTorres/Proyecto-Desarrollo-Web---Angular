import { Component, OnInit } from '@angular/core';
import { MascotaService } from 'src/app/service/mascota.service';
import { Mascota } from '../mascota';
import { SidebarService } from 'src/app/service/sidebar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-list',
  templateUrl: './mascota-list.component.html',
  styleUrls: ['./mascota-list.component.css'],
})
export class MascotaListComponent implements OnInit {

  constructor(
    private sidebarService: SidebarService,
    private mascotaService: MascotaService,
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

  eliminarMascota(mascota: Mascota) {
    this.mascotaService.deleteMascota(mascota.id).subscribe(() => {
      this.mascotaList = this.mascotaList.filter(m => m.id !== mascota.id);
      this.originalMascotaList = [...this.mascotaList];
    });
  }

  mostrarMascota(mascota: Mascota) {
    this.router.navigate(['/mascota/detail', mascota.id]); // Este funciona
  }

  editarMascota(mascota: Mascota) {
    console.log('Editing mascota with ID:', mascota.id); // Verificar el ID
    this.router.navigate(['/mascotaForm/update', mascota.id])
      .catch(err => console.error('Error al navegar:', err));
  }

  buscarMascotas(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      this.mascotaList = [...this.originalMascotaList];
    } else {
      this.mascotaList = this.originalMascotaList.filter(mascota =>
        Object.values(mascota).some((val: any) =>
          val && val.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
  }
}
