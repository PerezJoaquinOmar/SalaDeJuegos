import { Component, EventEmitter, Output } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-punteriaprincipal',
  templateUrl: './punteriaprincipal.component.html',
  styleUrls: ['./punteriaprincipal.component.css']
})
export class PunteriaprincipalComponent {

  @Output() mostrarpunt = new EventEmitter();
  @Output() sendpuntos = new EventEmitter();

  showgame=true;
  padrighr = 0;
  padtop = 0;
  puntaje = 0;
  counter=30;
  gameactive=false;
  showgrid=false;
  intervalId:any=''

  startGame(){
    this.padrighr = 0;
    this.padtop = 0;
    this.puntaje=0;
    this.counter=30;
    this.gameactive=true;
    this.intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      //console.log(this.counter)
      if(this.counter <= 0) {
        clearInterval(this.intervalId)
        this.gameactive = false;
        this.endagame();
      }
    }, 1000)
  }

  shoot(){
    if(this.gameactive){
      this.puntaje += 1;
      this.padrighr = Math.random() * (540 - 0) + 0;
      this.padtop = Math.random() * (540 - 0) + 0;
    }
  }

  endagame(){
    Swal.fire({
      title: '¡Terminó el juego!',
      html:'Tu puntaje fue: <b>'+this.puntaje+"<b>",
      icon: 'success',
      confirmButtonText: 'Volver a jugar',
      heightAuto: false,

    })

    this.guardar();
  }

  guardar(){
    this.sendpuntos.emit(this.puntaje);
    //this.fdb.guardarPreguntado(this.puntaje);
  }

  restart(sele:number){
    clearInterval(this.intervalId);
    this.startGame();
    if(sele==1){
      this.puntaje=1;
    }
    
  } 

  showpuntaje(){
    this.mostrarpunt.emit(false);
  }

  instrucciones(){
    Swal.fire({
      title: 'Cómo jugar',
      html: 'El juego empieza cuando el jugador hace clic en el objetivo.<br>'+
            'Al hacerlo comienza una cuenta regresiva de 30 segundos y el jugador debe darle al objetivo la mayor cantidad de veces que pueda para acumular puntos.<br>',
      icon: 'question',
      confirmButtonText: 'OK!',
      heightAuto: false,

    })
  }
}
