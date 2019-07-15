import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editModeSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  @ViewChild('f') shoppingListForm: NgForm;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editModeSubscription = this.shoppingListService.editingShoppingList.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        const editedItem = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: editedItem.name,
          amount: editedItem.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.editModeSubscription.unsubscribe();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.onClear();
    }
  }

  onSubmit(form: NgForm) {
    const ingredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }
    this.editMode = false;
    form.reset();
  }

  onUpdateItem(index: number) {
    this.shoppingListService.editingShoppingList.next(index);
  }
}
