import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent implements OnInit {

  nombre='Reichel Larez';

  getNombre(){
    return this.nombre;
  }
  constructor() { }

  ngOnInit() {
  }

}
