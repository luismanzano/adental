import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-ver-consulta',
  templateUrl: './ver-consulta.component.html',
  styleUrls: ['./ver-consulta.component.css']
  
})
export class VerConsultaComponent implements OnInit {

  tratamiento: Boolean;
  proxTratamiento: Boolean;
  recipe: Boolean;
  idConsulta: string;
  private sub: any;
  treatments: string;
  toPay: number;
  nextTreatment: string;
  recipeText: string;
  fecha: any;
  pagar: Boolean;



  constructor(
    private route : ActivatedRoute,
    public firestore: AngularFirestore,
  ) { 

  }
 


  ngOnInit() {

    this.pagar=true;

    this.sub = this.route.params.subscribe(params=>{
      this.idConsulta=params['id'];
    })

    this.consultaData(this.idConsulta).subscribe(consulta=>{
      this.nextTreatment=consulta.data().proxTratamiento
      this.treatments = consulta.data().tratamiento
      this.recipeText = consulta.data().recipe
      this.toPay = consulta.data().montoPago
      this.fecha = consulta.data().createdAt
    })
  }

 


  mostrarTratamiento():void{
    this.recipe = false;
    this.tratamiento=true;
    this.proxTratamiento=false;
}

mostrarProxTratamientos(){
  this.recipe = false;
  this.tratamiento=false;
  this.proxTratamiento=true;
}

mostrarRecipe():void{
  this.recipe = true;
  this.tratamiento=false;
  this.proxTratamiento=false;
}
consultaData(data: string) {
  return this.firestore.collection('consultas').doc(data).get();

}

}
