import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mis-pacientes',
  templateUrl: './mis-pacientes.component.html',
  styleUrls: ['./mis-pacientes.component.css']
})
export class MisPacientesComponent implements OnInit {
  
  nombre="Reichel"
  apelliddo="Larez"
  correo="Reichel.larez@correo.unimet.edu.ve"
  ci="27606275"
  constructor() { }

  ngOnInit() {
  }

  getNombre(nombre){
    return nombre
  }

  getApellido(apellido){
    return apellido
  }

  getCorreo(correo){
    return correo
  }

  getCi(ci){
    return ci
  }

 

}
