import { Component, Input } from '@angular/core';
import { Propietario } from '../propietario';
import { ActivatedRoute } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';

@Component({
  selector: 'app-propietario-details',
  templateUrl: './propietario-details.component.html',
  styleUrls: ['./propietario-details.component.css']
})
export class PropietarioDetailsComponent {

  @Input()
  propietario!: Propietario;

  constructor(
    private route: ActivatedRoute,
    private propietarioService: PropietarioService
  ) { }

  // Obtiene el ID de la URL y busca el propietario correspondiente para el detalle del propietario
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.propietarioService.findPropietarioById(+id).subscribe(
        data => this.propietario = data,
        error => console.error('Error fetching propietario', error)
      );
    }
  }
}
