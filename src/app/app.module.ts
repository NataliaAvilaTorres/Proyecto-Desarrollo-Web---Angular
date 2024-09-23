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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    MascotaListComponent,
    MascotaDetailComponent,
    MascotaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
