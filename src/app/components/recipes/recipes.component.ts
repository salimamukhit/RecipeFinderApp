import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // An single ingredient a user adds to a list
  ingredientToAdd = '';
  // A list of ingredients added
  myIngredients: string[] = [];
  // All available ingredients (retrieved from a database)
  allIngredients: any;
  // A list of recipes that contains ingredients a user has
  recipeList: any;
  // A boolean flag that signifies if query is done processing
  done: boolean | undefined;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredientToAdd = '';
    this.getAllIngredients();
  }

  /**
   * Adds ingredient to ingredients list
   */
  addIngredient(): void {
    if(this.ingredientToAdd != '') {
      if(this.myIngredients.indexOf(this.ingredientToAdd) < 0) {
        this.myIngredients.push(this.ingredientToAdd);
      }
      this.ingredientToAdd = '';
    }
  }

  /**
   * Removes an ingredient from ingredients list
   * @param ingredient an ingredient to remove
   */
  removeIngredient(ingredient: string): void {
    this.myIngredients.splice(this.myIngredients.indexOf(ingredient), 1);
  }

  /**
   * A method that is called upon initialization.
   * Gets all available ingredients
   */
  getAllIngredients(): void {
    this.recipeService.getAllIngredients().then((result: any) => {
      this.allIngredients = result;
    });
  }

  /**
   * Main query that gets list of recipes that can be cooked
   */
  getRecipeList(): void {
    if(this.myIngredients.length > 0) {
      let query = this.prepareQuery();
      this.done = false;
      this.recipeService.getRecipeList(query).then((result: any) => {
        this.sortResult(result);
      });
    }
  }

  /**
   * Sorts the recipe list for user comprehension
   * @param result a JSON result
   */
  sortResult(result: any): void {
    this.recipeList = [];
    for(let entry of result) {
      if(this.recipeList.findIndex((item: any) => item['name'] == entry['name']) >= 0) {
        continue;
      }
      let recipeName = entry['name'];
      let url = entry['url'];
      let ingredients = [];
      for(let item of this.myIngredients) {
        let i = entry['ingredients'].findIndex((entry: any) => entry['name'] == item);
        if(i >= 0) {
          let ingredient = entry['ingredients'][i]['name'];
          if(ingredients.indexOf(ingredient) < 0) ingredients.push(entry['ingredients'][i]['name']);
        }
      }
      let item = { 'name': recipeName, 'url': url, 'count': ingredients.length, 'ingredients': ingredients };
      this.recipeList.push(item);
    }
    this.recipeList.sort((a: any, b: any) => { return b['count'] - a['count'] });
    this.done = true;
  }

  /**
   * A helper method that prepares a string for querying
   */
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

  ingredientsToString(ingredients: string[]): string {
    let result = '(';
    for(let i = 0; i < ingredients.length - 1; i++) {
      result = result + ingredients[i] + ', ';
    }
    result += ingredients[ingredients.length - 1] + ')';

    return result;
  }
}
