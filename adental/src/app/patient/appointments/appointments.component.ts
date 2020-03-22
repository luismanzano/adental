import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';


interface Cita {
  doctor: string;
  patient: string;
  date: Date;
  timeBlock: number;
  confirmed: boolean;
  cancelled: boolean;
}

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})


export class AppointmentsComponent implements OnInit {

  doctores = [];
  chosenDoctor: string;
  chosenDate = new Date('2020-19-3');
  display = false;
  day = new Date(this.chosenDate);

  appointments = [];

  availableBlocks = [
    true, true, true, true, true, true, true, true, true, true
  ]

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
          this.getAllAppointments2();
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
      console.log(appo.length);
      for (let i = 0; i <= appo.length; i++) {
        this.appointments.push(appo[i].payload.doc.data());
        console.log('////////;');
        console.log(appo[i].payload.doc.data());
        console.log(this.appointments[i]);
        console.log('quien va primero');
      }
    });


  }

  getAllAppointments2() {
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
          console.log('dya');
          console.log(toConvert);

          console.log('local');
          const toConvert2 = new Date(this.chosenDate)
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

          if (chosenDay.toString() === day.toString() && chosenMonth.toString() === month.toString() && chosenYear.toString() === year.toString() ) {
            console.log(appo[i].timeblock);
            this.availableBlocks[appo[i].timeblock] = false;
            console.log(this.availableBlocks);
          }

        }

      }
    });  }
}
