import { Component } from '@angular/core';
import { Veterinario } from '../veterinario';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-list',
  templateUrl: './veterinario-list.component.html',
  styleUrls: ['./veterinario-list.component.css']
})
export class VeterinarioListComponent {

  veterinarioList: Veterinario[] = [];
  originalVeterinarioList: Veterinario[] = [];

  constructor(
    private veterinarioService: VeterinarioService,
    private router: Router
  ) { }

  // Obtener todos los veterinarios
  ngOnInit(): void {
    this.veterinarioService.findAll().subscribe(
      data => {
        this.veterinarioList = data;
        this.originalVeterinarioList = [...this.veterinarioList];
      },
      error => console.error('Error fetching propietarios', error)
    );
  }

  // Eliminar veterinario
  eliminarVeterinario(veterinario: Veterinario) {
    this.veterinarioService.deleteVeterinario(veterinario.id).subscribe(() => {
      this.veterinarioList = this.veterinarioList.filter(m => m.id !== veterinario.id);
      this.originalVeterinarioList = [...this.veterinarioList];
    });
  }

  

  // Obtener todos los veterinarios en el buscador
  buscarVeterinarios(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      this.veterinarioList = [...this.originalVeterinarioList];
    } else {
      this.veterinarioList = this.originalVeterinarioList.filter(veterinario =>
        Object.values(veterinario).some((val: any) =>
          val && val.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
  }

}
