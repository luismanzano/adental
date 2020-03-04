import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore} from '@angular/fire/firestore';
import {} from '@angular/fire/database';
import {Router} from "@angular/router";

interface User {
  name: string;
  username: string;
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mainUser: User;

  constructor(
    private router: Router,
    public af: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  createUser(email: string, pass: string, nombre: string, apellido: string, userType: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, pass)
      .then(cred => {
        console.log(cred.user);
        return this.firestore.collection('users').doc(cred.user.uid).set({
          type: userType,
          username: email,
          password: pass,
          name: nombre,
          lastname: apellido

        });
      });
  }
  login(email: string, password: string) {
    // return this.af.auth.signInWithEmailAndPassword(email, password);
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.mainUser = {
          name: 'hola',
          username: 'loquesea@gmail.com',
          id: data.user.uid
        };
        console.log(this.mainUser)
        alert('Usuario Logeado');
        this.redirectUser(this.mainUser.id);
      })
      .catch(() => alert('No se logeo'));


  }

  redirectUser(id: string) {
    alert('Esto esta funcionando');
    this.userData(this.mainUser.id).subscribe( user => {
      console.log(user.data() );
      // tslint:disable-next-line:triple-equals
      if (user.data().type == '0') {
        this.router.navigate(['/perfil-paciente']);
      }
      else if (user.data().type == '1') {
        this.router.navigate(['/perfil-doctor']);
      } else {
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
}
