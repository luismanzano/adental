import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  filtro: any;
  idConsulta: string;
  arregloConsulta = [];
  mostrar: Boolean;
  status: Boolean;
  mostrarPagas: Boolean;
  mostrarNoPagas: Boolean;
  montoTotal: number;
  montoParcial: number;
  

  constructor(
    protected authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
   this.montoTotal=0;
   this.montoParcial=0;
   this.mostrarTodas();
  }

  filtrar(){
    if(this.filtro=='0'){
      this.mostrarTodas();
    }else if(this.filtro=='1'){
      this.mostrarNoPaga();
    } else{
      this.mostrarPaga();
    }
  }

  mostrarTodas(){
    this.mostrar=false;
    this.arregloConsulta=[];
    console.log(this.arregloConsulta)
    this.authService.userData('2KWsVcftHdZ52cxsALCq25EgJCH2').subscribe(user=>{
      var length = user.data().history.length;
      for(var i=0; i<length; i++){
        this.idConsulta=user.data().history[i].toString();
        this.authService.consultaData(this.idConsulta).subscribe(consulta=>{
          this.montoParcial=consulta.data().montoPago
          console.log(this.montoParcial);
          this.montoTotal=this.montoTotal + this.montoParcial;
          console.log(this.montoTotal);
          this.arregloConsulta.push(consulta.data());
        })
      }
    })
    this.mostrarPagas=false;
    this.mostrarNoPagas=false;
    this.mostrar=true;
    console.log(this.arregloConsulta)
  
  }

  mostrarPaga(){
    this.mostrar=false;
    this.mostrarNoPagas=false;
    this.mostrarPagas=true;
    
  }

  mostrarNoPaga(){
    this.mostrar=false;
    this.mostrarPagas=false;
    this.mostrarNoPagas=true;
  }

  irPagar(consulta: string){
    this.router.navigate(['/pagos', consulta]);
  }


}
