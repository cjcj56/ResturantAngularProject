import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  isNew = true;
  recipeForm: FormGroup;
  recipeId: number;

  constructor(private route: ActivatedRoute, private recipesService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const idParamName = 'id';
        this.recipeId = params[idParamName];
        this.isNew = params[idParamName] == null;
        this.isNew ? this.initForm(new Recipe('', '', '', [])) : this.initForm(this.recipesService.getRecipe(+params[idParamName]));
      }
    );
  }

  private initForm(recipe: Recipe) {
    const recipeIngredients = new FormArray([]);

    if (recipe.ingredients) {
      for (const ingredient of recipe.ingredients) {
        recipeIngredients.push(
          new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
          })
        );
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, Validators.required),
      'imagePath': new FormControl(recipe.imagePath, Validators.required),
      'description': new FormControl(recipe.description),
      'ingredients': recipeIngredients
    });
  }

  onAddIngredient(): void {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)])
    }));
  }

  onSubmit(): void {
    if (this.isNew) {
      this.recipesService.addRecipe(this.recipeForm.value);
    } else {
      this.recipesService.updateRecipe(this.recipeForm.value, +this.recipeId);
    }
    this.finishedEditing();
  }

  onDeleteIngredient(idx: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(idx);
  }

  finishedEditing() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
