import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredientList: Array<Ingredient> = [];
  private ingredientsListSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredientList = this.shoppingListService.getIngredientList();
    this.ingredientsListSubs = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Array<Ingredient>) => {
        this.ingredientList = ingredients;
      }
    );
  }

  ngOnDestroy(): void {
    this.ingredientsListSubs.unsubscribe();
  }

  public onEditItem(index: number): void {
    this.shoppingListService.editingStarted.next(index);
  }
}
