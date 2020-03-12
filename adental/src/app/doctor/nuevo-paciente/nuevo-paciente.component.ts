import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';
import '../../../assets/smtp.js';

declare let Email: any;


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


  mensaje: string;
  pacienteCreado: string;

  doctorActual: any;
  pacienteNuevo: any;

  constructor(
    protected authService: AuthService
  ) {
  }

  ngOnInit() {
    alert(this.authService.mainUser.id);

    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'luisfmanzanoa@gmail.com',
      Password : '5F575ADA25677A5648382C1AFABA783B64AD',
      To : 'luis.fernando.manzano.alvarez@gmail.com',
      From : `luisfmanzanoa@gmail.com`,
      Subject : 'this.model.subject',
      Body : 'jdjdjdjdjdj'
    }).then( message => {alert('mensaje enviado'); } );
  }

  guardarPaciente() {
    const that = this;
    // alert(this.paciente_email);
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

    this.sendEmail();

  }

  sendEmail() {
    this.mensaje = '<h2>Se le ha creado un nuevo usuario en Adolf Dental Care</h2> <br> ' +
      'Nombre: ' + this.paciente_nombre + ' Apellido: ' + this.paciente_apellido +
      '<br> ' + 'Su usuario es: ' + this.paciente_email + '<br>'
    + 'Su contraseña es: ' + this.paciente_contrasena + '<br>' + 'RECUERDE CAMBIAR SU CONTRASEÑA UNA VEZ INICIE SU PRIMERA SESION';
    this.authService.sendEmail(this.paciente_email, this.mensaje );
  }


  }


