import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipe.model';
import { datastorageInfo } from '../app-data';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class  DataStorageService {

    private databaseUrl = datastorageInfo.db.url;
    private recipesUrl: string;

    constructor(private http: HttpClient, private recipesService: RecipesService, private authService: AuthService) {
        this.recipesUrl = this.databaseUrl + '/' + 'recipes.json';
    }


    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put(this.recipesUrl, recipes)
        .subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>(this.recipesUrl).pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }), tap(recipes => {
            this.recipesService.setRecipes(recipes);
        }));
    }
}
