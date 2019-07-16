import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { datastorageInfo } from '../app-data';

@Injectable({providedIn: 'root'})
export class  DataStorageService {

    private databaseUrl = datastorageInfo.url;
    private recipesUrl: string;
    private shoppinListUrl: string;

    constructor(private http: HttpClient, private recipesService: RecipesService) {
        this.recipesUrl = this.databaseUrl + '/' + 'recipes.json';
        this.shoppinListUrl = this.databaseUrl + '/' + 'shoppingList.json';
    }


    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put(this.recipesUrl, recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        this.http.get<Recipe[]>(this.recipesUrl)
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }))
        .subscribe(recipes => {
            this.recipesService.setRecipes(recipes);
        });
    }
}
