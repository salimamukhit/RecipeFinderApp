import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from "../../environments/environment";

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
      this.http.get(environment.api_url + '/ingredients')
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
    const params = new HttpParams().set('ingredients', ingredients);
    return new Promise(resolve => {
      this.http.get(environment.api_url + '/recipes/list', { params: params })
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error.status);
        });
    });
  }

  /**
   * Gets all available recipes
   */
  public getAllRecipes(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(environment.api_url + '/recipes')
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error.status);
        });
    });
  }
}

