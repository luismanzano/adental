import { Component, OnInit } from '@angular/core';
import { RegistrarConsultaComponent } from '../registrar-consulta/registrar-consulta.component';

@Component({
  selector: 'app-prox-tratamientos',
  templateUrl: './prox-tratamientos.component.html',
  styleUrls: ['./prox-tratamientos.component.css']
})
export class ProxTratamientosComponent implements OnInit {

  nextTreatments: string;
  constructor(
    private consulta: RegistrarConsultaComponent
  ) { }

  ngOnInit() {
    this.nextTreatments = this.consulta.nextTreatments
  }

  guardarProxTratamiento(){
    this.consulta.nextTreatments=this.nextTreatments;
  }
}
