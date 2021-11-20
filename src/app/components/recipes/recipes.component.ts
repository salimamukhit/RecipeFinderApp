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

  recipeList: any;

  done: boolean | undefined;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.ingredientToAdd = '';
    this.done = false;
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
      this.sortResult(result);
    });
  }

  sortResult(result: any): void {
    this.recipeList = [];
    let resultMap = new Map<string, number>();

    for(let entry of result) {
      if(resultMap.has(entry['url'])) {
        let count = resultMap.get(entry['url']);
        if(count) {
          resultMap.set(entry['url'], count + 1);
        }
      } else {
        resultMap.set(entry['url'], 1);
      }
    }

    for(let key of resultMap.keys()) {
      let recipeName = result.find((entry: any) => entry['url'] == key)['name'];
      let item = { 'name': recipeName, 'url': key, 'count': resultMap.get(key) };
      this.recipeList.push(item);
    }

    this.recipeList.sort((a: any, b: any) => {return b['count'] - a['count']});

    this.done = true;

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
