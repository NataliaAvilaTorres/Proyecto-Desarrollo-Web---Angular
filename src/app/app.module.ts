import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './LandingPage/header/header.component';
import { MainComponent } from './LandingPage/main/main.component';
import { FooterComponent } from './LandingPage/footer/footer.component';
import { MascotaListComponent } from './mascota/mascota-list/mascota-list.component';
import { MascotaDetailComponent } from './mascota/mascota-detail/mascota-detail.component';
import { MascotaFormComponent } from './mascota/mascota-form/mascota-form.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { VeterinarioPanelComponent } from './veterinario/veterinario-panel/veterinario-panel.component';
import { PropietarioFormComponent } from './propietario/propietario-form/propietario-form.component';
import { PropietarioDetailsComponent } from './propietario/propietario-details/propietario-details.component';
import { PropietarioListComponent } from './propietario/propietario-list/propietario-list.component';
import { PropietarioPanelComponent } from './propietario/propietario-panel/propietario-panel.component';
import { PropietarioMascotasComponent } from './propietario/propietario-mascotas/propietario-mascotas.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MascotaListComponent,
    MascotaDetailComponent,
    MascotaFormComponent,
    LoginPageComponent,
    VeterinarioPanelComponent,
    PropietarioFormComponent,
    PropietarioDetailsComponent,
    PropietarioListComponent,
    PropietarioPanelComponent,
    PropietarioMascotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
