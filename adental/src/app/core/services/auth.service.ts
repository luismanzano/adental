import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestore} from '@angular/fire/firestore';
import {} from '@angular/fire/database';
import {Router} from '@angular/router';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import * as firebase from 'firebase';
import { TratamientoComponent } from 'src/app/doctor/tratamiento/tratamiento.component';

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
  idConsulta: string;
  idLogeado: string;

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
          blocks: [],
          conection: [],
          nextAppointment: '',
          nextAppointments: [],
          history: []
        });
        alert('Usuario Creado');
      });
  }

  current() {
    const usuario = firebase.auth().currentUser;

    this.firestore.collection('users').doc(usuario.uid).valueChanges().subscribe((user: any) => {
      this.mainUser.id = user.id;
      this.mainUser.type = user.type;
      this.mainUser.username = user.username;
      this.mainUser.name = user.name;
      this.mainUser.lastname = user.lastname;

      console.log(this.mainUser);
    });
  }

  sendEmail(to: string, text: string) {
    const data = {
      email: to,
      message: text
    };

    return this.firestore.collection('submissions').add(data);

  }

  login(email: string, password: string) {
    // return this.af.auth.signInWithEmailAndPassword(email, password);
    this.af.auth.signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log(data);
        this.user =  data.user.uid;
        console.log(this.user);
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
        console.log(user.data().id);
        this.router.navigate(['/perfil-paciente']);
      } else if (user.data().type == '1') {
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

  getCollection(collection: string) {
    return this.firestore.collection(collection.toString()).get();

  }

  addToCollection(collection: string, data: any) {
    return this.firestore.collection(collection).add(data);
  }

  logout() {
    return this.af.auth.signOut();
  }

  public getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }

  public getUser(user: string) {
    return this.firestore.collection('users').doc(user).get();

  }

  public updateUser(documentId: string, data: any) {
    return this.firestore.collection('users').doc(documentId).set(data);
  }

  createPatient(email: string, pass: string, nombre: string, apellido: string, userType: string, guardar: boolean) {
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
          conection: [],
          nextAppointment: '',
          nextAppointments: [],
          history: []
        });
        console.log(cred.user.uid);
        this.savePatient(cred.user.uid);
      });
  }
  savePatient(idP: string) {
    console.log('Probando save Patient');
    console.log(idP);
    const pacienteRef = this.firestore.collection('users').doc(idP.toString());
    pacienteRef.update({ conection: firebase.firestore.FieldValue.arrayUnion('Y874AtlglXRjOkUdz52GdLbkD8g1')
        })
        .then(function() {
           console.log('Document successfully updated!');
      })
      .catch(function(error) {
        // The document probably doesn't exist.
         console.error('Error updating document: ', error);
      });

    const doctorRef = this.firestore.collection('users').doc('Y874AtlglXRjOkUdz52GdLbkD8g1');
    doctorRef.update({ conection: firebase.firestore.FieldValue.arrayUnion(idP)
        })
        .then(function() {
           console.log('Document successfully updated!');
      })
      .catch(function(error) {
        // The document probably doesn't exist.
         console.error('Error updating document: ', error);
      });
  }

  saveBlock(idD: string, day: number, avl: boolean) {
    const arrEqual = day - 1;
    console.log('Probando saveBlock');
    console.log('idP');
    console.log('avl ' + avl);

    let pre_blocks = [];

    this.firestore.collection('users').doc(idD).get().subscribe(info => {
      console.log('La info a conseguir es');
      console.log(info);

      pre_blocks = info.data().blocks;

      console.log(pre_blocks);

      pre_blocks[arrEqual] = avl;

      console.log(pre_blocks);

      this.firestore.collection('users').doc(idD).update({blocks: pre_blocks})
        .then(succ => {
          alert('El bloque de trabajo ha sido actualizado');
        }).catch( err => {
        console.log(err);
        alert('No se pudo actualizar el bloque. Revise su conexion');
      });
    });


  }

  deleteUser(id: string) {
    this.firestore.collection('users').doc(id).delete().then( succ => {
      alert('Se creo exitosamente');
    }).catch( err => {
      console.log('Error');
      console.log(err);
    });
  }

  changeUser(id: string, newType: string) {
    this.firestore.collection('users').doc(id).update({type: newType})
      .then(succ => {
        alert('El usuario ha sido actualizado');
      }).catch( err => {
        console.log(err);
        alert('El usuario no se pudo actualizar. Revise su conexion');
    });
  }


  }

  // updateUser(id: string, attr: string, attrContent: string) {
  //   this.firestore.collection('users').doc(id).update({attr: attrContent})
  //     .then(succ => {
  //       alert('El usuario ha sido actualizado');
  //     }).catch( err => {
  //     console.log(err);
  //     alert('El usuario no se pudo actualizar. Revise su conexion');
  //   });
  // }




