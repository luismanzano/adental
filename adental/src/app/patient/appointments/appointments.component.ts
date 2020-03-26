import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';
import * as firebase from 'firebase';
import FieldValue = firebase.firestore.FieldValue;


interface Cita {
  doctor: string;
  patient: string;
  date: Date;
  timeblock: number;
  confirmed: boolean;
  cancelled: boolean;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})


export class AppointmentsComponent implements OnInit {

  mainUser = this.authService.mainUser;

  doctores = [];
  chosenDoctor: string;
  chosenDate = new Date('2020-19-3');
  display = false;
  day = new Date(this.chosenDate);
  book = false;
  modify = false;
  citaActual: any;
  doctor: string;
  fecha: string;

  appointments = [];

  availableBlocks = [
    true, true, true, true, true, true, true, true, true, true
  ];
  private horario: any;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUsers().subscribe((users: any) => {
      for (let i = 0; i <= users.length; i++) {
       // console.log(users[i].payload.doc.data());
        if (users[i].payload.doc.data().type == '1') {
          console.log(users[i].payload.doc.data().name);
          this.doctores.push(users[i].payload.doc.data());
        }
      }
    });

    console.log(this.book);

    this.checkAppo();

    console.log(this.book);
    console.log(this.mainUser);
  }

  searchDates() {
    console.log(this.chosenDoctor);
    console.log(this.doctores);

    console.log(this.chosenDate);

    const day = new Date(this.chosenDate);
    console.log(day.getDay());

    for (let i = 0; i <= this.doctores.length; i++) {
      if (this.doctores[i].id == this.chosenDoctor) {
        console.log(this.doctores[i].id);
        if (this.doctores[i].blocks[day.getDay()] === false) {
          this.display = false;
        } else if (this.doctores[i].blocks[day.getDay()] === undefined) {
          this.display = false;
        } else {
          this.display = true;
          console.log('Llega a getAllAppointments');
          this.getAllAppointments();
        }
      }
    }

    if (this.chosenDate == undefined) {
      this.display = false;
    }


  }
  getAllAppointments() {
    this.authService.firestore.collection('citas').valueChanges().subscribe( (appo: any) => {
      console.log('appo');
      console.log(appo);
      for (let i = 0; i <= appo.length; i++) {
        console.log(appo[i].doctor);

        if (appo[i].doctor == this.chosenDoctor) {

          console.log(appo[i]);
          console.log(appo[i].date);
          console.log(this.chosenDate);
          const toConvert = new Date(appo[i].date);
          const cancel = appo[i].cancelled;
          console.log('dya');
          console.log(toConvert);

          console.log('local');
          const toConvert2 = new Date(this.chosenDate);
          console.log(toConvert2);

          const day = toConvert.getDay();
          const month = toConvert.getMonth();
          const year = toConvert.getFullYear();
          const chosenDay = toConvert2.getDay();
          const chosenMonth = toConvert2.getMonth();
          const chosenYear = toConvert2.getFullYear();

          console.log('VERIFICANDO FECHAS');
          console.log(day);
          console.log(chosenDay);
          console.log(month);
          console.log(chosenMonth);
          console.log(year);
          console.log(chosenYear);

          if (chosenDay.toString() === day.toString() && chosenMonth.toString() === month.toString() && chosenYear.toString() === year.toString() && cancel === false) {
            console.log(appo[i].timeblock);
            this.availableBlocks[appo[i].timeblock] = false;
            console.log(this.availableBlocks);
          }

        }

      }
    });
  }

  booking(hour: any) {
    alert('probando');
    const hora = hour;
    const cita: Cita = {
      date : this.chosenDate,
      cancelled: false,
      confirmed: false,
      doctor: this.chosenDoctor.toString(),
      patient: this.mainUser.id,
      timeblock: hora.toString()
    };
    console.log(cita);
    this.authService.firestore.collection('citas').add({
      date : this.chosenDate,
      cancelled: false,
      confirmed: false,
      doctor: this.chosenDoctor.toString(),
      patient: this.mainUser.id,
      timeblock: hora.toString()
    }).then( succ => {
      alert('Se ha agendado la cita exitosamente');
      this.authService.firestore.collection('users').doc(this.mainUser.id).update({
        nextAppo: succ.id,
        booked: true
      });
      this.authService.firestore.collection('users').doc(this.chosenDoctor).update({appos: firebase.firestore.FieldValue.arrayUnion(succ.id)});

      this.searchDates();
      this.display = false;
      this.checkAppo();

    }).catch(err => {
      alert('Ha ocurrido un error chequee su conexion ' + err);
    });


    this.searchDates();
    this.display = false;
    this.checkAppo();
  }


  checkAppo() {
    this.authService.getUser(this.mainUser.id).subscribe(user => {
      console.log(user.data());
      if (user.data().booked === true) {
        this.book = true;
        console.log(user.data().booked);
        this.citaActual =  user.data().nextAppo;
        console.log('Cita Acutal');
        console.log(this.citaActual);
        this.authService.firestore.collection('citas').doc(this.citaActual).get().subscribe(cita => {
          console.log(cita);
          console.log(cita.data());
          this.fecha = cita.data().date;
          this.horario = Number(cita.data().timeblock) + 8;

          this.authService.getUser(cita.data().doctor).subscribe( doctor => {
            this.doctor = doctor.data().name + ' ' + doctor.data().lastname;
          });
        });
      } else {
        this.book = false;
      }
    });
  }

  modifyAppo() {

  }

  cancelAppo() {
    let doctor: string;
    let citas: string;
    this.authService.firestore.collection('citas').doc(this.citaActual).get().subscribe(cita => {
      doctor = cita.data().doctor;
    });
    this.authService.firestore.collection('citas').doc(this.citaActual).update({cancelled: true})
      .then( cancel => {
        console.log('Ya cancelado esta en true');
        this.authService.firestore.collection('users').doc(this.mainUser.id).update({
          booked: false,
          nextAppo: ''
        }).then(pac => console.log('Cancelada en el paciente'));

        this.authService.firestore.collection('users').doc(doctor).update({
          appos: FieldValue.arrayRemove(this.citaActual),
          cancels: FieldValue.increment(1)
        }).then( xxx => console.log('Cancelada de doctor'));
        this.ngOnInit();
      });

  }

  test(i) {
    alert('prubando' + i);
  }

  toggleMod() {
    if (this.modify) {
      this.modify = false;
    } else {
      this.modify = true;
    }

    this.authService.firestore.collection('citas').doc(this.citaActual).get().subscribe( sub => {
      this.chosenDoctor = sub.data().doctor;
    });
  }

  modCita(index: any) {
    this.authService.firestore.collection('citas').doc(this.citaActual).update({
      date: this.chosenDate,
      timeblock: index
    }).then( succ => {
      alert('Se ha modificado con exito');
    }).catch( err  => alert('Hubo un error, intente mas tarde'));
    this.ngOnInit();

  }
}
