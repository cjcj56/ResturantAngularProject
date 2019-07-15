import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientAdded = new Subject<Ingredient[]>();
    editingShoppingList = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Ingredient A', Math.ceil(0.1 + Math.random() * 10)),
        new Ingredient('Ingredient B', Math.ceil(0.1 + Math.random() * 10)),
        new Ingredient('Ingredient C', Math.ceil(0.1 + Math.random() * 10)),
        new Ingredient('Ingredient D', Math.ceil(0.1 + Math.random() * 10))
      ];

      getIngredients() {
          return this.ingredients.slice();
      }

      getIngredient(index: number): Ingredient {
        return this.ingredients[index];
      }

      addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientAdded.next(this.getIngredients());
      }

      addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientAdded.next(this.getIngredients());
      }

      updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientAdded.next(this.getIngredients());
      }

      deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientAdded.next(this.getIngredients());
      }
}
