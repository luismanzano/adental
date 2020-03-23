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
  nombre: string;
  name:string
  last: string

  
  constructor(
    private consulta: RegistrarConsultaComponent,
    protected authService: AuthService
  ) { }

  ngOnInit() {
    this.recipeText=this.consulta.recipeText;
    this.idP=this.consulta.id


    this.authService.userData(this.idP).subscribe(usuario=>{
      this.nombre=usuario.data().name;
      this.nombre = this.nombre + ' ' + usuario.data().lastname;
    })

    


  }

  guardarRecipe(){
    this.consulta.recipeText = this.recipeText;
  }
}
