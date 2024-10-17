import { Component, OnInit } from '@angular/core';
import { PropietarioService } from 'src/app/service/propietario.service';

@Component({
  selector: 'app-propietario-mascotas',
  templateUrl: './propietario-mascotas.component.html',
  styleUrls: ['./propietario-mascotas.component.css']
})
export class PropietarioMascotasComponent implements OnInit {

  mascotas: any[] = [];
  filteredMascotas: any[] = [];
  propietarioNombre: string = '';

  constructor(private propietarioService: PropietarioService) { }

  // Obtener todas las mascotas del propietario
  ngOnInit() {
    const userEmail = localStorage.getItem('currentUserEmail');
    if (userEmail) {
      this.propietarioService.findAll().subscribe(propietarios => {
        const propietario = propietarios.find(p => p.correo === userEmail);
        if (propietario) {
          this.propietarioNombre = propietario.nombre;
          this.mascotas = propietario.mascotas || [];
          this.filteredMascotas = [...this.mascotas];
        }
      }, error => console.error('Error fetching propietarios', error));
    }
  }

  // Buscar mascotas
  buscarMascotas() {
    const searchInput = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    this.filteredMascotas = this.mascotas.filter(mascota => 
      mascota.nombre.toLowerCase().includes(searchInput) ||
      mascota.raza.toLowerCase().includes(searchInput)
    );
  }

  // Filtrar mascotas
  filtrar(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      this.filteredMascotas = [...this.mascotas];
    } else {
      this.filteredMascotas = this.mascotas.filter(mascota =>
        Object.values(mascota).some((val: any) =>
          val && val.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
  }
}
