import { Component, OnInit, ViewChild} from '@angular/core';
//import { ConsoleReporter } from 'jasmine';
import { RegistrarConsultaComponent } from '../registrar-consulta/registrar-consulta.component';

@Component({
  selector: 'app-tratamiento',
  templateUrl: './tratamiento.component.html',
  styleUrls: ['./tratamiento.component.css']
})
export class TratamientoComponent implements OnInit {
  
  

  estado:boolean = false;
  treatment: string;
  toPay: number;

  constructor(
    private consulta: RegistrarConsultaComponent
  ) { }

  ngOnInit() {
   
  }

  guardarTratamiento(){
    this.consulta.treatment=this.treatment;
    this.consulta.toPay=this.toPay;
  }
}
