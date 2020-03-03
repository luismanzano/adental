import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AuthService} from '../../core/services/auth.service';
import any = jasmine.any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string;
  password: any;
  id: any;
  userFromDB: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private form: FormsModule
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user, this.password)
      .then(() => {
        alert('Usuario Logeado');
        this.redirectUser();
        //this.router.navigate(['/nuevo-usuario']);
      })
      .catch(() => alert('No se logeo'));
  }

  redirectUser() {
    alert('Esto esta funcionando');
     this.authService.userData().subscribe( user => {
       console.log(user.data() )
       this.userFromDB = user.data();
     });

    console.log(this.userFromDB);
  }

/*
  createUser() {
    this.authService.createUser(this.user, this.password)
      .then(() => {
        alert('Usuario Creado');
      })
      .catch(() => alert('Usuario No Creado'));
  }
*/
}
