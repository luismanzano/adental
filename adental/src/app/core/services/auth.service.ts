import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore} from '@angular/fire/firestore';
import {} from '@angular/fire/database';
import {Router} from "@angular/router";
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import * as firebase from 'firebase';

interface User {
  name: string;
  lastname: string;
  username: string;
  type: any;
  id: string;
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: string;
  mainUser: User;
  cred: string;
  idDoctor: string;
  idPatient: string;
  doctorRef: any;
  array: any[];
  constructor(
    private router: Router,
    public af: AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  createUser(email: string, pass: string, nombre: string, apellido: string, userType: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, pass)
      .then(cred => {
        console.log(cred.user);
        this.cred = cred.user.uid;
        return this.firestore.collection('users').doc(cred.user.uid).set({
          type: userType,
          username: email,
          password: pass,
          name: nombre,
          lastname: apellido,
          id: cred.user.uid.toString(),
          conection:[]
        });
        alert('Usuario Creado');
      });
  }

  sendEmail(to: string, text: string) {
    let data = {
      email: to,
      message: text
    }

    return this.firestore.collection('submissions').add(data);

  }

  login(email: string, password: string) {
    // return this.af.auth.signInWithEmailAndPassword(email, password);
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.user =  data.user.uid;
        console.log(this.user)
        alert('Usuario Logeado');
        this.redirectUser(this.user);
      })
      .catch(() => alert('No se logeo'));


  }

  redirectUser(id: string) {
    alert('Esto esta funcionando');
    this.userData(this.user).subscribe( user => {

      console.log('User Data' );
      console.log(user.data() );

      this.mainUser = {
        name: user.data().name,
      lastname: user.data().lastname,
      username: user.data().username,
      type: user.data().type,
      id: user.data().id
      };

      // tslint:disable-next-line:triple-equals
      if (user.data().type == '0') {
        this.router.navigate(['/perfil-paciente']);
      }
      else if (user.data().type == '1') {
        this.router.navigate(['/perfil-doctor']);
      }
      else {
        this.router.navigate(['/nuevo-usuario']);
      }
    });
  }


  getEstadoUsuario() {
    return this.af.authState;
  }

  theUser() {
    return this.af.auth.currentUser;
  }


  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

  logout() {
    return this.af.auth.signOut();
  }

  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('users').doc(documentId).set(data);
  }

  createPatient(email: string, pass: string, nombre: string, apellido: string, userType: string, guardar:boolean) {
    return this.af.auth.createUserWithEmailAndPassword(email, pass)
      .then(cred => {
        console.log(cred.user);
        this.cred = cred.user.uid;
         this.firestore.collection('users').doc(cred.user.uid).set({
          type: userType,
          username: email,
          password: pass,
          name: nombre,
          lastname: apellido,
          id: cred.user.uid.toString(),
          conection:[],
        });
        console.log(cred.user.uid);
        this.savePatient(cred.user.uid);
      })
  }
  savePatient(idP: String){
    console.log('Probando save Patient');
    console.log(idP);
    var pacienteRef = this.firestore.collection("users").doc(idP.toString());
        pacienteRef.update({ "conection": firebase.firestore.FieldValue.arrayUnion("Y874AtlglXRjOkUdz52GdLbkD8g1")
        })
        .then(function() {
           console.log("Document successfully updated!");
      })
      .catch(function(error) {
        //The document probably doesn't exist.
         console.error("Error updating document: ", error);
      });

      var doctorRef = this.firestore.collection("users").doc("Y874AtlglXRjOkUdz52GdLbkD8g1");
        doctorRef.update({ "conection": firebase.firestore.FieldValue.arrayUnion(idP)
        })
        .then(function() {
           console.log("Document successfully updated!");
      })
      .catch(function(error) {
        //The document probably doesn't exist.
         console.error("Error updating document: ", error);
      });
  }

  
  
}
