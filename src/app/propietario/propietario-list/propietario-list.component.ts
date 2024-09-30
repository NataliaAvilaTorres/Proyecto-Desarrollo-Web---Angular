import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropietarioService } from 'src/app/service/propietario.service';
import { Propietario } from '../propietario';

@Component({
  selector: 'app-propietario-list',
  templateUrl: './propietario-list.component.html',
  styleUrls: ['./propietario-list.component.css']
})
export class PropietarioListComponent implements OnInit {
  propietarioList: Propietario[] = [];
  originalPropietarioList: Propietario[] = [];

  constructor(
    private propietarioService: PropietarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propietarioService.findAll().subscribe(
      data => {
        this.propietarioList = data;
        this.originalPropietarioList = [...this.propietarioList];
      },
      error => console.error('Error fetching propietarios', error)
    );
  }

  eliminarPropietario(propietario: Propietario) {
    this.propietarioService.deletePropietario(propietario.id).subscribe(() => {
      this.propietarioList = this.propietarioList.filter(p => p.id !== propietario.id);
    });
  }

  mostrarPropietario(propietario: Propietario) {
    this.router.navigate(['/propietario/detail', propietario.id]);
  }

  editarPropietario(propietario: Propietario) {
    this.router.navigate(['/propietarioForm/update', propietario.id]);
  }

  buscarPropietarios(event: any) {
    const searchTerm = event.target.value.toLowerCase().trim();

    if (searchTerm === '') {
      this.propietarioList = [...this.originalPropietarioList];
    } else {
      this.propietarioList = this.originalPropietarioList.filter(propietario =>
        Object.values(propietario).some((val: any) =>
          val && val.toString().toLowerCase().includes(searchTerm)
        )
      );
    }
  }
}
