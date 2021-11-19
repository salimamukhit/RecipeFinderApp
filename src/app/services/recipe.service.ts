import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

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

  public getRecipeList(ingredients: string) {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/recipes/list/' + ingredients)
        .subscribe(response => {
          resolve(response);
        }, error => {
          console.log(error.status);
        });
    });
  }
}

