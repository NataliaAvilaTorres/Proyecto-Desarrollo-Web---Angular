import { Component, Input } from '@angular/core';
import { Veterinario } from '../veterinario';
import { ActivatedRoute } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-detail',
  templateUrl: './veterinario-detail.component.html',
  styleUrls: ['./veterinario-detail.component.css']
})
export class VeterinarioDetailComponent {

  @Input()
  veterinario!: Veterinario;

  constructor(
    private route: ActivatedRoute,
    private veterinarioService: VeterinarioService
  ) { }

  // Obtiene el ID de la URL y busca el veterinario correspondiente para el detalle del veterinario
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.veterinarioService.findVeterinarioById(+id).subscribe(
        data => this.veterinario = data,
        error => console.error('Error fetching propietario', error)
      );
    }
  }
}