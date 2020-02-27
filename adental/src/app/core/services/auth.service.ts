import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
//import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore} from "@angular/fire/firestore";
import {} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private af: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }

  createUser(email: string, password: string) {
    return this.af.auth.createUserWithEmailAndPassword(email, password)
      .then(cred => {
        console.log(cred.user);
        return this.firestore.collection('users').doc(cred.user.uid).set({
          username: email
        });
      });
  }
  login(email: string, password: string) {
    return this.af.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.af.auth.signOut();
  }
}
