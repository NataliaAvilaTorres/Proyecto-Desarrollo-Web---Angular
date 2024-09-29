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
    private propietarioService: PropietarioService // Inyecta el servicio para obtener la mascota
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Obtiene el ID de la URL
    if (id) {
      this.propietario = this.propietarioService.findPropietarioById(+id); // Llama al servicio para obtener la mascota por ID
    }
  }

}
