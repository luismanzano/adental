import { Component, OnInit } from '@angular/core';
import { VerConsultaComponent } from '../ver-consulta/ver-consulta.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { RegistrarConsultaComponent } from '../registrar-consulta/registrar-consulta.component';

@Component({
  selector: 'app-ver-recipe',
  templateUrl: './ver-recipe.component.html',
  styleUrls: ['./ver-recipe.component.css']
})
export class VerRecipeComponent implements OnInit {

  recipeText: string;
  nombre: string;
  apellido: string;
  idP:string;
  
  constructor(
    private consulta: VerConsultaComponent,
    protected authService: AuthService,
  ) { }

  ngOnInit() {
    this.recipeText=this.consulta.recipeText


  }

}
