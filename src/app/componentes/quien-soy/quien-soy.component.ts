import { Component } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.css']
})


export class QuienSoyComponent {

  constructor(public fdb:FiredbService){
    fdb.traerLog();
  }
  padrighr = 0;
  padtop = 0;
  puntaje = 0;
  showgame=false;
  counter=30;
  gameactive=false;
  showgrid=false;

  right(){
    
  }

  showGame(){
    if(this.showgame){
      this.showgame=false
    }else{
      this.showgame=true;
      this.showgrid=false;
      this.startGame();
    }
    
  }

  startGame(){
    this.padrighr = 0;
    this.padtop = 0;
    this.puntaje=0;
    this.counter=30;
    this.gameactive=true;
    let intervalId = setInterval(() => {
      this.counter = this.counter - 1;
      //console.log(this.counter)
      if(this.counter <= 0) {
        clearInterval(intervalId)
        this.gameactive = false;
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

  mostrarLog(){
    if(this.showgrid){
      this.showgrid=false
    }else{
      this.showgrid=true;
      this.showgame=false;
    }
  }

}
