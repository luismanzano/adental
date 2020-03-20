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
        if (this.doctores[i].blocks[day.getDay()] === false) {
          this.display = false;
        } else if (this.doctores[i].blocks[day.getDay()] === undefined){
          this.display = false;
        } else {
          this.display = true;
        }
      }
    }

    if (this.chosenDate == undefined)
      this.display = false;
  }

}
