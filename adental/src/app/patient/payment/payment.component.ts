import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from 'src/app/core/services/auth.service';
import {AngularFirestore} from '@angular/fire/firestore';

declare var paypal;

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
  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;


  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    public firestore: AngularFirestore
  ) {
  }

  ngOnInit() {

    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              description: 'Consulta De AdolfDentalCare',
              amount: {
                currency_code: 'USD',
                value: this.montoPagar
              }
            }
          ]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        this.montoIngresado = this.montoPagar;
        console.log(order)
        this.pagar();
      },
      onError: err => {
        console.log(err);
      }
    })
      .render(this.paypalElement.nativeElement);



    this.sub = this.route.params.subscribe(params => {
      this.idConsulta = params['id'];
    })

    this.auth.consultaData(this.idConsulta).subscribe(consulta => {
      this.montoPagar = consulta.data().montoPago
      this.fecha = consulta.data().createdAt
    })


    this.transferencia = false;
    this.zelle = false;
    this.efectivo = false;
    this.paypal = false;
  }

  irTransferencia() {
    this.transferencia = true;
    this.zelle = false;
    this.efectivo = false;
    this.paypal = false;
  }

  irZelle() {
    this.zelle = true;
    this.transferencia = false;
    this.efectivo = false;
    this.paypal = false;

  }

  irEfectivo() {
    this.transferencia = false;
    this.zelle = false;
    this.efectivo = true;
    this.paypal = false;

  }

  irPaypal() {
    this.transferencia = false;
    this.zelle = false;
    this.efectivo = false;
    this.paypal = true;

  }


  pagar() {
    const consultaRef = this.firestore.collection('consultas').doc(this.idConsulta);
    if (this.montoIngresado == this.montoPagar) {
      consultaRef.update({
        status: true,
        montoPago: 0
      }).then(ref => {
        this.ngOnInit();
        location.reload();
      })
    } else {
      this.total = this.montoPagar - this.montoIngresado;
      consultaRef.update({
        montoPago: this.total
      }).then(ref => {
        this.ngOnInit()
      })
    }
  }

}
