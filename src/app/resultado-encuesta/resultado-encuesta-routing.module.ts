import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResultadoEncuestaComponent } from './resultado-encuesta.component';

const routes: Routes = [{ path: '', component: ResultadoEncuestaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultadoEncuestaRoutingModule { }
