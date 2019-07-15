import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipiesSubscription: Subscription;

  constructor(private recipesService: RecipesService, private router: Router) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.getRecipes();
    this.recipiesSubscription = this.recipesService.recipesUpdate.subscribe(
      (recipies: Recipe[]) => {
        this.recipes = recipies;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipiesSubscription.unsubscribe();
  }

  onNewRecipe() {
    this.router.navigate(['/recipes', 'new']);
  }
}
