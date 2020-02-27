import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';


import { AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: string;
  password: any;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user, this.password)
      .then(() => {
        alert("Usuario Logeado")
      })
      .catch(() => alert("No se logeo"));
  }

  createUser() {
    this.authService.createUser(this.user, this.password)
      .then(() => {
        alert('Usuario Creado');
      })
      .catch(() => alert('Usuario No Creado'));
  }

}
