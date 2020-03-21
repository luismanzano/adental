import { Component, OnInit } from '@angular/core';
import { RegistrarConsultaComponent } from '../registrar-consulta/registrar-consulta.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  recipeText: string;
  
  constructor(
    private consulta: RegistrarConsultaComponent
  ) { }

  ngOnInit() {
  }

  guardarRecipe(){
    this.consulta.recipeText = this.recipeText;
  }
}
