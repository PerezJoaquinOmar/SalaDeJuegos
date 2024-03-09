import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { BotonesComponent } from './componentes/ahorcado/botones/botones.component';
import { PrincipalComponent } from './componentes/ahorcado/principal/principal.component';
import { MayormenorComponent } from './componentes/mayormenor/mayormenor.component';
import { CartasComponent } from './componentes/mayormenor/cartas/cartas.component';
import { PrincipalMayorComponent } from './componentes/mayormenor/principal/principal.component';
import { PreguntadosComponent } from './components/preguntados/preguntados.component';
import { PreguntadosPrincipalComponent } from './components/preguntados/preguntados-principal/preguntados-principal.component';
import { HttpClientModule } from '@angular/common/http';
import { PunteriaComponent } from './componentes/punteria/punteria.component';
import { PunteriaprincipalComponent } from './componentes/punteria/punteriaprincipal/punteriaprincipal.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { EncuestaPrincipalComponent } from './componentes/encuesta/encuesta-principal/encuesta-principal.component';
import { TelefonoPipe } from './pipes/telefono.pipe';
import { UserlogComponent } from './components/userlog/userlog.component';
import { ParsetimePipe } from './pipes/parsetime.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    QuienSoyComponent,
    AhorcadoComponent,
    BotonesComponent,
    PrincipalComponent,
    MayormenorComponent,
    CartasComponent,
    PrincipalMayorComponent,
    PreguntadosComponent,
    PreguntadosPrincipalComponent,
    PunteriaComponent,
    PunteriaprincipalComponent,
    EncuestaComponent,
    EncuestaPrincipalComponent,
    TelefonoPipe,
    UserlogComponent,
    ParsetimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatButtonModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
