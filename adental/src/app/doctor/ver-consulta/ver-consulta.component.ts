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
  ci: string;
  imagen:Boolean;
  recipe: Boolean;
  idConsulta: string;
  private sub: any;
  treatments: string;
  toPay: number;
  nextTreatments: string;
  recipeText: string;
  fecha: any;
  pagar: Boolean;
  tipoNavBar: Boolean;
  nombre: string;
  imagenUrl: any;
  mainUser = {
    name: '',
  lastname: '',
  username: '',
  type: '',
  id: '',
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
    
    this.nombre=this.mainUser.name + ' ' + this.mainUser.lastname
    this.sub = this.route.params.subscribe(params=>{
      this.idConsulta=params['id'];
    })
    console.log('Probando git')

    this.consultaData(this.idConsulta).subscribe(consulta=>{
      this.nextTreatments=consulta.data().proxTratamiento
      this.treatments = consulta.data().tratamiento
      this.recipeText = consulta.data().recipe
      this.toPay = consulta.data().montoPago
      this.fecha = consulta.data().createdAt
      this.imagenUrl = consulta.data().imagen
      if(this.mainUser.type=='0'){
        this.tipoNavBar=true;
        if(this.toPay!=0){
          console.log('mostrar boton pagar')
          this.pagar=true;
        }
      } else {
        console.log('No mostrar boton pagar')
        this.pagar=false;
        this.tipoNavBar=false;
      }
    })

    
  }

 


  mostrarTratamiento():void{
    this.recipe = false;
    this.tratamiento=true;
    this.proxTratamiento=false;
    this.imagen=false;
}

mostrarProxTratamientos(){
  this.recipe = false;
  this.tratamiento=false;
  this.proxTratamiento=true;
  this.imagen=false;
}

mostrarRecipe():void{
  this.recipe = true;
  this.tratamiento=false;
  this.proxTratamiento=false;
  this.imagen=false;
}
mostrarImagen(){
  this.imagen=true;
  this.recipe = false;
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
