import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { LogeadoGuard } from './guards/logeado.guard';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { IsLoggedGuard } from './guards/is-logged.guard';
import { IsAdminGuard } from './guards/is-admin.guard';
import { UserlogComponent } from './components/userlog/userlog.component';

const routes: Routes = [
  {path: "home", component:HomeComponent, canActivate: [LogeadoGuard]},
  {path: "login", component:LoginComponent, canActivate: [IsLoggedGuard]},
  {path: "quienSoy", component:QuienSoyComponent},
  {path: "registro", component:RegistroComponent, canActivate: [IsLoggedGuard]},
  {path: "encuesta", component:EncuestaComponent, canActivate: [LogeadoGuard]},
  {path: "logUsuarios", component:UserlogComponent, canActivate: [LogeadoGuard, IsAdminGuard]},
  { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule), canActivate: [LogeadoGuard]},
  { path: 'resultadoEncuesta', loadChildren: () => import('./resultado-encuesta/resultado-encuesta.module').then(m => m.ResultadoEncuestaModule), canActivate: [LogeadoGuard, IsAdminGuard]},
  {path: "**", component:LoginComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),CommonModule,
    CommonModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  exports: [RouterModule]
})
export class AppRoutingModule { }
