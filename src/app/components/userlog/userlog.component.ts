import { Component } from '@angular/core';
import { FiredbService } from 'src/app/servicios/firedb.service';

@Component({
  selector: 'app-userlog',
  templateUrl: './userlog.component.html',
  styleUrls: ['./userlog.component.css']
})
export class UserlogComponent {
  showgame=false;
  showgrid=true;

  //| date:'d/M/yy, h:mm a'

  constructor(public fdb:FiredbService){
    fdb.traerLog();
  }


  mostrarLog(){

  }
}
