import { outputAst } from '@angular/compiler';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FiredbService } from 'src/app/servicios/firedb.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent {

  @Output() closegame = new EventEmitter();

  letraSelec!:any;
  puntajes:any;
  mostrarjuego=true;

  constructor(private fdb:FiredbService, private rtr:Router){
    fdb.traerAhorcado();
    this.puntajes=fdb.ahorcadocol;
  }

  letraPasada(letra:any){
    this.letraSelec=letra;
    //letra.active=false;
  }

  mostrarpunt(value:boolean){
    console.log(value)
    this.mostrarjuego=value;
  }

  volverJuego(){
    this.mostrarjuego=true;
  }

  vovlerinicio(){
    this.closegame.emit(false);
  }
}
