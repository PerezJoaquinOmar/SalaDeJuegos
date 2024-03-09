import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FiredbService { 

  constructor(private aFirestore:AngularFirestore,private http:HttpClient, private rtr:Router) { }

  usercol!:any;
  logcol!:any;
  chatcol:any;
  ahorcadocol:any;
  mayormenorcol:any;
  preguncol:any;
  puntecol:any;

  /*traer(){
    const col = this.aFirestore.collection('usuarios');
    col.valueChanges().subscribe((next:any) => {
      console.log(next);
      this.usercol = next;
    })
  }*/


  // updat(update: any){
  //   const documento = this.aFirestore.doc('coleccion/'+update.id);
  //   documento.update(update);
  //   //documento.update({})
  // }

  // delete(id:string){
  //   const documento  = this.aFirestore.doc('coleccion/'+id);
  //   documento.delete();
  // }

  traerUsuario(id:string){
    return this.aFirestore.collection('usuarios').doc(id);
  }

  guardarUsuario(usuario:any){
    const col = this.aFirestore.collection('usuarios');
    const documento = this.aFirestore.doc('usuarios/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      nombre: usuario.nombre,
      email: usuario.email,
      encuesta:false,
      perfil:"usuario"
    });
  }

  async traerUsuarios(){
    this.usercol = this.aFirestore.collection('usuarios');
    this.usercol.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.usercol = next; 
      return next;
    })
  }

  async existeUsuario(mail:string){
    
  }

  async getNombre(mail:string){
    let nom="";
    for(let i=0; i < this.usercol.length;i++){
      if(this.usercol[i].email == mail){
        nom = this.usercol[i].nombre;
        localStorage.setItem("usuario", JSON.stringify(this.usercol[i]))
        this.guardarLog(nom)
        break;
      }
    }
    return nom;
  }

  guardarLog(nom:string){
    const col = this.aFirestore.collection('userLog');
    const documento = this.aFirestore.doc('userLog/'+this.aFirestore.createId());
    const now = new Date().toString();
    const nowstamp = new Date();
    console.log(now);
    documento.set({
      id:documento.ref.id,
      nombre: nom,
      hora: now,
      stamp: nowstamp,
      milis: Date.now()
    });
  }

  async traerLog(){
    this.usercol =this.aFirestore.collection('userLog', ref => ref.orderBy('stamp', "desc").limit(50));
    //this.usercol = this.aFirestore.collection('userLog');
    this.usercol.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.logcol = next; 
      return next;
    })
  }

  async traerChat(){
    /*const mythingy = this.aFirestore.collection('userLog');
    mythingy.valueChanges().subscribe((next:any) => {
      //console.log("traer",next);
      this.chatcol = next; 
      return next;
    })*/
    this.chatcol = this.aFirestore.collection('chat', ref => ref.orderBy('stamp', "asc").limit(50)).valueChanges();
  }

  guardarChat(msg:string){
    const col = this.aFirestore.collection('chat');
    const usr = JSON.parse(localStorage.getItem("usuario") as string);
    const documento = this.aFirestore.doc('chat/'+this.aFirestore.createId());
    const now = Date.now();
    const nowstamp = new Date();
    console.log(now);
    documento.set({
      id:documento.ref.id,
      usuario:usr,
      mensaje: msg,
      hora: nowstamp,
      stamp: now,
    });
  }

  guardarAhorcado(puntaje:string, milis:number){
    //console.log(puntaje, milis)
    const col = this.aFirestore.collection('ahorcadoscore');
    const usr = JSON.parse(localStorage.getItem("usuario") as string);
    const documento = this.aFirestore.doc('ahorcadoscore/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      usuario:usr,
      tiempo: puntaje,
      milis: milis,
      fecha:Date.now()
    });
  }

  guardarMayor(puntaje:number){
    //console.log(puntaje, milis)
    const col = this.aFirestore.collection('mayormenorscore');
    const usr = JSON.parse(localStorage.getItem("usuario") as string);
    const documento = this.aFirestore.doc('mayormenorscore/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      usuario:usr,
      score: puntaje,
      fecha: Date.now()
    });
  }

  guardarPreguntado(puntaje:number){
    //console.log(puntaje, milis)
    const col = this.aFirestore.collection('preguntadoscore');
    const usr = JSON.parse(localStorage.getItem("usuario") as string);
    const documento = this.aFirestore.doc('preguntadoscore/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      usuario:usr,
      score: puntaje,
      fecha: Date.now()
    });
  }

  guardarPunteria(puntaje:number){
    //console.log(puntaje, milis)
    const col = this.aFirestore.collection('punteriascore');
    const usr = JSON.parse(localStorage.getItem("usuario") as string);
    const documento = this.aFirestore.doc('punteriascore/'+this.aFirestore.createId());
    documento.set({
      id:documento.ref.id,
      usuario:usr,
      score: puntaje,
      fecha: Date.now()
    });
  }

  updateuser(usuario:any){
    const documento = this.aFirestore.doc('usuarios/'+usuario.id);
    documento.update(usuario);
  }

  async guardarEncuesta(encu:any):Promise<boolean>{
    console.log(encu)
    let ret=true;
    const col = this.aFirestore.collection('encuestaJuegos');
    const usr = JSON.parse(localStorage.getItem("usuario") as string);
    usr.encuesta=true;
    this.updateuser(usr);
    const documento = this.aFirestore.doc('encuestaJuegos/'+this.aFirestore.createId());
    try {
      documento.set({
        id:documento.ref.id,
        usuario:usr,
        nombre: encu.nombre,
        apellido: encu.apellido,
        telefono: encu.telefono,
        edad:encu.edad,
        favorito: encu.favorito,
        chat: encu.chat,
        comentario: encu.comentario,
        fecha: Date.now()
      }).then((value)=>{
        Swal.fire({
          title: 'Encuesta',
          html: 'Encuesta enviada con éxito.<br>'+
                'Volviendo a la pagina principal.<br>',
          icon: 'success',
          confirmButtonText: 'OK!',
          heightAuto: false,
        })
        this.rtr.navigate(['home'])
      })
    } catch (error) {
      Swal.fire({
        title: 'Error',
        html: 'Ocurrió un error al guardar la encuesta.<br>'+
              'Intente nuevamente.<br>',
        icon: 'error',
        confirmButtonText: 'OK!',
        heightAuto: false,
      })
      ret=false;
    }
    return ret;
  }

  async traerAhorcado(){
    this.ahorcadocol = this.aFirestore.collection('ahorcadoscore', ref => ref.orderBy('milis', "asc").limit(50)).valueChanges();
  }

  async traerMayormenor(){
    this.mayormenorcol = this.aFirestore.collection('mayormenorscore', ref => ref.orderBy('score', "desc").limit(50)).valueChanges();
  }

  async traerPreguntado(){
    this.preguncol = this.aFirestore.collection('preguntadoscore', ref => ref.orderBy('score', "desc").limit(50)).valueChanges();
  }

  async traerPunteria(){
    this.puntecol = this.aFirestore.collection('punteriascore', ref => ref.orderBy('score', "desc").limit(50)).valueChanges();
  }

  traerPerro(raza:string){
    return this.http.get("https://dog.ceo/api/breed/"+raza+"/images/random");
  }

}
