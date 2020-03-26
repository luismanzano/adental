import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from "firebase";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  mainUser = {
    name: '',
  lastname: '',
  username: '',
  type: '',
  id: ''
  };
  activar: boolean;
  contrasena: string;
  idP: string;
  arregloConsulta = [];
  name: string;
  last: string;
  username: string;
  idConsulta: string;
  private sub: any;

  constructor(
    private authService: AuthService,
    public firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    this.mainUser.id = localStorage.getItem('id');
    this.mainUser.name = localStorage.getItem('name');
    this.mainUser.lastname = localStorage.getItem('lastname');
    this.mainUser.username = localStorage.getItem('username');
    this.mainUser.type = localStorage.getItem('type');
    console.log(localStorage.getItem('id'));
    console.log(this.mainUser.id);
    console.log('QUE PASA CON ESTO');


    this.sub = this.route.params.subscribe(params => {
      this.idP = params['id'];
    })

    this.authService.idLogeado = this.idP;

    this.userData(this.mainUser.id.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname;
      this.username = usuario.data().username;
      var length = usuario.data().history.length;
      for(var i=0; i<length; i++) {
        this.idConsulta = usuario.data().history[i].toString();
        this.userDataConsulta(this.idConsulta).subscribe(consulta => {
          var day = consulta.data().createdAt.toDate().getDate();
          console.log(day);
          this.arregloConsulta.push(consulta.data())
        });
      }
    });
  }

  irConsulta(consulta: any){
    console.log(consulta);
    this.router.navigate(['/consulta', consulta]);
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

  userDataConsulta(data: string) {
    return this.firestore.collection('consultas').doc(data).get();
  }

  irPagar(consulta: string){
    this.router.navigate(['/pagos', consulta]);
  }
}
