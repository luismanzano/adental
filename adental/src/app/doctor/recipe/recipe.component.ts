import { Component, OnInit } from '@angular/core';
import { RegistrarConsultaComponent } from '../registrar-consulta/registrar-consulta.component';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipeText: string;
  idP: string;
  name: string;

  
  constructor(
    private consulta: RegistrarConsultaComponent,
    protected authService: AuthService
  ) { }

  ngOnInit() {
    this.recipeText=this.consulta.recipeText;
    this.idP=this.consulta.id
    console.log(this.idP);

    this.authService.userData(this.idP).subscribe(usuario=>{
      this.name=usuario.data().name;
      console.log(this.name)
    })
  }

  guardarRecipe(){
    this.consulta.recipeText = this.recipeText;
  }
}
