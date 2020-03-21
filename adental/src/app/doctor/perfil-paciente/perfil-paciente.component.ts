import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

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
  private sub: any;
  constructor(private route: ActivatedRoute,
    public firestore: AngularFirestore) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
    })

    this.userData(this.id).subscribe(usuario => {
      this.nombre = usuario.data().name;
      this.last = usuario.data().lastname;
      this.email = usuario.data().username;
      var length = usuario.data().history.length;
      for(var i=0; i<length; i++){
        this.idConsulta=usuario.data().history[i].toString();
        this.userDataConsulta(this.idConsulta).subscribe(consulta =>{
          var day = consulta.data().createdAt.toDate().getDate();
          console.log(day);
          this.arregloConsulta.push(consulta.data())
        });
      }
    })
  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

  userDataConsulta(data: string) {
    return this.firestore.collection('consultas').doc(data).get();

  }


}


//this.userData("Y874AtlglXRjOkUdz52GdLbkD8g1").subscribe(user =>{
  //var length = user.data().conection.length;
  //for(var i=0; i < length; i++){
    //this.idPaciente=user.data().conection[i].toString();
    //this.userData(this.idPaciente).subscribe(usuario => {
      //this.arregloPaciente.push(usuario.data())
   // });
 // }  
//}) 
//console.log(this.arregloPaciente); 