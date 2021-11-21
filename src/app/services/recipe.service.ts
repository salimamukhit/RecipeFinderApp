import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  /**
   * A constructor
   * @param http an HTTP client to make requests to the API
   */
  constructor(private http: HttpClient) { }

  /**
   * Gets all available ingredients
   */
  public getAllIngredients(): Promise<any> {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/ingredients')
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error.status);
        });
    });
  }

  /**
   * Gets all recipes that contain certain ingredients
   * @param ingredients
   */
  public getRecipeList(ingredients: string): Promise<any> {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/recipes/list/' + ingredients)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error.status);
        });
    });
  }

  public getAllRecipes(): Promise<any> {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/recipes')
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error.status);
        });
    });
  }
}

