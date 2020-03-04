import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { AuthService} from '../../core/services/auth.service';
import any = jasmine.any;
import { AngularFireAuth} from '@angular/fire/auth';


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
  testVar: string;
  testVar = 'SdA3Q143pzSKYH3MVXbBRJIn7A43';

  constructor(
    private router: Router,
    private authService: AuthService,
    private form: FormsModule,
    private af: AngularFireAuth
  ) { }

  ngOnInit() {

  }



  login() {
    this.authService.login(this.user, this.password);
  }

  setUser(user) {

    // ESTE CODIGO DE ACA FUNCIONA NO TOCAR

    // this.id = this.af.authState.subscribe( user => {
    //   this.id = user.uid;
    //   console.log(this.id);

    this.af.authState.subscribe( user => {
      this.id = user.uid;
      console.log(this.id);

    });
  }

  redirectUser(id: string) {
    alert('Esto esta funcionando');
    this.authService.userData(id).subscribe( user => {
       console.log(user.data() );
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
