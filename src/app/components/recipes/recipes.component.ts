import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  ingredientToAdd = '';
  myIngredients: string[] = [];

  allIngredients: any;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredientToAdd = '';
    this.getAllIngredients();
  }

  addIngredient(): void {
    if(this.myIngredients.indexOf(this.ingredientToAdd) < 0) {
      this.myIngredients.push(this.ingredientToAdd);
      this.ingredientToAdd = '';
    }
  }

  removeIngredient(ingredient: string): void {
    this.myIngredients.splice(this.myIngredients.indexOf(ingredient), 1);
  }

  getAllIngredients(): void {
    this.recipeService.getAllIngredients().then((result: any) => {
      console.log(result);
      this.allIngredients = result;
    });
  }

  getRecipeList(): void {
    let query = this.prepareQuery();
    this.recipeService.getRecipeList(query).then((result: any) => {
      console.log(result);
    });
  }

  prepareQuery(): string {
    let query = '';

    for(let str of this.myIngredients) {
      str = str.replace("'", "''");
      str = "'" + str + "'";
      query = query + str + ",";
    }

    query = query.substring(0, query.length - 1);

    return query;
  }
}
