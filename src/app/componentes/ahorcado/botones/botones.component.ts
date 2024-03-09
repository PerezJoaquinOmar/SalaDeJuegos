import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botones',
  templateUrl: './botones.component.html',
  styleUrls: ['./botones.component.css']
})
export class BotonesComponent {
  @Output() EviarLetra : EventEmitter<any> = new EventEmitter<any>();
  /*letras1=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N"];
  letras2=[ "Ñ", "O","P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];*/
  letras1=[
    {letra:"A", active:true, class:"btn btn-success"}, 
    {letra:"B", active:true, class:"btn btn-success"}, 
    {letra:"C", active:true, class:"btn btn-success"}, 
    {letra:"D", active:true, class:"btn btn-success"},
    {letra:"E", active:true, class:"btn btn-success"},
    {letra:"F", active:true, class:"btn btn-success"}, 
    {letra:"G", active:true, class:"btn btn-success"}, 
    {letra:"H", active:true, class:"btn btn-success"}, 
    {letra:"I", active:true, class:"btn btn-success"},
    {letra:"J", active:true, class:"btn btn-success"}, 
    {letra:"K", active:true, class:"btn btn-success"}, 
    {letra:"L", active:true, class:"btn btn-success"}, 
    {letra:"M", active:true, class:"btn btn-success"}, 
    {letra:"N", active:true, class:"btn btn-success"}];

  letras2=[
    {letra:"Ñ", active:true, class:"btn btn-success"}, 
    {letra:"O", active:true, class:"btn btn-success"}, 
    {letra:"P", active:true, class:"btn btn-success"}, 
    {letra:"Q", active:true, class:"btn btn-success"},
    {letra:"R", active:true, class:"btn btn-success"},
    {letra:"S", active:true, class:"btn btn-success"}, 
    {letra:"T", active:true, class:"btn btn-success"}, 
    {letra:"U", active:true, class:"btn btn-success"}, 
    {letra:"V", active:true, class:"btn btn-success"},
    {letra:"W", active:true, class:"btn btn-success"}, 
    {letra:"X", active:true, class:"btn btn-success"}, 
    {letra:"Y", active:true, class:"btn btn-success"}, 
    {letra:"Z", active:true, class:"btn btn-success"}];

  apalabra="lambda";

  constructor(){}

  pressletra(letr:any){
    //alert(letr)
    this.EviarLetra.emit(letr);
    //letr.active=false;
  }
}
