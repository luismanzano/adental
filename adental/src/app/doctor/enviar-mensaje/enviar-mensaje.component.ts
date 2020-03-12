import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';

@Component({
  selector: 'app-enviar-mensaje',
  templateUrl: './enviar-mensaje.component.html',
  styleUrls: ['./enviar-mensaje.component.css']
})
export class EnviarMensajeComponent implements OnInit {
  id: string;
  private sub:any;
  name:string;
  last:string;
  textPerzonalizado: string;
  textPredeterminado: string;
  email: string;

  constructor(private route:ActivatedRoute, public firestore: AngularFirestore) { }

  ngOnInit() {
    this.sub=this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.userData(this.id.toString()).subscribe(usuario => {
      this.name = usuario.data().name;
      this.last = usuario.data().lastname;
      this.email = usuario.data().username;
    })

  }

  userData(data: string) {
    return this.firestore.collection('users').doc(data).get();

  }

  recuperarTexto(tipo:boolean){
    if (tipo){
      this.sendEmail(this.email.toString(),this.textPerzonalizado.toString());
    } else{
      this.sendEmail(this.email.toString(),this.textPredeterminado.toString());
    }
    
  }

  sendEmail(to: string, text: string) {
    console.log('prueba');
    let data = {
      email: to,
      message: text
    }
    console.log('Mensaje')
    return this.firestore.collection('submissions').add(data);

  }

}
