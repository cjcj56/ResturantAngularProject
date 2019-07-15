import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
    ingredientAdded = new Subject<Ingredient[]>();
    editingShoppingList = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Hummus Beans', 3),
        new Ingredient('Chicken', 4),
        new Ingredient('Oranges', 10),
        new Ingredient('Eggs', 12),
        new Ingredient('Garlic', 5),
        new Ingredient('Olive Oil', 1)
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
