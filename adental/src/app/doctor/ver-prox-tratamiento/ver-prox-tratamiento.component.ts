import { Component, OnInit } from '@angular/core';
import { VerConsultaComponent } from '../ver-consulta/ver-consulta.component';

@Component({
  selector: 'app-ver-prox-tratamiento',
  templateUrl: './ver-prox-tratamiento.component.html',
  styleUrls: ['./ver-prox-tratamiento.component.css']
})
export class VerProxTratamientoComponent implements OnInit {


  nextTreatments: string;
  constructor(
    private consulta: VerConsultaComponent
  ) { }

  ngOnInit() {
    this.nextTreatments=this.consulta.nextTreatment
  }

}
