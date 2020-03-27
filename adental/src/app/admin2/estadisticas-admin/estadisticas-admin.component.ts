import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-estadisticas-admin',
  templateUrl: './estadisticas-admin.component.html',
  styleUrls: ['./estadisticas-admin.component.css']
})
export class EstadisticasAdminComponent implements OnInit {

  chosenDoctor: string;
  doctores = [];
  confirmadas = 0;
  canceladas = 0;
  pacientes: number;
  percentage: number;


  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getDoctors();
  }

  getDoctors() {
    this.authService.getUsers().subscribe((users: any) => {
      for (let i = 0; i <= users.length; i++) {
        // console.log(users[i].payload.doc.data());
        if (users[i].payload.doc.data().type == '1') {
          console.log(users[i].payload.doc.data().name);
          this.doctores.push(users[i].payload.doc.data());
        }
      }
    });
  }

  getStats(id: string) {
    this.canceladas = 0;
    this.confirmadas = 0;
    this.authService.firestore.collection('users').doc(id).valueChanges().subscribe( (doctor: any) => {
      console.log(doctor);
      console.log(doctor.conection);

      this.pacientes = doctor.conection.length;
      this.percentage = doctor.percentage;
    });

    this.authService.firestore.collection('citas').get().subscribe( appos => {
      appos.forEach( appo => {
        if (appo.data().doctor == this.chosenDoctor) {
          console.log(appo.data());
          if (appo.data().cancelled === true) {
            this.canceladas++;
          } else if (appo.data().confirmed === true) {
            this.confirmadas++;
          }
        }
      });
    });
    }

    verificarPorcentaje() {
    console.log('verificar porcentaje ' + this.percentage);
    }

    refreshPercentage() {
    this.authService.firestore.collection('users').doc(this.chosenDoctor).update({percentage: this.percentage}).then(() => alert('Porcentaje actualizado a ' + this.percentage + '%'));
    }

}
