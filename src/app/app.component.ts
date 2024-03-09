import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './servicios/login.service';
import { FiredbService } from './servicios/firedb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = this._login.usuarioActivo; 
  user={encuesta:true, perfil:"usuario"};
  usrsub:any;

  constructor(public _login:LoginService, private _router:Router, private fdb:FiredbService){
    //this.user.encuesta=false;
    const logg = localStorage.getItem('nombre')
    if(!logg || logg == ""){
      console.log(_router.url)
      _router.navigate(['login'])
    }else{
      this.subuser();
      _login.reloadNom();
      _router.navigate(['home'])
    }
  }

  subuser(){
    const auxsr = JSON.parse(localStorage.getItem("usuario") as string);
    const usrcol=this.fdb.traerUsuario(auxsr.id)
    this.usrsub = usrcol.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.user = next;
      this._login.loggedUser=this.user
      console.log(this.user);
      return next;
    })
  }

  logout(){
    try {
      this._login.logout();
      this.usrsub.unsubscribe();
      this.user={encuesta:true, perfil:"usuario"};
      localStorage.setItem('nombre', "");
      Swal.fire({
        title: 'Sesión cerrada',
        html: 'Se ha cerrado la sesión.',
        icon: 'info',
        heightAuto: false,
  
      })
      this._router.navigate(['login'])
    } catch (error) {
      
    }
    
  }

  reg(){
    this._router.navigate(['registro'])
  }

  quiensoy(){
    this._router.navigate(['quienSoy'])
  }

  relogin(){
    this._router.navigate(['login'])
  }

  /**/
}
