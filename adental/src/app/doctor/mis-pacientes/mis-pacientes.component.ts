import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { NgForOf } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.css']
})

export class MisPacientesComponent implements OnInit {
  
  nombre:string
  apelliddo:string
  correo: string
  ci: number
  user: string;
  paciente:string;
  idPaciente: string;
  arregloPaciente = [];
   

  constructor(
    public firestore: AngularFirestore
  ) { }

  ngOnInit() {
    this.userData("Y874AtlglXRjOkUdz52GdLbkD8g1").subscribe(user =>{
      var length = user.data().conection.length;
      for(var i=0; i < length; i++){
        this.idPaciente=user.data().conection[i].toString();
        this.userData(this.idPaciente).subscribe(usuario => {
          this.arregloPaciente.push(usuario.data())
        });
      }  
    }) 
    console.log(this.arregloPaciente); 
  }

  getNombre(nombre){
    return nombre
  }

  getApellido(apellido){
    return apellido
  }

  getCorreo(correo){
    return correo
  }

  getCi(ci){
    return ci
  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

}
