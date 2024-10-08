import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaListComponent } from './mascota/mascota-list/mascota-list.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';
import { MascotaFormComponent } from './mascota/mascota-form/mascota-form.component';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { VeterinarioPanelComponent } from './veterinario/veterinario-panel/veterinario-panel.component';
import { PropietarioFormComponent } from './propietario/propietario-form/propietario-form.component';
import { PropietarioDetailsComponent } from './propietario/propietario-details/propietario-details.component';
import { PropietarioListComponent } from './propietario/propietario-list/propietario-list.component';
import { PropietarioPanelComponent } from './propietario/propietario-panel/propietario-panel.component';
import { PropietarioMascotasComponent } from './propietario/propietario-mascotas/propietario-mascotas.component';
import { AdministradorPanelComponent } from './administrador/administrador-panel/administrador-panel.component';
import { AdminMascotaFormComponent } from './administrador/admin-mascota-form/admin-mascota-form.component';

const routes: Routes = [
  {path: 'login', component: LoginPageComponent}, //http://localhost:4200/login
  {path: 'veterinarioPanel', component: VeterinarioPanelComponent}, //http://localhost:4200/veterinarioPanel
  {path: 'propietarioPanel', component: PropietarioPanelComponent}, //http://localhost:4200/propietarioPanel
  {path: 'propietarios', component: PropietarioListComponent}, //http://localhost:4200/propietarios
  {path: 'propietarioForm/add', component: PropietarioFormComponent}, //http://localhost:4200/propietarioForm/add
  {path: 'propietario/detail/:id', component: PropietarioDetailsComponent}, //http://localhost:4200/propietario/detail/1
  {path: 'propietarioForm/update/:id', component: PropietarioFormComponent}, //http://localhost:4200/propietarioForm/update/1
  {path: 'propietarioMascotas', component: PropietarioMascotasComponent}, //http://localhost:4200/propietarioMascotas
  {path: 'mascotas', component: MascotaListComponent}, //http://localhost:4200/mascotas
  {path: 'mascota/detail/:id', component: MascotaDetailComponent}, //http://localhost:4200/mascota/detail/1
  {path: 'mascotaForm/update/:id', component: MascotaFormComponent}, //http://localhost:4200/mascotaForm/update/1
  {path: 'mascotaForm/add', component: MascotaFormComponent}, //http://localhost:4200/mascotaForm/add
  {path: 'adminPanel', component: AdministradorPanelComponent}, //http://localhost:4200/adminPanel
  { path: 'admin', component: AdminMascotaFormComponent, 
    children: [
      { path: 'mascotaForm/add', component: MascotaFormComponent } // http://localhost:4200/admin/mascotaForm/add
    ]
  },
  { path: 'admin', component: AdminMascotaFormComponent, 
    children: [
      { path: 'mascotas', component: MascotaListComponent } // http://localhost:4200/admin/mascotas
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
