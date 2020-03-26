import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { TratamientoComponent } from '../tratamiento/tratamiento.component';
import { ProxTratamientosComponent } from '../prox-tratamientos/prox-tratamientos.component';
import { RecipeComponent } from '../recipe/recipe.component';



@Component({
  selector: 'app-registrar-consulta',
  templateUrl: './registrar-consulta.component.html',
  styleUrls: ['./registrar-consulta.component.css']
})



export class RegistrarConsultaComponent implements OnInit {
  

  id: string;
  name: string;
  last: string;
  private sub: any;
  recipe:Boolean;
  tratamiento:Boolean;
  proxTratamientos:Boolean;
  treatment: string;
  nextTreatments: string;
  recipeText: string;
  toPay: number;
  idConsulta: string;
  


  constructor(private route: ActivatedRoute,
    public firestore: AngularFirestore, 
    private authService: AuthService,
    
    ) { }

  ngOnInit() {

    this.tratamiento=true;

    this.sub=this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.userData(this.id.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname;
    })

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

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

  registrarConsulta(){
    this.firestore.collection("consultas").add({
      tratamiento: this.treatment,
      proxTratamiento: this.nextTreatments,
      recipe: this.recipeText,
      montoPago: this.toPay,
      createdAt: new Date(),
      status: false,
      idConsulta: 'Prueba',
      
    }).then(docRef=>{
      this.idConsulta=docRef.id;
      this.cambiarId();
      this.saveConsulta();
    })
    .catch(error=>console.log("Error"));

    this.treatment='';
    this.nextTreatments='';
    this.recipeText='';
    this.toPay = 0;
  }

  cambiarId(){
    console.log("funciona");
    console.log(this.idConsulta, "hola");
    this.firestore.collection('consultas').doc(this.idConsulta).update({
      idConsulta: this.idConsulta.toString()
    });
  }

  saveConsulta(){
    const pacienteRef = this.firestore.collection('users').doc(this.id.toString());
    pacienteRef.update({ history: firebase.firestore.FieldValue.arrayUnion(this.idConsulta.toString())
        })
        .then(function() {
           console.log('Document successfully updated!');
      })
      .catch(function(error) {
        // The document probably doesn't exist.
         console.error('Error updating document: ', error);
      });
  }
}
