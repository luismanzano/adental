import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  mainUser = this.authService.mainUser;
  activar: boolean;
  contrasena: string;
  idP: string;
  arregloConsulta = [];
  name: string;
  last: string;
  username: string;
  private sub: any;

  constructor(
    private authService: AuthService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.idP = params['id'];
    })
    
    this.userData(this.idP.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname;
      this.username = usuario.data().username;
    })
  }

  activarCambiarContra(){
    if(this.activar){
      this.activar = false;
    } else{
      this.activar = true;
    }
  }

  cambiarContra() {
    console.log(this.idP);
    var paciente = this.firestore.collection('users').doc(this.idP.toString());
    var user = firebase.auth().currentUser;
    paciente.update({
      password: this.contrasena
    })
    user.updatePassword(this.contrasena.toString());
  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();
  }
}
