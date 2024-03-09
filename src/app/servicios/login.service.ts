import { Injectable } from '@angular/core';
import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut
} from '@angular/fire/auth';
import { FiredbService } from './firedb.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  usuarioActivo="Sala de Juegos";
  isLogged=false;
  loggedUser:any;
  error:any;
  
  constructor( private auth:Auth, private fdb:FiredbService) {
    this.fdb.traerUsuarios();
  }

  async loginService(email:string, pass:string){
    
    try {
			const user = await signInWithEmailAndPassword(this.auth, email, pass);
      
      console.log("yay");
      
      //this.usuarioActivo = email;
			this.loggedUser = user;
      //console.log(user);
      this.nombreUser(email);
      return true;
		} catch (e) {
      console.log("nay");
			return false;
		}
  }

  async nombreUser(email:string){
    
    try {
			const nom = await this.fdb.getNombre(email);
      this.usuarioActivo = nom;
      localStorage.setItem('nombre', nom);
      console.log("nombre yay", this.usuarioActivo)
      return true;
		} catch (e) {
      console.log("nombre nay");
			return false;
		}
  }

  logout() {
    this.usuarioActivo="Sala de Juegos";
	  return signOut(this.auth);
	}

  async registrarUser(regUser:any){
    
    //console.log(regUser)
    try {
			const user = await createUserWithEmailAndPassword(this.auth, regUser.email, regUser.password);
      this.fdb.guardarUsuario(regUser)
      console.log("yay reg");
      return true;
		} catch (e) {
      this.error = e;
      console.log("nay reg");
			return false;
		}
  }

  reloadNom(){
    this.usuarioActivo = localStorage.getItem('nombre') as string;
  }
}
