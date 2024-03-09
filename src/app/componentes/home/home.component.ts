import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  game=false;
  modo=""
  maiclass='';
  ahorclass='';
  mayorclass='';
  pregunclass='';
  puntclass='';

  cambiarJuego(jueg:string){
    this.maiclass='';
    this.ahorclass='';
    this.mayorclass='';
    this.pregunclass='';
    this.puntclass='';

    this.maiclass="scale-out-vertical"
    setTimeout(() => { 
      
      this.modo=jueg;
      this.game=true;
      switch(jueg){
        case "ahorcado":
          this.ahorclass="scale-in-ver-center"
          break;
        case "mayormenor":
          this.mayorclass="scale-in-ver-center"
          break;
        case "preguntado":
          this.pregunclass="scale-in-ver-center"
          break;
        case "punteria":
          this.puntclass="scale-in-ver-center"
          break;
      }
    }, 500);
  }

  closegame(event:boolean){

    this.maiclass='';
    this.ahorclass='';
    this.mayorclass='';
    this.pregunclass='';
    this.puntclass='';

    switch(this.modo){
      case "ahorcado":
        this.ahorclass="scale-out-vertical"
        break;
      case "mayormenor":
        this.mayorclass="scale-out-vertical"
        break;
      case "preguntado":
        this.pregunclass="scale-out-vertical"
        break;
      case "punteria":
        this.puntclass="scale-out-vertical"
        break;
    }

    
    setTimeout(() => { 
      this.maiclass="scale-in-ver-center"
      this.game=event;
      this.modo="";
      
      
    }, 500);
  }
}
