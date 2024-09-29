import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';
import { Propietario } from '../propietario';

@Component({
  selector: 'app-propietario-list',
  templateUrl: './propietario-list.component.html',
  styleUrls: ['./propietario-list.component.css']
})
export class PropietarioListComponent {

  //Inyectar dependencias
  constructor(
    private propietarioService: PropietarioService,
    private router: Router
  ) {

  }

  //Realizo llamados cuando ya esta cargada la interfaz
  ngOnInit(): void {
    this.propietarioList = this.propietarioService.findAll();
  }

  //Atributos
  propietarioList!: Propietario[];
  selectedPropietario!: Propietario;

  eliminarPropietario(propietario: Propietario) {
    var index = this.propietarioList.indexOf(propietario);
    this.propietarioList.splice(index, 1);
  }

  mostrarPropietario(propietario: Propietario) {
    this.router.navigate(['/propietario/detail', propietario.id]); // Navega a la ruta de detalles con el ID de la mascota.
  }

  editarPropietario(propietario: Propietario) {
    this.router.navigate(['/propietarioForm/update', propietario.id]); // Navega a la ruta de formulario con el ID de la mascota.
  }

}
