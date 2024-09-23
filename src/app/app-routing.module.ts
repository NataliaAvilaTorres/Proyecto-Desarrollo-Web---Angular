import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaListComponent } from './mascota/mascota-list/mascota-list.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';
import { MascotaFormComponent } from './mascota/mascota-form/mascota-form.component';

const routes: Routes = [
  {path: 'mascotas', component: MascotaListComponent},
  {path: 'mascota/detail/:id', component: MascotaDetailComponent},
  {path: 'mascotaForm/add', component: MascotaFormComponent},
  {path: 'mascotaForm/update/:id', component: MascotaFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
