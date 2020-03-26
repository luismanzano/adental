import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  transferencia: Boolean;
  zelle: Boolean;
  efectivo: Boolean;
  paypal: Boolean;
  idConsulta: string;
  montoPagar: number;
  fecha: any;
  montoIngresado: number;
  total: number;
  private sub: any;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public firestore: AngularFirestore

  ) { }

  ngOnInit() {


    this.sub=this.route.params.subscribe(params=>{
      this.idConsulta=params['id'];
    })

    this.auth.consultaData(this.idConsulta).subscribe(consulta=>{
      this.montoPagar=consulta.data().montoPago
      this.fecha=consulta.data().createdAt
    })
    

    this.transferencia=false;
    this.zelle=false;
    this.efectivo = false;
    this.paypal=false;
  }

  irTransferencia(){
    this.transferencia=true;
    this.zelle=false;
    this.efectivo = false;
    this.paypal=false;
  }

  irZelle(){
    this.zelle=true;
    this.transferencia=false;
    this.efectivo = false;
    this.paypal=false;

  }

  irEfectivo(){
    this.transferencia=false;
    this.zelle=false;
    this.efectivo = true;
    this.paypal=false;

  }

  irPaypal(){
    this.transferencia=false;
    this.zelle=false;
    this.efectivo = false;
    this.paypal=true;

  }

  
pagar(){
  const consultaRef=this.firestore.collection('consultas').doc(this.idConsulta);
  if(this.montoIngresado==this.montoPagar){
    consultaRef.update({
      status: true,
      montoPago:0
    }).then(ref=>{
      this.ngOnInit()
    })
  } else{
    this.total=this.montoPagar-this.montoIngresado;
    consultaRef.update({
      montoPago:this.total
    }).then(ref=>{
      this.ngOnInit()
    })
  }
}

}
