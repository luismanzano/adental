import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { VerConsultaComponent } from '../ver-consulta/ver-consulta.component';
import * as firebase from 'firebase';


@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {

  id: string;
  nombre: string;
  last: any;
  email: string;
  arregloConsulta = [];
  idConsulta: string
  montoDebe: number;
  consultaId: string;
  consulta: any;
  prueba: number;
  montoTotal: number;
  montoParcial: number

  db = firebase.firestore();
  private sub: any;
  constructor(private route: ActivatedRoute,
    public firestore: AngularFirestore,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
    })

    this.montoTotal=0;
    this.montoParcial=0;

    this.userData(this.id).subscribe(usuario => {
      this.nombre = usuario.data().name;
      this.last = usuario.data().lastname;
      this.email = usuario.data().username;
      var length = usuario.data().history.length;
      for(var i=0; i<length; i++){
        this.idConsulta=usuario.data().history[i].toString();
        this.userDataConsulta(this.idConsulta).subscribe(consulta =>{
          this.arregloConsulta.push(consulta.data())
          this.montoParcial= consulta.data().montoPago;
          this.montoTotal= this.montoTotal + this.montoParcial;
        });
      }
    })
  }

  iteracion(){
    this.prueba=+this.prueba
  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();
  }

  userDataConsulta(data: string) {
    return this.firestore.collection('consultas').doc(data).get();

  }

  irConsulta(consulta: any){
    console.log(consulta);
  this.router.navigate(['/consulta', consulta]);
  }

  



}


