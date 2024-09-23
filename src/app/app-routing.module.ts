import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaListComponent } from './mascota/mascota-list/mascota-list.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';

const routes: Routes = [
  {path: 'mascotas', component: MascotaListComponent},
  {path: 'mascota/detail/:id', component: MascotaDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
