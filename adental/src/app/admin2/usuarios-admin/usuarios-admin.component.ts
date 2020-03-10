import { Component, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {
  private user: string;
  private nombre: string;
  private apellido: string;
  private password: string;
  private userType: any;

  constructor( private form: FormsModule, private authService: AuthService) { }

  ngOnInit() {
  }

  createUser() {
    this.authService.createUser(this.user, this.password, this.nombre, this.apellido, this.userType)
      .then(() => {
        alert('Usuario Creado de tipo: ' + this.userType.toString());
      })
      .catch(() => alert('Usuario No Creado'));
  }

  alertaRandom() {
    alert('alertarandom');
    console.log('alertrandom');
  }

  makePatient() {
    this.userType = 0;
    console.log("El tipo de usuario es " + this.userType);
  }

  makeDoctor() {
    this.userType = 1;
    console.log("El tipo de usuario es " + this.userType);
  }

  makeAdmin() {
    this.userType = 2;
    console.log("El tipo de usuario es " + this.userType);
  }



}
