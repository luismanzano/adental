import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent implements OnInit {
  id: String;
  private sub:any;
  nombre:String;
  last:String;

  constructor(private route:ActivatedRoute, public firestore: AngularFirestore) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params => {
      this.id = params['id'];
    })

    this.userData(this.id.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname
    })

  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

}
