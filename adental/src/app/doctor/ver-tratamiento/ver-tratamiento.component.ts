import { Component, OnInit } from '@angular/core';
import { VerConsultaComponent } from '../ver-consulta/ver-consulta.component';


@Component({
  selector: 'app-ver-tratamiento',
  templateUrl: './ver-tratamiento.component.html',
  styleUrls: ['./ver-tratamiento.component.css']
})
export class VerTratamientoComponent implements OnInit {

  treatment: string;
  toPay: number;
  constructor(
   private consulta: VerConsultaComponent
  ) { }

  ngOnInit() {
    this.treatment=this.consulta.treatments
    this.toPay=this.consulta.toPay
  }

}
