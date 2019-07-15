import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({providedIn: 'root'})
export class RecipesService {

    recipesUpdate = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Schnnitzel',
          'A tasty schnnitzel made of fried chicken breast',
          'https://live.staticflickr.com/7325/9299930183_72ce8e5424_b.jpg',
          [
            new Ingredient('Chicken breast', 1),
            new Ingredient('Eggs', 4),
            new Ingredient('Flour', 1),
            new Ingredient('Bread crumbs', 1),
            new Ingredient('Sweet chili pepper sauce', 1),
            new Ingredient('Olive Oil', 1),
            new Ingredient('Paprika', 1),
            new Ingredient('Garlic', 1)
          ]
        ),
        new Recipe('Hummus',
          'Healthy home-made hummus salad',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Hummus_from_The_Nile.jpg/1024px-Hummus_from_The_Nile.jpg',
          [
            new Ingredient('Hummus beans', 1),
            new Ingredient('Olive Oil', 1),
            new Ingredient('Tahini', 1),
            new Ingredient('Garlic', 1),
            new Ingredient('Salt', 1)
          ]
        ),
        new Recipe('Orange juice',
          'Healthy & refreshing orange juice',
          'https://live.staticflickr.com/1932/44765358634_25a2440101_b.jpg',
          [
            new Ingredient('Oranges', 4)
          ]
        ),
        new Recipe('test4',
          'test_desc4',
          'https://www.saltandlavender.com/wp-content/uploads/2018/12/creamy-garlic-chicken-recipe-3-720x1080.jpg',
          []
        )
      ];

      constructor(private shoppingListService: ShoppingListService) {}

      getRecipes(): Array<Recipe> {
          return this.recipes.slice();
      }

      getRecipe(recipeId: number): Recipe {
        return this.recipes[recipeId];
    }

      addIngredientsToShoppingList(ingredients: Ingredient[]): void {
        this.shoppingListService.addIngredients(ingredients);
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesUpdate.next(this.getRecipes());
      }

      updateRecipe(recipe: Recipe, idx: number) {
        this.recipes[idx] = recipe;
        this.recipesUpdate.next(this.getRecipes());
      }

      deleteRecipe(idx: number) {
        this.recipes.splice(idx, 1);
        this.recipesUpdate.next(this.getRecipes());
      }
}
