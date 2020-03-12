import { Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-perfil-paciente',
  templateUrl: './perfil-paciente.component.html',
  styleUrls: ['./perfil-paciente.component.css']
})
export class PerfilPacienteComponent implements OnInit {

  id: string;
  nombre: string;
  last: any;
  email: string;
  private sub: any;
  constructor(private route: ActivatedRoute,
    public firestore: AngularFirestore) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params=>{
      this.id = params['id'];
      console.log(this.id)
    })

    this.userData(this.id).subscribe(usuario => {
      console.log(usuario.data());
      this.nombre = usuario.data().name;
      this.last = usuario.data().lastname;
      this.email = usuario.data().username;
    })
    console.log(this.id)
  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }


}
