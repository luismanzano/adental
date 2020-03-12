import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-registrar-consulta',
  templateUrl: './registrar-consulta.component.html',
  styleUrls: ['./registrar-consulta.component.css']
})



export class RegistrarConsultaComponent implements OnInit {
  id: String;
  name: String;
  last: String;
  private sub: any;
  recipe:Boolean;
  tratamiento:Boolean;
  proxTratamientos:Boolean;

  constructor(private route: ActivatedRoute,
    public firestore: AngularFirestore ) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.userData(this.id.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname
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
}
