import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrar-consulta',
  templateUrl: './registrar-consulta.component.html',
  styleUrls: ['./registrar-consulta.component.css']
})



export class RegistrarConsultaComponent implements OnInit {

  recipe:Boolean;
  tratamiento:Boolean;
  proxTratamientos:Boolean;

  constructor() { }

  ngOnInit() {
  }

  mostrarRecipe():void{
      this.recipe = true;
      this.tratamiento=false;
      this.proxTratamientos=false;
  }

  mostrarTratamiento():void{
      this.recipe = false;
      this.tratamiento=true;
      this.proxTratamientos=false;
  }

  mostrarProxTratamientos(){
      this.recipe = false;
      this.tratamiento=false;
      this.proxTratamientos=true;
  }
}
