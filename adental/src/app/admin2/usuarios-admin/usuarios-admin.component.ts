import { Component, OnInit } from '@angular/core';
import { FormsModule} from "@angular/forms";
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

  constructor( private form: FormsModule, private authService: AuthService) { }

  ngOnInit() {
  }

  createUser() {
    this.authService.createUser(this.user, this.password, this.nombre, this.apellido)
      .then(() => {
        alert('Usuario Creado');
      })
      .catch(() => alert('Usuario No Creado'));
  }

}
