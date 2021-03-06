import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;
import { Router } from '@angular/router';

@Component({
  selector: 'app-appointments-doctor',
  templateUrl: './appointments-doctor.component.html',
  styleUrls: ['./appointments-doctor.component.css']
})
export class AppointmentsDoctorComponent implements OnInit {

  mainUser = {
    name: '',
    lastname: '',
    username: '',
    type: '',
    id: ''
  };
  appointments = [];
  filtered: any[];
  gottenPatients = [];
  idP: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.mainUser.id = localStorage.getItem('id');
    this.mainUser.name = localStorage.getItem('name');
    this.mainUser.lastname = localStorage.getItem('lastname');
    this.mainUser.username = localStorage.getItem('username');
    this.mainUser.type = localStorage.getItem('type');
    console.log(localStorage.getItem('id'));
    console.log(this.mainUser.id);
    console.log('QUE PASA CON ESTO'); this.appointments = [];
    this.gottenPatients = [];
    this.getAppointments();
    console.log('Se ejecuto el init');
  }


  getAppointments() {
    this.authService.firestore.collection('users').doc(this.mainUser.id).get().subscribe(user => {
      console.log('appos');
      console.log(user.data().appos);
      for (let i = 0; i <= user.data().appos.length; i++) {
        this.authService.firestore.collection('citas').doc(user.data().appos[i]).valueChanges().subscribe(
          (cita: any) => {
            this.appointments.push(cita);
            console.log('Primero Cita');
            console.log(cita);
            console.log('Pushing appointments');
            console.log(this.appointments);


            console.log('funcionando getPatients');
            console.log(cita.patient);
            this.idP=cita.patient;
            this.authService.firestore.collection('users').doc(cita.patient).valueChanges().subscribe((pat: any) => {
              console.log(pat);
              this.gottenPatients.push(pat.name + ' ' + pat.lastname);
              console.log('pushing patients');
              console.log(this.gottenPatients);
            });
          });
      }
    });
  }

  irConsulta(){
    console.log(this.idP);
    this.router.navigate(['/registrar-consulta', this.idP]);
  }
/*

  filterAppointments() {
    const today = new Date();
    for (let i = 0; i <= this.appointments.length; i++) {
      console.log('filtering');
      const appoDate = new Date(this.appointments[i].date);
      const day = appoDate.getDay();
      const month = appoDate.getMonth();
      const year = appoDate.getFullYear();
      if ((year >= today.getFullYear() || (month >= today.getMonth() && year >= today.getFullYear()) || (day >= today.getDay() && month >= today.getMonth() && year >= today.getFullYear()))) {

        this.filtered.push(this.appointments[i]);

      }
    }
  }
*/


  cancelAppo(patient: string) {
    let cita = '';
    this.authService.firestore.collection('users').doc(patient).valueChanges().subscribe((pati: any) => {
      cita = pati.nextAppo;
      console.log('CITA');
      console.log(cita);
      this.authService.firestore.collection('users').doc(this.mainUser.id).update({
          appos: FieldValue.arrayRemove(cita),
          cancels: FieldValue.increment(1)
        }).then(() => console.log('Eliminada del doctor')).
        then(() => {
        this.authService.firestore.collection('citas').doc(cita.toString()).update({
          cancelled: true
        }).then( () => {console.log('Cancelled = true')});
      }).then( () => {
        this.authService.firestore.collection('users').doc(patient).update({
          booked: false,
          nextAppo: ''
        }).then(() => location.reload());
      });

    });
  }

  confirmAppo(patient: string) {
    let cita = '';
    let email = '';
    this.authService.firestore.collection('users').doc(patient).valueChanges().subscribe((pati: any) => {
        cita = pati.nextAppo;
        email = pati.username;
        this.authService.firestore.collection('citas').doc(cita).update({
        confirmed: true
      }).then( () => console.log('Cancelled = true')).then( () => {
        this.authService.sendEmail(email, 'Su cita ha sido confirmada');
        }).then( () => location.reload());
    });
  }

}
