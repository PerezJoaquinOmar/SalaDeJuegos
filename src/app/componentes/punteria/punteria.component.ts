import { Component, EventEmitter, Output } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';

@Component({
  selector: 'app-punteria',
  templateUrl: './punteria.component.html',
  styleUrls: ['./punteria.component.css']
})
export class PunteriaComponent {
  @Output() closegame = new EventEmitter();

  mostrarjuego=true;
  puntajes:any='';

  constructor(private fdb:FiredbService){
    fdb.traerPunteria();
    this.puntajes=fdb.puntecol;
  }


  vovlerinicio(){
    this.closegame.emit(false);
  }

  volverJuego(sele:boolean){
    this.mostrarjuego=sele;
  }

  guardar(puntos:number){
    this.fdb.guardarPunteria(puntos);
  }
}
