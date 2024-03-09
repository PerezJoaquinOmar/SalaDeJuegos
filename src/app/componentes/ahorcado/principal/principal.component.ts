import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';
import { FiredbService } from 'src/app/servicios/firedb.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnChanges {

  @Output() EnviarPunt : EventEmitter<any> = new EventEmitter<any>();
  @Input() letraAhorcado!:any;

  palabras=[
    "INTERNO",
    "AHUMADO",
    "ROER",
    "CORONA",
    "POETA",
    "CARICATURA"
  ]
  palabra=[""];
  palabraOcul=[""]
  palindex!:number;
  errores=0;
  btclass="btn btn-primary";
  adivinadas=0;
  timeLeft: number = 0;
  minutesLeft: number = 0;
  startime=0;
  endtime=0;
  interval:any;
  gamelive=true;
  letras:any;
  


  ngOnChanges(changes: SimpleChanges): void {
    //throw new Error('Method not implemented.');
    if(this.letraAhorcado){
      /*if(this.letraAhorcado.letra =="F"){
        this.letraAhorcado.class="btn btn-danger"
      }
      this.letraAhorcado.active=false;*/
      this.checkLetra(this.letraAhorcado)
    }
  }

  constructor(private fdb:FiredbService){
    fdb.traerAhorcado();
    this.startgame();
    console.log(this.palabra)
    
  }

  restart(){
    for (let index = 0; index < this.letras.length; index++) {
      this.letras[index].active=true;
      this.letras[index].class="btn btn-success";
    }
    this.startgame();
  }

  startgame(){
    clearInterval(this.interval);
    this.palabra = this.palabras[Math.floor(Math.random() * (5 - 0) + 0)].split("");
    this.letras=[];
    this.palabraOculta();
    this.startTimer();
    this.btclass="btn btn-primary";
    this.errores=0;
    this.adivinadas=0;
    this.timeLeft = 0;
    this.minutesLeft = 0;
  }

  palabraOculta(){
    this.palabraOcul = [];
    for (let index = 0; index < this.palabra.length; index++) {
      this.palabraOcul.push("-")
      
    }
  }

  checkLetra(letra:any){
    var match=false;
    if(this.errores < 6 && this.gamelive){
      for (let index = 0; index < this.palabra.length; index++) {
        if(letra.letra == this.palabra[index]){
          this.palabraOcul[index] = this.palabra[index];
          this.adivinadas++;
          match=true;
        }
      }
      if(match){
        this.letraAhorcado.class="btn btn-success";
      }else{
        this.letraAhorcado.class="btn btn-danger";
        this.errores++
      }
      letra.active=false;
      this.letras.push(letra)
    }
    if(this.adivinadas == this.palabraOcul.length){
      this.wingame()
    }
    if(this.errores == 6){
      this.endGame()
    }
    
  }

  endGame(){
    this.palabraOcul = this.palabra;
    this.btclass="btn btn-danger";
    this.pauseTimer();
  }

  wingame(){
    this.btclass="btn btn-success";
    this.pauseTimer();
    var time=this.minutesLeft.toString();
    var sec=this.timeLeft.toString();
    if(this.timeLeft<10){
      sec="0"+sec;
    }
    if(this.minutesLeft<10){
      time="0"+time;
    }
    this.fdb.guardarAhorcado(time+':'+sec, this.endtime-this.startime);

    Swal.fire({
      title: '¡Felicidades!',
      html: 'Ganaste el juego.<br>'+
            'Tu puntaje fue:<b>'+time+':'+sec+"<b>",
      icon: 'success',
      confirmButtonText: 'Volver a jugar',
      heightAuto: false,

    })
  }

  startTimer() {
    this.gamelive=true;
    this.startime = Date.now();
    //seleccionar dirección aleatoria (-5,5)
    this.interval = setInterval(() => {
      if(this.timeLeft >= 60){
        this.minutesLeft++;
        this.timeLeft=0;
      }else{
        this.timeLeft++;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.endtime = Date.now();
    this.gamelive = false;
  }

  instrucciones(){
    Swal.fire({
      title: 'Cómo jugar',
      html: 'Se debe adivinar la palabra oculta usando las teclas verdes que aparecen abajo.<br>'+
            'Si la letra elegida existe en la palabra, la misma se queda en verde, si no existe se vuelve roja.<br>'+
            'Cada error agrega una pieza al ahorcado, con 6 errores el juego termina.<br>'+
            'El puntaje se determina según el tiempo que le toma al usuario descubrir la palabra.',
      icon: 'question',
      confirmButtonText: 'OK!',
      heightAuto: false,

    })
  }

  pressletra(){
    //alert(letr)
    this.EnviarPunt.emit(false);
    //letr.active=false;
  }

}
