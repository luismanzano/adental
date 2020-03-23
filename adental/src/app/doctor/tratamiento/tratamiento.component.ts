import { Component, OnInit, ViewChild} from '@angular/core';
//import { ConsoleReporter } from 'jasmine';
import { RegistrarConsultaComponent } from '../registrar-consulta/registrar-consulta.component';
import { PerfilPacienteComponent } from '../perfil-paciente/perfil-paciente.component';

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
    private consulta: RegistrarConsultaComponent,
  ) { }

  ngOnInit() {
   this.treatment=this.consulta.treatment;
   this.toPay=this.consulta.toPay;
  }

  guardarTratamiento(){
    this.consulta.treatment=this.treatment;
    this.consulta.toPay=this.toPay;
  }
}
