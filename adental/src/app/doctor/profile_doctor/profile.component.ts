import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-doctor',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombre='Reichel';
  apellido='Larez';
  user='Reichel.larez@correo.unimet.edu.ve'

  getNombre(){
    return this.nombre;
  }

  getApellido(){
    return this.apellido
  }

  getUser(){
    return this.user
  }

  constructor() { }

  ngOnInit() {
  }

}
