import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  recipeId: number;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute, private router: Router) {}

  onAddToShoppingList(): void {
    this.recipesService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const recipeIdParamName = 'id';
        this.recipeId = +params[recipeIdParamName];
        this.recipe = this.recipesService.getRecipe(this.recipeId);
      }
    );
  }

  onDeleteRecipe() {
    this.recipesService.deleteRecipe(this.recipeId);
    this.router.navigate(['/recipes']);
  }
}
