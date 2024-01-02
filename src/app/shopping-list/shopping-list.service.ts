import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  public ingredientsChanged = new Subject<Array<Ingredient>>();
  public editingStarted = new Subject<number>();

  private ingredientList: Array<Ingredient> = [
    {
      name: 'Jabłka',
      amount: 5,
    },
    {
      name: 'Pomidory',
      amount: 15,
    },
  ];

  constructor() {}

  public getIngredientList() {
    return this.ingredientList;
  }

  public getIngredientItem(index: number): Ingredient {
    return this.ingredientList[index];
  }

  public addIngredient(newIngredient: Ingredient): void {
    this.ingredientList.push(newIngredient);
    this.ingredientsChanged.next(this.ingredientList);
  }

  public updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredientList[index] = ingredient;
    this.ingredientsChanged.next(this.ingredientList);
  }

  public deleteIngredient(index: number): void {
    this.ingredientList.splice(index, 1);
    this.ingredientsChanged.next(this.ingredientList);
  }
}
