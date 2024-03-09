import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FiredbService } from 'src/app/servicios/firedb.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-principal',
  templateUrl: './encuesta-principal.component.html',
  styleUrls: ['./encuesta-principal.component.css']
})
export class EncuestaPrincipalComponent {

  spinner=false;
  tele='';
  chat=false;

  public formaA!:FormGroup;
  constructor(private fb:FormBuilder, private fdb:FiredbService, private rtr:Router){
    this.clearform(); 

  }

  clearform(){
    this.formaA = this.fb.group({
      'nombre': ['', [Validators.required, this.spacesValidator]],
      'apellido': ['', [Validators.required, this.spacesValidator]],
      'edad': ['', [Validators.required , Validators.min(18), Validators.max(99)]],
      'telefono': ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern("^[0-9-]*"),/*, this.periodValidator*/]],
      'favorito': ['', [Validators.required]],
      'chat': [false, [Validators.required]],
      'comentario': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(300)]]
    });
  }

  private spacesValidator(control: AbstractControl): null | object {
    const nombre = <string>control.value;
    const spaces = nombre.includes(' ');
    return spaces
      ? { containsSpaces: true }
      : null;
  }

  vacio(){  //existe para testear cosas
    //this.fdb.guardarEncuesta(this.formaA.value);
    console.log(this.formaA.value)
    //console.log(this.formaA.controls.telefono.errors)
  }

  changeChat(){
    this.chat = !this.chat
    this.formaA.value.chat=this.chat;
  }

  guardarEncuesta(){
    this.spinner=true;
    this.formaA.value.chat=this.chat;
    console.log(this.formaA.value)
    this.fdb.guardarEncuesta(this.formaA.value).then((res)=>{   
    })
    setTimeout(() => {  this.spinner=false; }, 2000);
  }
}
