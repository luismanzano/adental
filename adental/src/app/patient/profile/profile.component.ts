import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mainUser = this.authService.mainUser;
  activar: boolean;
  contrasena: String;
  id: String;

  constructor(
    private authService: AuthService, 
    public firestore: AngularFirestore
  ) {}

  ngOnInit() {
  }

  activarCambiarContra(){
    if(this.activar){
      this.activar = false;
    } else{
      this.activar = true;
    } 
  }

  cambiarContra(){
    this.id = this.mainUser.id
    var paciente = this.firestore.collection('users').doc(this.id.toString());
    var user = firebase.auth().currentUser;
    paciente.update({
      password: this.contrasena
    })
    user.updatePassword(this.contrasena.toString());
  }
}
