import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
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
  nextTreatments: string;
  recipeText: string;
  fecha: any;
  pagar: Boolean;
  mainUser = {
    name: '',
  lastname: '',
  username: '',
  type: '',
  id: ''
  };



  constructor(
    private route : ActivatedRoute,
    public firestore: AngularFirestore,
    private router: Router

  ) { 

  }
 


  ngOnInit() {


    this.mainUser.id = localStorage.getItem('id');
    this.mainUser.name = localStorage.getItem('name');
    this.mainUser.lastname = localStorage.getItem('lastname');
    this.mainUser.username = localStorage.getItem('username');
    this.mainUser.type = localStorage.getItem('type');
    

    this.sub = this.route.params.subscribe(params=>{
      this.idConsulta=params['id'];
    })

    this.consultaData(this.idConsulta).subscribe(consulta=>{
      this.nextTreatments=consulta.data().proxTratamiento
      this.treatments = consulta.data().tratamiento
      this.recipeText = consulta.data().recipe
      this.toPay = consulta.data().montoPago
      this.fecha = consulta.data().createdAt
      if(this.mainUser.type=='0'){
        if(this.toPay!=0){
          console.log('mostrar boton pagar')
          this.pagar=true;
        }
      } else {
        console.log('No mostrar boton pagar')
        this.pagar=false;
      }
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

irPagar(){
  this.router.navigate(['/pagos', this.idConsulta]);
}

}
