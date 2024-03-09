import { Component, EventEmitter, Output } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent {

  @Output() closegame = new EventEmitter();
 
  razas=[
    "chihuahua",
    "akita",
    "poodle",
    "husky",
    "boxer",
    "bulldog"
  ]
  opt1=0;
  opt2=0;
  opt3=0;
  correcta=0;
  puntaje=0;
  result="correct";
  imgperro='';
  mostrarjuego=true;
  choice=false;

  sbtn1='btn btn-info';
  sbtn2='btn btn-info';
  sbtn3='btn btn-info';

  puntajesm:any='';

  constructor(private fdb:FiredbService){

    fdb.traerPreguntado()
    this.puntajesm=fdb.preguncol;
    this.startgame();
  }

  rolldog(){
    let aux1= Math.floor(Math.random()*6);
    let aux2=Math.floor(Math.random()*6);
    let aux3=Math.floor(Math.random()*6);
    while(aux2==aux1){
      aux2=Math.floor(Math.random()*6);
    }
    while(aux3==aux1||aux3==aux2){
      aux3=Math.floor(Math.random()*6);
    }

    this.correcta=aux1;

    switch (Math.floor(Math.random()*3)) {
      case 0:
        this.opt1=aux1;
        this.opt2=aux2;
        this.opt3=aux3
        break;
      case 1:
        this.opt2=aux1;
        this.opt1=aux2;
        this.opt3=aux3;
        break;
      case 2:
        this.opt3=aux1;
        this.opt2=aux2;
        this.opt1=aux3;
        break;
    
      default:
        break;
    }
  }


  newroud(){
    this.sbtn1='btn btn-info';
    this.sbtn2='btn btn-info';
    this.sbtn3='btn btn-info';
    this.rolldog();
    const consulta = this.fdb.traerPerro(this.razas[this.correcta]);
    const sub = consulta.subscribe((respuesta:any)=>{
      //this.paisesList = respuesta;
      this.formaturl(respuesta.message);
      console.log(respuesta);
      
      sub.unsubscribe();
    })
  }

  startgame(){ 
    this.newroud();
  }

  formaturl(urlfea:string){
    this.imgperro=urlfea.replace(/\\/g, '\\\\');
    console.log(this.imgperro);
  }

  restart(){
    this.opt1=0;
    this.opt2=0;
    this.opt3=0;
    this.correcta=0;
    this.puntaje=0;
    this.result="correct";
    this.imgperro='';
    this.choice=false;

    this.startgame();
  }

  showpuntaje(){
    this.mostrarjuego=false;
  }

  instrucciones(){
    Swal.fire({
      title: 'Cómo jugar',
      html: 'Se muestra una imagen de un perro y el jugador debe adivinar la raza del mismo.<br>'+
            'Si acierta, el jugador gana un punto y sigue jugando.<br>Si no acierta, el juego termina<br>'+
            'El puntaje se basa en la cantidad de razas que el jugador pudo adivinar exitosamente.',
      icon: 'question',
      confirmButtonText: 'OK!',
      heightAuto: false,

    })
  }

  choose(sele:number, btn:number){
    this.choice=true;
    let corre=true;
    if(this.correcta==sele){
      this.addPoints(btn);
    }else{
      corre=false;
      this.loose();
    }
  }

  cerrar(){
    this.closegame.emit(false);
  }

  loose(){
    this.sbtn1='btn btn-danger';
    this.sbtn2='btn btn-danger';
    this.sbtn3='btn btn-danger';

    if(this.correcta==this.opt1){
      this.sbtn1='btn btn-success';
    }else if(this.correcta==this.opt2){
      this.sbtn2='btn btn-success';
    }else{
      this.sbtn3='btn btn-success';
    }
      
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
    this.fdb.guardarPreguntado(this.puntaje);
  }

  addPoints(btn:number){
    this.puntaje++;

    this.sbtn1='btn btn-danger';
    this.sbtn2='btn btn-danger';
    this.sbtn3='btn btn-danger';

    switch (btn) {
      case 1:
        this.sbtn1='btn btn-success';
        break;
      case 2:
        this.sbtn2='btn btn-success';
        break;
      case 3:
        this.sbtn3='btn btn-success';
        break;
    }

    setTimeout(() => { 
      this.choice=false;
      this.newroud();
    }, 700);
  }


  volverJuego(){
    this.mostrarjuego=true;
  }
  
}
