import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private af: AngularFirestore) { 
    this.usersCollection = af.collection('users');
    this.users = this.usersCollection.valueChanges();
    
  }

  private usersCollection: AngularFirestoreCollection;
  private users: Observable<any[]>;
  private userDoc: AngularFirestoreDocument;
  private user: Observable<any>

  getUsuarios(){
    return this.users;
  } 
  getUsuario(idUser: string){
    this.userDoc = this.af.doc('users/${idUser}');
    return this.user =this.userDoc.snapshotChanges().pipe(map(action =>{
      if(action.payload.exists = false){
        return null;
      } else {
        const data = action.payload.data();
        data.id= action.payload.id;
        return data;
      }
    }))
  }
  getPacientes(){}
   getDoctores(){}
   agregarPaciente(){}
   agregarUsuario(){}

}
