import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/core/services/auth.service';
import { TratamientoComponent } from '../tratamiento/tratamiento.component';
import { ProxTratamientosComponent } from '../prox-tratamientos/prox-tratamientos.component';
import { RecipeComponent } from '../recipe/recipe.component';
import {AngularFireStorage} from '@angular/fire/storage';
import{finalize} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Element } from '@angular/compiler/src/render3/r3_ast';




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
  imagen: Boolean;
  recipe:Boolean;
  tratamiento:Boolean;
  proxTratamientos:Boolean;
  treatment: string;
  nextTreatments: string;
  recipeText: string;
  toPay: number;
  idConsulta: string;
  mainUser = {
    name: '',
  lastname: '',
  username: '',
  type: '',
  id: ''
  };
  nombre: string;
  email: string;
  text: string;
  uploadPercent = 0;
  urlImage: Observable<string>;
  urlConsulta: any;
  ci: number;

 
  
  


  constructor(private route: ActivatedRoute,
    public firestore: AngularFirestore, 
    private authService: AuthService,
    private storage: AngularFireStorage
    
    ) { }
    @ViewChild('imageConsulta',{static:true}) inputImageConsulta: ElementRef;

  ngOnInit() {

    this.mainUser.id = localStorage.getItem('id');
    this.mainUser.name = localStorage.getItem('name');
    this.mainUser.lastname = localStorage.getItem('lastname');
    this.mainUser.username = localStorage.getItem('username');
    this.mainUser.type = localStorage.getItem('type');

    this.tratamiento=true;

    this.sub=this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.userData(this.id.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname;
      this.nombre= this.name + ' ' + this.last;
      this.email=usuario.data().username;
      this.ci=usuario.data().ci
    })

  
  }

  mostrarRecipe():void{
      this.recipe = true;
      this.tratamiento=false;
      this.proxTratamientos=false;
      this.imagen=false;
  }

  mostrarTratamiento():void{

      this.recipe = false;
      this.tratamiento=true;
      this.proxTratamientos=false;
      this.imagen=false;
  }

  mostrarProxTratamientos(){
      this.recipe = false;
      this.tratamiento=false;
      this.proxTratamientos=true;
      this.imagen=false;
  }

  mostrarImagen(){
      this.recipe = false;
      this.tratamiento=false;
      this.proxTratamientos=false;
      this.imagen=true;
  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

  registrarConsulta(){
    console.log(this.urlConsulta);
    this.firestore.collection("consultas").add({
      tratamiento: this.treatment,
      proxTratamiento: this.nextTreatments,
      recipe: this.recipeText,
      montoPago: this.toPay,
      createdAt: new Date(),
      status: false,
      idConsulta: 'Prueba',
      idDoctor: this.mainUser.id.toString(),
      imagen: this.urlConsulta
      
    }).then(docRef=>{
      this.idConsulta=docRef.id;
      this.cambiarId();
      this.saveConsulta();
      this.enviarFactura();
    })
    .catch(error=>console.log("Error"));

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

  enviarFactura(){
    var date = new Date();
    const fecha = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
    this.text = "Doctor: " + this.mainUser.name + ' ' + this.mainUser.lastname + 
    '\n' + "Fecha: " + fecha.toString() +
    '\n' + "Monto: " + this.toPay.toString() + 
    '\n' + "Tratamiento: " + this.treatment.toString();
    this.authService.sendEmail(this.email, this.text);
    this.treatment='';
    this.nextTreatments='';
    this.recipeText='';
    this.toPay = 0;
  }

  onUpload(e){
    const id = Math.random().toString(36).substring(2);
    const storageRef = firebase.storage().ref(`/imagenes/${id}`);
    const file = e.target.files[0];
    const task = storageRef.put(file)
    task.on('state_changed', snapshot=>{
      let porcentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100
      this.uploadPercent=porcentage
    }, error=>{console.log("Error")},
    ()=>{this.uploadPercent=100;
          task.snapshot.ref.getDownloadURL().then((url)=>{
            this.urlConsulta=url;
            console.log(this.urlConsulta)
          })}
    )
  }


}
