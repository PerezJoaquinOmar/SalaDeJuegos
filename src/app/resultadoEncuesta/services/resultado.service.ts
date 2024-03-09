import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ResultadoService {

  constructor(private aFirestore:AngularFirestore) { }

  traerEncuesta(){
    return this.aFirestore.collection('encuestaJuegos', ref => ref.orderBy('fecha', "desc").limit(50)).valueChanges();
  }
}
