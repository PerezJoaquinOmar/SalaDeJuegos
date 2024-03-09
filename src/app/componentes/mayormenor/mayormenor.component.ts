import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mayormenor',
  templateUrl: './mayormenor.component.html',
  styleUrls: ['./mayormenor.component.css']
})
export class MayormenorComponent {

  @Output() closegame = new EventEmitter();

  cerrar(event:boolean){
    this.closegame.emit(false);
  }

}
