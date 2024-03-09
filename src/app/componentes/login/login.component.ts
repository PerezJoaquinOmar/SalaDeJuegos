import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public forma!: FormGroup;
  mail="";
  pass="";

  constructor(private fb: FormBuilder, private _router:Router, private _login:LoginService, private appc:AppComponent){
    this.forma = this.fb.group({
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      'email': ['', [Validators.required, Validators.email]]
    });
    //this.fdb.traerUsuarios();

  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');
    return spaces
      ? { containsSpaces: true }
      : null;
  }

  async login(){
    //console.log(this._login.loginService(this.forma.value.email, this.forma.value.password))
    if(await this._login.loginService(this.forma.value.email, this.forma.value.password)){
      Swal.fire({
        title: 'Éxito!',
        html: 'Ingreso exitoso.<br>Bienvenido <b>' + this.mail+"</b>",
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      console.log(this._login.loggedUser)
      this.appc.subuser();
      this._router.navigate(['home'])
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Correo o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Reintentar!'
      })
    }
    
    //console.log(this.forma.value.email, this.forma.value.password);
  }

  loadUser(userNum:number){
    switch(userNum){
      case 1:
        this.mail="owain.ozana@gmail.com";
        this.pass="748159263aaAA";
        break;
      case 2:
        this.mail="nikandros@gmail.com";
        this.pass="12546789AbcD";
        break;
      case 3:
        this.mail="leonidasduri@outlook.com";
        this.pass="789456123aaBB";
        break;
      case 4:
        this.mail="profe@gmail.com";
        this.pass="789456123aaBB";
        break;
    }
  }

  reg(){
    this._router.navigate(['registro'])
  }
}
