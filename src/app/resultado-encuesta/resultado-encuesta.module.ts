import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadoEncuestaRoutingModule } from './resultado-encuesta-routing.module';
import { ResultadoEncuestaComponent } from './resultado-encuesta.component';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { FavoritoPipe } from './pipes/favorito.pipe';


@NgModule({
  declarations: [
    ResultadoEncuestaComponent,
    FavoritoPipe
  ],
  imports: [
    CommonModule,
    ResultadoEncuestaRoutingModule,
    CanvasJSAngularChartsModule
  ]
})
export class ResultadoEncuestaModule { }
