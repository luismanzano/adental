import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  doctores = [];

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

}
