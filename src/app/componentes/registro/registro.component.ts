import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/servicios/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  public forma!: FormGroup;
  mail="";
  pass="";
  nombre="";
  repass="";
  spinner=false;

  constructor(private fb: FormBuilder, private _router:Router, private _login:LoginService){
    this.forma = this.fb.group({
      'password': ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      'repassword': ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]],
      'email': ['', [Validators.required, Validators.email]],
      'nombre': ['', [Validators.required, this.spacesValidator]]
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

  repasscheck(){
    
  }


  async registrar(){
    this.spinner=true;
    if(await this._login.registrarUser(this.forma.value)){
      Swal.fire({
        title: 'Éxito!',
        html: 'Registro exitoso.<br>Volviendo al ingreso',
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      this.login()
    }else{
      this.spinner=false;
      Swal.fire({
        title: 'Error!',
        html: 'El correo ingresado ya está en uso.<br>Ingrese un nuevo correo',
        icon: 'error',
        confirmButtonText: 'Reintentar!'
      })
    }
    

  }

  loadUser(userNum:number){
    switch(userNum){
      case 1:
        this.mail="owain.ozana@gmail.com";
        this.pass="748159263aaAA";
        this.nombre="Owain";
        break;
      case 2:
        this.mail="Karel@gmail.com";
        this.pass="12546789AbcD";
        this.nombre="Nitya";
        break;
      case 3:
        this.mail="Pallabi@yahoo.com";
        this.pass="12546789AbcD";
        this.nombre="Bagus";
        break;
      case 4:
        this.mail="SiemJanek@outlook.com";
        this.pass="12546789AbcD";
        this.nombre="Janek";
        break;
    }
    this.repass = this.pass;
  }

  async login(){
    //console.log(this._login.loginService(this.forma.value.email, this.forma.value.password))
    if(await this._login.loginService(this.forma.value.email, this.forma.value.password)){
      Swal.fire({
        title: 'Éxito!',
        html: 'Ingreso exitoso.<br>Bienvenido <b>' + this.nombre+"</b>",
        icon: 'success',
        confirmButtonText: 'OK!'
      })
      console.log(this._login.loggedUser)
      this.spinner=false;
      this._router.navigate(['home'])
    }else{
      Swal.fire({
        title: 'Error!',
        text: 'Correo o contraseña incorrectos',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    }
    this.spinner=false;
  }

  reglogin(){
    this._router.navigate(['login'])
  }
}
