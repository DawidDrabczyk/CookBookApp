import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form') form: NgForm;
  public editMode: boolean = false;
  public indexItemToChange: number;
  public ingredientToChange: Ingredient;

  private subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.editingStarted.subscribe((indexToChange: number) => {
      this.editMode = true;
      this.indexItemToChange = indexToChange;
      this.ingredientToChange = this.shoppingListService.getIngredientItem(indexToChange);
      this.form.setValue({
        name: this.ingredientToChange.name,
        amount: this.ingredientToChange.amount,
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addItem(form: NgForm): void {
    const formValue = form.value;
    const ingredient: Ingredient = {
      name: formValue.name,
      amount: formValue.amount,
    };
    this.editMode
      ? this.shoppingListService.updateIngredient(this.indexItemToChange, ingredient)
      : this.shoppingListService.addIngredient(ingredient);

    this.onClearForm();
  }

  public onClearForm(): void {
    this.form.reset();
    this.editMode = false;
  }

  public onDeleteItem(): void {
    this.onClearForm();
    this.shoppingListService.deleteIngredient(this.indexItemToChange);
  }
}
