import { Component, EventEmitter, Output } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal-mayor',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalMayorComponent {

  @Output() closegame = new EventEmitter();

  mostrarjuego=true;
  card=0;
  ncard=0;
  puntaje=0;
  showcard="base"
  dcard="base";
  newcard='base';
  choice=false;
  puntajesm:any='';
  result="correct";
  

  constructor(private fdb:FiredbService){
    fdb.traerMayormenor();
    this.puntajesm = fdb.mayormenorcol;
    this.startgame();
  }

  startgame(){
    this.showcard =this.randcard(14);
    this.dcard=this.randcard(this.card);
  }

  loose(){
    this.result="incorrect"
    Swal.fire({
      title: '¡Terminó el juego!',
      html:'Tu puntaje fue: <b>'+this.puntaje+"<b>",
      icon: 'success',
      confirmButtonText: 'Volver a jugar',
      heightAuto: false,

    })
    if(this.puntaje>0){
      this.fdb.guardarMayor(this.puntaje);
    }
    //guardar
  }

  randcard(oldcard:number){
    let suit  = "c";
    let card  = 0;
    do {
      card = Math.floor(Math.random()*13)+1;
    } while (card==oldcard);
    if(oldcard==14){

      this.card = card;
    }else{
      this.ncard = card;
    }
    switch(Math.floor(Math.random()*4)){
      case 0:
        suit="c"
        break;
      case 1:
        suit="h"
        break;
      case 2:
        suit="d"
        break;
      case 3:
        suit="s"
        break;
    }

    console.log

    return suit+card;
  }

  addpoints(){
    this.puntaje++;
  }

  choose(c:number){
    console.log("n",this.ncard,",ol", this.card)
    this.choice=true;
    let stay=true;
    switch (c) {
      case 0:
        if(this.ncard<this.card){this.addpoints()}else{this.loose();stay=false}
        break;
      case 1:
        if(this.ncard>this.card){this.addpoints()}else{this.loose();stay=false}
        break;
    }
    this.newcard=this.dcard
    //wait
    if(stay){
      setTimeout(() => { 
        this.choice=false;
        this.showcard=this.newcard
        this.newcard="base";
        this.card=this.ncard;
        this.dcard=this.randcard(this.card); 
      }, 2000);
    }
  }

  restart(){
    this.choice=false;
    this.card=0;
    this.ncard=0;
    this.puntaje=0;
    this.result="correct";
    this.newcard="base";
    this.startgame();
  }

  volverJuego(){
    this.mostrarjuego=true;
  }

  showpuntaje(){
    this.mostrarjuego=false;
  }


  instrucciones(){
    Swal.fire({
      title: 'Cómo jugar',
      html: 'Se muestra una carta en el lado izquiero y el jugador debe adivinar si la carta que va a aparecer en el lado derecho es mayor o menor que la primera.<br>'+
            'Si acierta, el jugador gana un punto y sigue jugando.<br>Si no acierta, el juego termina<br>'+
            'El puntaje se basa en la cantidad de cartas que el jugador pudo adivinar exitosamente.',
      icon: 'question',
      confirmButtonText: 'OK!',
      heightAuto: false,

    })
  };

  cerrar(){
    this.closegame.emit(false);
  }
}
