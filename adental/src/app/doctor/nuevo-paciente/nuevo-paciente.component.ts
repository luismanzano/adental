import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-nuevo-paciente',
  templateUrl: './nuevo-paciente.component.html',
  styleUrls: ['./nuevo-paciente.component.css']
})
export class NuevoPacienteComponent implements OnInit {

  paciente_nombre: string;
  paciente_apellido: string;
  paciente_email: string;
  paciente_email_saved: string;
  paciente_cedula: string;
  paciente_nacimiento: string;
  paciente_contrasena: string;
  pacienteCreado: string;

  doctorActual: any;
  pacienteNuevo: any;

  constructor(
    protected authService: AuthService
  ) { }

  ngOnInit() {
    alert(this.authService.mainUser.id);
  }

  guardarPaciente() {
    const that = this;
    //alert(this.paciente_email);
    this.paciente_email_saved = this.paciente_email;
    alert(this.paciente_email_saved);
    console.log(this.paciente_nombre);
    console.log(this.paciente_apellido);
    console.log(this.paciente_email);
    console.log(this.paciente_cedula);
    console.log(this.paciente_nacimiento);
    console.log(this.paciente_contrasena);
    this.authService.createPatient(this.paciente_email, this.paciente_contrasena, this.paciente_nombre, this.paciente_apellido, '0', true);
    console.log('cred');
    console.log(this.authService.cred);


   // this.authService.updateUser(this.authService.mainUser.id, {patients:.push(this.paciente_email)});

 /*   this.authService.getUsers().subscribe((users: any) => {
      console.log(users);

      setTimeout(assignId, 1000);

      function assignId() {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i <= users.length; i++) {
          console.log('todos los correos ' + i);
          console.log(users[i].payload.doc._document.proto.fields.username.stringValue);
          //console.log('///////////')
          //console.log('El correo del paciente')
          //console.log(that.paciente_email);
          if (that.paciente_email == users[i].payload.doc._document.proto.fields.username.stringValue ) {
            alert('Email Encontrado');
            console.log(users[i].payload.doc._document.proto.fields.username.stringValue);
            console.log(that.paciente_email);

          }
        }
      }

      // TERMINAR EL CODIGO QUE COLOCA LOS ID EN LOS USUARIOS

    });*/


    }



  // gOnInit() {
  //   this.firestoreService.getCats().subscribe((catsSnapshot) => {
  //     this.cats = [];
  //     catsSnapshot.forEach((catData: any) => {
  //       this.cats.push({
  //         id: catData.payload.doc.id,
  //         data: catData.payload.doc.data()
  //       });
  //     })
  //   });
  // }
}

