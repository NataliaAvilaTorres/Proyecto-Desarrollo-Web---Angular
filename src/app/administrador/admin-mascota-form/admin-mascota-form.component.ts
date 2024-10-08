import { Component } from '@angular/core';
import { SidebarService } from 'src/app/service/sidebar.service';

@Component({
  selector: 'app-admin-mascota-form',
  templateUrl: './admin-mascota-form.component.html',
  styleUrls: ['./admin-mascota-form.component.css']
})
export class AdminMascotaFormComponent {

  isAdminRoute: boolean = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    // Usar el servicio para comprobar si es ruta de admin
    this.sidebarService.checkIfAdminRoute();
    this.isAdminRoute = this.sidebarService.isAdminRoute();
  }

}
